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
exports.MapsController = void 0;
const common_1 = require("@nestjs/common");
const maps_service_1 = require("./maps.service");
let MapsController = class MapsController {
    mapsService;
    constructor(mapsService) {
        this.mapsService = mapsService;
    }
    async getAutoComplete(input) {
        return this.mapsService.getAutoComplete(input);
    }
    async getCoordinates(placeId) {
        return this.mapsService.getCoordinates(placeId);
    }
};
exports.MapsController = MapsController;
__decorate([
    (0, common_1.Get)('autocomplete'),
    __param(0, (0, common_1.Query)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MapsController.prototype, "getAutoComplete", null);
__decorate([
    (0, common_1.Get)('coordinates'),
    __param(0, (0, common_1.Query)('placeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MapsController.prototype, "getCoordinates", null);
exports.MapsController = MapsController = __decorate([
    (0, common_1.Controller)('maps'),
    __metadata("design:paramtypes", [maps_service_1.MapsService])
], MapsController);
//# sourceMappingURL=maps.controller.js.map