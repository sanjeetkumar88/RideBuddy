import { Processor, WorkerHost, InjectQueue } from '@nestjs/bullmq';
import { Job, Queue } from 'bullmq';
import { Logger } from '@nestjs/common';
import { RidesGateway } from './rides.gateway';
import { RedisService } from '../redis/redis.service';
import { PrismaService } from '../prisma/prisma.service';
import { RideStatus } from '@prisma/client';

@Processor('ride-allocation')
export class RidesProcessor extends WorkerHost {
  private readonly logger = new Logger(RidesProcessor.name);

  constructor(
    private readonly ridesGateway: RidesGateway,
    private readonly redisService: RedisService,
    private readonly prisma: PrismaService,
    @InjectQueue('ride-allocation') private readonly rideQueue: Queue,
  ) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    const { rideId, lat, lng, attempt } = job.data;
    this.logger.log(`Processing ride-allocation for ${rideId} (Attempt: ${attempt})`);

    const currentState = await this.redisService.get(`ride:state:${rideId}`);
    if (currentState !== 'SEARCHING') {
      this.logger.log(`Ride ${rideId} is no longer searching (State: ${currentState}). Stopping job.`);
      return;
    }

    const radiusKm = 5;
    const batchSize = 3;

    // Find nearest drivers
    const nearestDrivers = (await this.redisService.geosearch(
      'drivers:locations',
      'FROMLONLAT',
      lng,
      lat,
      'BYRADIUS',
      radiusKm,
      'km',
      'ASC',
    )) as string[];

    // Filter available drivers
    const availableDrivers: string[] = [];
    for (const driverId of nearestDrivers) {
      const status = await this.redisService.hget('drivers:status', driverId);
      if (status === 'AVAILABLE') {
        availableDrivers.push(driverId);
      }
    }

    const offset = attempt * batchSize;
    const currentBatch = availableDrivers.slice(offset, offset + batchSize);

    if (currentBatch.length === 0 && attempt === 0) {
      this.logger.log(`No drivers found for ride ${rideId}`);
      // Depending on business logic, we could queue a retry with expanding radius
    }

    if (currentBatch.length === 0) {
      // Mark as timeout if we've exhausted drivers
      await this.redisService.set(`ride:state:${rideId}`, 'TIMEOUT');
      await this.prisma.ride.update({
        where: { id: rideId },
        data: { status: RideStatus.TIMEOUT },
      });
      this.logger.log(`Ride ${rideId} TIMED OUT (No more drivers in radius)`);
      return;
    }

    this.logger.log(`Notifying batch ${attempt + 1}: ${currentBatch.join(', ')}`);

    for (const driverId of currentBatch) {
      this.ridesGateway.notifyDriver(driverId, 'ride_request', {
        rideId,
        pickupLat: lat,
        pickupLng: lng,
      });
    }

    // After emitting to this batch, schedule another job for the NEXT batch if still searching
    // Wait for a simulated window before next attempt
    // In production, we'd use BullMQ delayed jobs for the retry logic
    const nextAttemptJob = await this.rideQueue.add(
      'dispatch',
      { rideId, lat, lng, attempt: attempt + 1 },
      { delay: 15000 } // 15 seconds before next attempt
    );
    this.logger.log(`Scheduled next batch attempt (${attempt + 1}) in 15 seconds.`);
  }
}
