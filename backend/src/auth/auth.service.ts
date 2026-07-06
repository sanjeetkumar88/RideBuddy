import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { Role } from '@prisma/client';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private redisService: RedisService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(dto.email);
    if (existingUser) throw new BadRequestException('Email already exists');

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    
    const userCreateInput: any = {
      email: dto.email,
      password: hashedPassword,
      role: dto.role || Role.RIDER,
    };

    if (dto.role === Role.DRIVER) {
      if (!dto.vehicleModel || !dto.vehiclePlate || !dto.vehicleColor) {
        throw new BadRequestException('Driver requires vehicle details');
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
    return this.getTokens(newUser.id, newUser.email, newUser.role);
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    return this.getTokens(user.id, user.email, user.role);
  }

  async logout(userId: string) {
    await this.redisService.del(`rt:${userId}`);
  }

  async refreshTokens(userId: string, rt: string) {
    const user = await this.usersService.findById(userId);
    if (!user) throw new UnauthorizedException('Access Denied');

    const storedRtHash = await this.redisService.get(`rt:${userId}`);
    if (!storedRtHash) throw new UnauthorizedException('Access Denied');

    const rtMatches = await bcrypt.compare(rt, storedRtHash);
    if (!rtMatches) throw new UnauthorizedException('Access Denied');

    return this.getTokens(user.id, user.email, user.role);
  }

  async getTokens(userId: string, email: string, role: string) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email, role },
        { secret: 'at-secret', expiresIn: '15m' },
      ),
      this.jwtService.signAsync(
        { sub: userId, email, role },
        { secret: 'rt-secret', expiresIn: '7d' },
      ),
    ]);

    await this.updateRtHash(userId, rt);
    return { access_token: at, refresh_token: rt };
  }

  async updateRtHash(userId: string, rt: string) {
    const hash = await bcrypt.hash(rt, 10);
    // Store in Redis with TTL of 7 days (604800 seconds)
    await this.redisService.set(`rt:${userId}`, hash, 'EX', 604800);
  }
}
