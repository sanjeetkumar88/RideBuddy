import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
export declare class MapsService {
    private readonly httpService;
    private readonly configService;
    private readonly apiKey;
    private readonly logger;
    private readonly mockLocations;
    constructor(httpService: HttpService, configService: ConfigService);
    getAutoComplete(input: string): Promise<any>;
    getCoordinates(placeId: string): Promise<{
        lat: any;
        lng: any;
    }>;
}
