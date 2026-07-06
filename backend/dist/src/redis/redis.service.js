"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var RedisService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = require("ioredis");
let RedisService = RedisService_1 = class RedisService extends ioredis_1.Redis {
    logger = new common_1.Logger(RedisService_1.name);
    constructor() {
        super(process.env.REDIS_URL || 'redis://localhost:6379');
    }
    onModuleInit() {
        this.on('connect', () => this.logger.log('Redis successfully connected'));
        this.on('error', (err) => this.logger.error('Redis connection error', err));
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
};
exports.RedisService = RedisService;
exports.RedisService = RedisService = RedisService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], RedisService);
//# sourceMappingURL=redis.service.js.map