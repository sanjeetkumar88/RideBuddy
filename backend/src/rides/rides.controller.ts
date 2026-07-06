import { Controller, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { RidesService } from './rides.service';
import { RequestRideDto, UpdateLocationDto } from './dto/rides.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller('rides')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class RidesController {
  constructor(private readonly ridesService: RidesService) {}

  // --- Rider Flow ---
  
  @Post('request')
  @Roles(Role.RIDER)
  async requestRide(@Req() req: any, @Body() dto: RequestRideDto) {
    // req.user comes from JwtStrategy
    return this.ridesService.requestRide(req.user.sub, dto);
  }

  // --- Driver Flow ---

  @Post('driver/location')
  @Roles(Role.DRIVER)
  async updateLocation(@Req() req: any, @Body() dto: UpdateLocationDto) {
    return this.ridesService.updateDriverLocation(req.user.sub, dto);
  }

  // --- Concurrency Handling ---
  
  @Post(':id/accept')
  @Roles(Role.DRIVER)
  async acceptRide(@Req() req: any, @Param('id') rideId: string) {
    return this.ridesService.acceptRide(req.user.sub, rideId);
  }
}
