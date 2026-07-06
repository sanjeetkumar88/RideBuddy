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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var RidesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RidesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const redis_service_1 = require("../redis/redis.service");
const client_1 = require("@prisma/client");
const bullmq_1 = require("@nestjs/bullmq");
const bullmq_2 = require("bullmq");
let RidesService = RidesService_1 = class RidesService {
    prisma;
    redis;
    rideQueue;
    logger = new common_1.Logger(RidesService_1.name);
    constructor(prisma, redis, rideQueue) {
        this.prisma = prisma;
        this.redis = redis;
        this.rideQueue = rideQueue;
    }
    async updateDriverLocation(driverId, dto) {
        await this.redis.geoadd('drivers:locations', dto.lng, dto.lat, driverId);
        await this.redis.hset('drivers:status', driverId, 'AVAILABLE');
        return { success: true };
    }
    async requestRide(riderId, dto) {
        const ride = await this.prisma.ride.create({
            data: {
                riderId,
                status: client_1.RideStatus.REQUESTED,
                pickupLat: dto.pickupLat,
                pickupLng: dto.pickupLng,
                dropLat: dto.dropLat,
                dropLng: dto.dropLng,
            },
        });
        await this.redis.set(`ride:state:${ride.id}`, 'SEARCHING');
        await this.prisma.ride.update({
            where: { id: ride.id },
            data: { status: client_1.RideStatus.SEARCHING },
        });
        await this.rideQueue.add('dispatch', {
            rideId: ride.id,
            lat: dto.pickupLat,
            lng: dto.pickupLng,
            attempt: 0,
        });
        return ride;
    }
    async acceptRide(driverId, rideId) {
        const rideKey = `ride:state:${rideId}`;
        const driverKey = `ride:driver:${rideId}`;
        const result = await this.redis.acceptRide(rideKey, driverKey, driverId);
        if (result === 1) {
            this.logger.log(`Driver ${driverId} SUCCESSFULLY accepted ride ${rideId}`);
            await this.prisma.ride.update({
                where: { id: rideId },
                data: {
                    status: client_1.RideStatus.ASSIGNED,
                    driverId,
                },
            });
            await this.redis.hset('drivers:status', driverId, 'BUSY');
            return { success: true, message: 'Ride assigned to you!' };
        }
        else {
            const state = await this.redis.get(rideKey);
            throw new common_1.BadRequestException(`Cannot accept ride. Current state: ${state}`);
        }
    }
};
exports.RidesService = RidesService;
exports.RidesService = RidesService = RidesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, bullmq_1.InjectQueue)('ride-allocation')),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        redis_service_1.RedisService,
        bullmq_2.Queue])
], RidesService);
//# sourceMappingURL=rides.service.js.map