import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService extends Redis implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);

  constructor() {
    super(process.env.REDIS_URL || 'redis://localhost:6379');
  }

  onModuleInit() {
    this.on('connect', () => this.logger.log('Redis successfully connected'));
    this.on('error', (err) => this.logger.error('Redis connection error', err));
  }

  onModuleDestroy() {
    this.disconnect();
  }
}
