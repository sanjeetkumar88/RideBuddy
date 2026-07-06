import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Redis } from 'ioredis';
declare module 'ioredis' {
    interface Redis {
        acceptRide(rideKey: string, driverKey: string, driverId: string): Promise<number>;
    }
}
export declare class RedisService extends Redis implements OnModuleInit, OnModuleDestroy {
    private readonly logger;
    constructor();
    onModuleInit(): void;
    onModuleDestroy(): void;
}
