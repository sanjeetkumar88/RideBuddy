import { WorkerHost } from '@nestjs/bullmq';
import { Job, Queue } from 'bullmq';
import { RidesGateway } from './rides.gateway';
import { RedisService } from '../redis/redis.service';
import { PrismaService } from '../prisma/prisma.service';
export declare class RidesProcessor extends WorkerHost {
    private readonly ridesGateway;
    private readonly redisService;
    private readonly prisma;
    private readonly rideQueue;
    private readonly logger;
    constructor(ridesGateway: RidesGateway, redisService: RedisService, prisma: PrismaService, rideQueue: Queue);
    process(job: Job<any, any, string>): Promise<any>;
}
