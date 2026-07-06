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
var MapsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapsService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
let MapsService = MapsService_1 = class MapsService {
    httpService;
    configService;
    apiKey;
    logger = new common_1.Logger(MapsService_1.name);
    mockLocations = [
        { place_id: 'mock_times_square', description: 'Times Square, Manhattan, NY, USA', lat: 40.7580, lng: -73.9855 },
        { place_id: 'mock_empire_state', description: 'Empire State Building, NY, USA', lat: 40.7484, lng: -73.9857 },
        { place_id: 'mock_central_park', description: 'Central Park, New York, NY, USA', lat: 40.7812, lng: -73.9665 },
        { place_id: 'mock_brooklyn_bridge', description: 'Brooklyn Bridge, NY, USA', lat: 40.7061, lng: -73.9969 },
        { place_id: 'mock_jfk_airport', description: 'JFK Airport, Queens, NY, USA', lat: 40.6413, lng: -73.7781 },
    ];
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
        this.apiKey = this.configService.get('GOOGLE_MAPS_API_KEY') || '';
        if (!this.apiKey) {
            this.logger.warn('No GOOGLE_MAPS_API_KEY found! MapsService is running in DEMO MODE with mock data.');
        }
    }
    async getAutoComplete(input) {
        if (!this.apiKey) {
            const filtered = this.mockLocations.filter(m => m.description.toLowerCase().includes(input.toLowerCase()));
            return {
                status: 'OK',
                predictions: filtered.length > 0 ? filtered : this.mockLocations,
            };
        }
        try {
            const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json`;
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(url, {
                params: {
                    input,
                    key: this.apiKey,
                },
            }));
            return response.data;
        }
        catch (error) {
            throw new common_1.HttpException(error.response?.data || 'Error fetching autocomplete suggestions', error.response?.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getCoordinates(placeId) {
        if (!this.apiKey) {
            const location = this.mockLocations.find(m => m.place_id === placeId);
            if (location) {
                return { lat: location.lat, lng: location.lng };
            }
            return { lat: 40.7128, lng: -74.0060 };
        }
        try {
            const url = `https://maps.googleapis.com/maps/api/geocode/json`;
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(url, {
                params: {
                    place_id: placeId,
                    key: this.apiKey,
                },
            }));
            const data = response.data;
            if (data.status !== 'OK' || !data.results || data.results.length === 0) {
                throw new common_1.HttpException('Could not resolve coordinates for placeId', common_1.HttpStatus.BAD_REQUEST);
            }
            const location = data.results[0].geometry.location;
            return {
                lat: location.lat,
                lng: location.lng,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.response?.data || 'Error fetching coordinates', error.response?.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.MapsService = MapsService;
exports.MapsService = MapsService = MapsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], MapsService);
//# sourceMappingURL=maps.service.js.map