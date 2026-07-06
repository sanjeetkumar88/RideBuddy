import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { RequestRideDto, UpdateLocationDto } from './dto/rides.dto';
import { Queue } from 'bullmq';
export declare class RidesService {
    private prisma;
    private redis;
    private rideQueue;
    private readonly logger;
    constructor(prisma: PrismaService, redis: RedisService, rideQueue: Queue);
    updateDriverLocation(driverId: string, dto: UpdateLocationDto): Promise<{
        success: boolean;
    }>;
    requestRide(riderId: string, dto: RequestRideDto): Promise<{
        id: string;
        status: import("@prisma/client").$Enums.RideStatus;
        pickupLat: number;
        pickupLng: number;
        dropLat: number;
        dropLng: number;
        createdAt: Date;
        updatedAt: Date;
        riderId: string;
        driverId: string | null;
    }>;
    acceptRide(driverId: string, rideId: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
