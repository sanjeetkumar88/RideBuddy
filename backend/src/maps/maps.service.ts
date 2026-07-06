import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MapsService {
  private readonly apiKey: string;
  private readonly logger = new Logger(MapsService.name);

  // Mock data for when no API key is provided (Demo Mode)
  private readonly mockLocations = [
    { place_id: 'mock_times_square', description: 'Times Square, Manhattan, NY, USA', lat: 40.7580, lng: -73.9855 },
    { place_id: 'mock_empire_state', description: 'Empire State Building, NY, USA', lat: 40.7484, lng: -73.9857 },
    { place_id: 'mock_central_park', description: 'Central Park, New York, NY, USA', lat: 40.7812, lng: -73.9665 },
    { place_id: 'mock_brooklyn_bridge', description: 'Brooklyn Bridge, NY, USA', lat: 40.7061, lng: -73.9969 },
    { place_id: 'mock_jfk_airport', description: 'JFK Airport, Queens, NY, USA', lat: 40.6413, lng: -73.7781 },
  ];

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('GOOGLE_MAPS_API_KEY') || '';
    if (!this.apiKey) {
      this.logger.warn('No GOOGLE_MAPS_API_KEY found! MapsService is running in DEMO MODE with mock data.');
    }
  }

  async getAutoComplete(input: string) {
    if (!this.apiKey) {
      // Demo Mode: Filter mock locations based on input
      const filtered = this.mockLocations.filter(m => 
        m.description.toLowerCase().includes(input.toLowerCase())
      );
      return {
        status: 'OK',
        predictions: filtered.length > 0 ? filtered : this.mockLocations, // Show all if no match
      };
    }
    
    try {
      const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json`;
      const response = await firstValueFrom(
        this.httpService.get(url, {
          params: {
            input,
            key: this.apiKey,
          },
        }),
      );
      return response.data;
    } catch (error: any) {
      throw new HttpException(
        error.response?.data || 'Error fetching autocomplete suggestions',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getCoordinates(placeId: string) {
    if (!this.apiKey) {
      // Demo Mode: Find mock coordinates
      const location = this.mockLocations.find(m => m.place_id === placeId);
      if (location) {
        return { lat: location.lat, lng: location.lng };
      }
      return { lat: 40.7128, lng: -74.0060 }; // Default NYC fallback
    }

    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json`;
      const response = await firstValueFrom(
        this.httpService.get(url, {
          params: {
            place_id: placeId,
            key: this.apiKey,
          },
        }),
      );

      const data = response.data;
      if (data.status !== 'OK' || !data.results || data.results.length === 0) {
        throw new HttpException('Could not resolve coordinates for placeId', HttpStatus.BAD_REQUEST);
      }

      const location = data.results[0].geometry.location;
      return {
        lat: location.lat,
        lng: location.lng,
      };
    } catch (error: any) {
      throw new HttpException(
        error.response?.data || 'Error fetching coordinates',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
