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
    let existingUser = await this.usersService.findByEmail(dto.email);
    
    if (existingUser) {
      // If user exists, but is upgrading to Driver
      if (dto.role === Role.DRIVER && !existingUser.roles.includes(Role.DRIVER)) {
        if (!dto.vehicleModel || !dto.vehiclePlate || !dto.vehicleColor) {
          throw new BadRequestException('Driver requires vehicle details');
        }
        
        const isMatch = await bcrypt.compare(dto.password, existingUser.password);
        if (!isMatch) throw new UnauthorizedException('Invalid credentials for existing account');

        existingUser = await this.usersService.update(existingUser.id, {
          roles: [...existingUser.roles, Role.DRIVER],
          driverProfile: {
            create: {
              vehicleModel: dto.vehicleModel,
              vehiclePlate: dto.vehiclePlate,
              vehicleColor: dto.vehicleColor,
            },
          },
        });
        return this.getTokens(existingUser.id, existingUser.email, existingUser.roles);
      } else {
        throw new BadRequestException('Email already exists');
      }
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const userCreateInput: any = {
      email: dto.email,
      password: hashedPassword,
      roles: dto.role ? [dto.role] : [Role.RIDER],
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
    return this.getTokens(newUser.id, newUser.email, newUser.roles);
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    return this.getTokens(user.id, user.email, user.roles);
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

    return this.getTokens(user.id, user.email, user.roles);
  }

  async getTokens(userId: string, email: string, roles: Role[]) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email, roles },
        { secret: 'at-secret', expiresIn: '15m' },
      ),
      this.jwtService.signAsync(
        { sub: userId, email, roles },
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
