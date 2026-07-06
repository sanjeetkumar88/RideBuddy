"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const client_1 = require("@prisma/client");
const redis_service_1 = require("../redis/redis.service");
let AuthService = class AuthService {
    usersService;
    jwtService;
    redisService;
    constructor(usersService, jwtService, redisService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.redisService = redisService;
    }
    async register(dto) {
        let existingUser = await this.usersService.findByEmail(dto.email);
        if (existingUser) {
            if (dto.role === client_1.Role.DRIVER && !existingUser.roles.includes(client_1.Role.DRIVER)) {
                if (!dto.vehicleModel || !dto.vehiclePlate || !dto.vehicleColor) {
                    throw new common_1.BadRequestException('Driver requires vehicle details');
                }
                const isMatch = await bcrypt.compare(dto.password, existingUser.password);
                if (!isMatch)
                    throw new common_1.UnauthorizedException('Invalid credentials for existing account');
                existingUser = await this.usersService.update(existingUser.id, {
                    roles: [...existingUser.roles, client_1.Role.DRIVER],
                    driverProfile: {
                        create: {
                            vehicleModel: dto.vehicleModel,
                            vehiclePlate: dto.vehiclePlate,
                            vehicleColor: dto.vehicleColor,
                        },
                    },
                });
                return this.getTokens(existingUser.id, existingUser.email, existingUser.roles);
            }
            else {
                throw new common_1.BadRequestException('Email already exists');
            }
        }
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const userCreateInput = {
            email: dto.email,
            password: hashedPassword,
            roles: dto.role ? [dto.role] : [client_1.Role.RIDER],
        };
        if (dto.role === client_1.Role.DRIVER) {
            if (!dto.vehicleModel || !dto.vehiclePlate || !dto.vehicleColor) {
                throw new common_1.BadRequestException('Driver requires vehicle details');
            }
            userCreateInput.driverProfile = {
                create: {
                    vehicleModel: dto.vehicleModel,
                    vehiclePlate: dto.vehiclePlate,
                    vehicleColor: dto.vehicleColor,
                },
            };
        }
        const newUser = await this.usersService.create(userCreateInput);
        return this.getTokens(newUser.id, newUser.email, newUser.roles);
    }
    async login(dto) {
        const user = await this.usersService.findByEmail(dto.email);
        if (!user)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const isMatch = await bcrypt.compare(dto.password, user.password);
        if (!isMatch)
            throw new common_1.UnauthorizedException('Invalid credentials');
        return this.getTokens(user.id, user.email, user.roles);
    }
    async logout(userId) {
        await this.redisService.del(`rt:${userId}`);
    }
    async refreshTokens(userId, rt) {
        const user = await this.usersService.findById(userId);
        if (!user)
            throw new common_1.UnauthorizedException('Access Denied');
        const storedRtHash = await this.redisService.get(`rt:${userId}`);
        if (!storedRtHash)
            throw new common_1.UnauthorizedException('Access Denied');
        const rtMatches = await bcrypt.compare(rt, storedRtHash);
        if (!rtMatches)
            throw new common_1.UnauthorizedException('Access Denied');
        return this.getTokens(user.id, user.email, user.roles);
    }
    async getTokens(userId, email, roles) {
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync({ sub: userId, email, roles }, { secret: 'at-secret', expiresIn: '15m' }),
            this.jwtService.signAsync({ sub: userId, email, roles }, { secret: 'rt-secret', expiresIn: '7d' }),
        ]);
        await this.updateRtHash(userId, rt);
        return { access_token: at, refresh_token: rt };
    }
    async updateRtHash(userId, rt) {
        const hash = await bcrypt.hash(rt, 10);
        await this.redisService.set(`rt:${userId}`, hash, 'EX', 604800);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        redis_service_1.RedisService])
], AuthService);
//# sourceMappingURL=auth.service.js.map