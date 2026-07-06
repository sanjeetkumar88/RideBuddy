import { Controller, Get, Query } from '@nestjs/common';
import { MapsService } from './maps.service';

@Controller('maps')
export class MapsController {
  constructor(private readonly mapsService: MapsService) {}

  @Get('autocomplete')
  async getAutoComplete(@Query('input') input: string) {
    return this.mapsService.getAutoComplete(input);
  }

  @Get('coordinates')
  async getCoordinates(@Query('placeId') placeId: string) {
    return this.mapsService.getCoordinates(placeId);
  }
}
