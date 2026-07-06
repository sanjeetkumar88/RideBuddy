import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { Redis } from 'ioredis';

// Extend the Redis interface to include our custom command
declare module 'ioredis' {
  interface Redis {
    acceptRide(rideKey: string, driverKey: string, driverId: string): Promise<number>;
  }
}

@Injectable()
export class RedisService extends Redis implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);

  constructor() {
    super(process.env.REDIS_URL || 'redis://localhost:6379');
  }

  onModuleInit() {
    this.on('connect', () => this.logger.log('Redis successfully connected'));
    this.on('error', (err) => this.logger.error('Redis connection error', err));

    // Define the atomic Lua script for ride acceptance
    this.defineCommand('acceptRide', {
      numberOfKeys: 2,
      lua: `
        local rideKey = KEYS[1]
        local driverKey = KEYS[2]
        local driverId = ARGV[1]
        
        local currentState = redis.call("GET", rideKey)
        if currentState == "SEARCHING" then
          redis.call("SET", rideKey, "ASSIGNED")
          redis.call("SET", driverKey, driverId)
          return 1
        elseif currentState == "ASSIGNED" then
          local currentDriver = redis.call("GET", driverKey)
          if currentDriver == driverId then
            return 1
          end
        end
        return 0
      `,
    });
  }

  onModuleDestroy() {
    this.disconnect();
  }
}
