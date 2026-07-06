import { Module } from '@nestjs/common';
import { RidesController } from './rides.controller';
import { RidesService } from './rides.service';
import { PrismaModule } from '../prisma/prisma.module';
import { RedisModule } from '../redis/redis.module';
import { BullModule } from '@nestjs/bullmq';
import { RidesGateway } from './rides.gateway';
import { RidesProcessor } from './rides.processor';

@Module({
  imports: [
    PrismaModule, 
    RedisModule,
    BullModule.registerQueue({
      name: 'ride-allocation',
    }),
  ],
  controllers: [RidesController],
  providers: [RidesService, RidesGateway, RidesProcessor],
})
export class RidesModule {}
