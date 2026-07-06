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
var RidesProcessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RidesProcessor = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const bullmq_2 = require("bullmq");
const common_1 = require("@nestjs/common");
const rides_gateway_1 = require("./rides.gateway");
const redis_service_1 = require("../redis/redis.service");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let RidesProcessor = RidesProcessor_1 = class RidesProcessor extends bullmq_1.WorkerHost {
    ridesGateway;
    redisService;
    prisma;
    rideQueue;
    logger = new common_1.Logger(RidesProcessor_1.name);
    constructor(ridesGateway, redisService, prisma, rideQueue) {
        super();
        this.ridesGateway = ridesGateway;
        this.redisService = redisService;
        this.prisma = prisma;
        this.rideQueue = rideQueue;
    }
    async process(job) {
        const { rideId, lat, lng, attempt } = job.data;
        this.logger.log(`Processing ride-allocation for ${rideId} (Attempt: ${attempt})`);
        const currentState = await this.redisService.get(`ride:state:${rideId}`);
        if (currentState !== 'SEARCHING') {
            this.logger.log(`Ride ${rideId} is no longer searching (State: ${currentState}). Stopping job.`);
            return;
        }
        const radiusKm = 5;
        const batchSize = 3;
        const nearestDrivers = (await this.redisService.geosearch('drivers:locations', 'FROMLONLAT', lng, lat, 'BYRADIUS', radiusKm, 'km', 'ASC'));
        const availableDrivers = [];
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
        }
        if (currentBatch.length === 0) {
            await this.redisService.set(`ride:state:${rideId}`, 'TIMEOUT');
            await this.prisma.ride.update({
                where: { id: rideId },
                data: { status: client_1.RideStatus.TIMEOUT },
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
        const nextAttemptJob = await this.rideQueue.add('dispatch', { rideId, lat, lng, attempt: attempt + 1 }, { delay: 15000 });
        this.logger.log(`Scheduled next batch attempt (${attempt + 1}) in 15 seconds.`);
    }
};
exports.RidesProcessor = RidesProcessor;
exports.RidesProcessor = RidesProcessor = RidesProcessor_1 = __decorate([
    (0, bullmq_1.Processor)('ride-allocation'),
    __param(3, (0, bullmq_1.InjectQueue)('ride-allocation')),
    __metadata("design:paramtypes", [rides_gateway_1.RidesGateway,
        redis_service_1.RedisService,
        prisma_service_1.PrismaService,
        bullmq_2.Queue])
], RidesProcessor);
//# sourceMappingURL=rides.processor.js.map