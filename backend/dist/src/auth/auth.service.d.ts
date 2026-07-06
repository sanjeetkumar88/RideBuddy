import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { Role } from '@prisma/client';
import { RedisService } from '../redis/redis.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    private redisService;
    constructor(usersService: UsersService, jwtService: JwtService, redisService: RedisService);
    register(dto: RegisterDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    login(dto: LoginDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    logout(userId: string): Promise<void>;
    refreshTokens(userId: string, rt: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    getTokens(userId: string, email: string, roles: Role[]): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    updateRtHash(userId: string, rt: string): Promise<void>;
}
