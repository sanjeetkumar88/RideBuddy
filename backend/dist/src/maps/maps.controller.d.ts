import { MapsService } from './maps.service';
export declare class MapsController {
    private readonly mapsService;
    constructor(mapsService: MapsService);
    getAutoComplete(input: string): Promise<any>;
    getCoordinates(placeId: string): Promise<{
        lat: any;
        lng: any;
    }>;
}
