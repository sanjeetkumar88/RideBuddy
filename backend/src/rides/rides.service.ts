import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { RequestRideDto, UpdateLocationDto } from './dto/rides.dto';
import { RideStatus } from '@prisma/client';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class RidesService {
  private readonly logger = new Logger(RidesService.name);

  constructor(
    private prisma: PrismaService,
    private redis: RedisService,
    @InjectQueue('ride-allocation') private rideQueue: Queue,
  ) {}

  // --- Driver Flow ---

  async updateDriverLocation(driverId: string, dto: UpdateLocationDto) {
    // Redis GEO uses Longitude first, then Latitude
    await this.redis.geoadd('drivers:locations', dto.lng, dto.lat, driverId);
    await this.redis.hset('drivers:status', driverId, 'AVAILABLE');
    return { success: true };
  }

  // --- Rider Flow ---

  async requestRide(riderId: string, dto: RequestRideDto) {
    // 1. Create ride in DB
    const ride = await this.prisma.ride.create({
      data: {
        riderId,
        status: RideStatus.REQUESTED,
        pickupLat: dto.pickupLat,
        pickupLng: dto.pickupLng,
        dropLat: dto.dropLat,
        dropLng: dto.dropLng,
      },
    });

    // 2. Set active state in Redis for atomic operations later
    await this.redis.set(`ride:state:${ride.id}`, 'SEARCHING');
    await this.prisma.ride.update({
      where: { id: ride.id },
      data: { status: RideStatus.SEARCHING },
    });

    // 3. Queue the allocation job in BullMQ
    await this.rideQueue.add('dispatch', {
      rideId: ride.id,
      lat: dto.pickupLat,
      lng: dto.pickupLng,
      attempt: 0,
    });

    return ride;
  }

  // --- Concurrency Handling ---

  async acceptRide(driverId: string, rideId: string) {
    const rideKey = `ride:state:${rideId}`;
    const driverKey = `ride:driver:${rideId}`;

    // 1. ATOMIC ACCEPTANCE via Lua Script
    // This executes atomically in Redis. No two drivers can get '1' for the same ride.
    // Also idempotent: if this driver already accepted it, it returns 1.
    const result = await this.redis.acceptRide(rideKey, driverKey, driverId);

    if (result === 1) {
      // 2. We won the race (or already won it). Update DB.
      this.logger.log(`Driver ${driverId} SUCCESSFULLY accepted ride ${rideId}`);
      
      await this.prisma.ride.update({
        where: { id: rideId },
        data: { 
          status: RideStatus.ASSIGNED,
          driverId,
        },
      });

      // Mark driver as busy
      await this.redis.hset('drivers:status', driverId, 'BUSY');
      
      return { success: true, message: 'Ride assigned to you!' };
    } else {
      // 3. We lost the race or ride timed out.
      const state = await this.redis.get(rideKey);
      throw new BadRequestException(`Cannot accept ride. Current state: ${state}`);
    }
  }
}
