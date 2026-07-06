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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RidesController = void 0;
const common_1 = require("@nestjs/common");
const rides_service_1 = require("./rides.service");
const rides_dto_1 = require("./dto/rides.dto");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const client_1 = require("@prisma/client");
const passport_1 = require("@nestjs/passport");
let RidesController = class RidesController {
    ridesService;
    constructor(ridesService) {
        this.ridesService = ridesService;
    }
    async requestRide(req, dto) {
        return this.ridesService.requestRide(req.user.sub, dto);
    }
    async updateLocation(req, dto) {
        return this.ridesService.updateDriverLocation(req.user.sub, dto);
    }
    async acceptRide(req, rideId) {
        return this.ridesService.acceptRide(req.user.sub, rideId);
    }
};
exports.RidesController = RidesController;
__decorate([
    (0, common_1.Post)('request'),
    (0, roles_decorator_1.Roles)(client_1.Role.RIDER),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, rides_dto_1.RequestRideDto]),
    __metadata("design:returntype", Promise)
], RidesController.prototype, "requestRide", null);
__decorate([
    (0, common_1.Post)('driver/location'),
    (0, roles_decorator_1.Roles)(client_1.Role.DRIVER),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, rides_dto_1.UpdateLocationDto]),
    __metadata("design:returntype", Promise)
], RidesController.prototype, "updateLocation", null);
__decorate([
    (0, common_1.Post)(':id/accept'),
    (0, roles_decorator_1.Roles)(client_1.Role.DRIVER),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], RidesController.prototype, "acceptRide", null);
exports.RidesController = RidesController = __decorate([
    (0, common_1.Controller)('rides'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [rides_service_1.RidesService])
], RidesController);
//# sourceMappingURL=rides.controller.js.map