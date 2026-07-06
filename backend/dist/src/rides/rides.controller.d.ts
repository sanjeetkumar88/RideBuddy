import { RidesService } from './rides.service';
import { RequestRideDto, UpdateLocationDto } from './dto/rides.dto';
export declare class RidesController {
    private readonly ridesService;
    constructor(ridesService: RidesService);
    requestRide(req: any, dto: RequestRideDto): Promise<{
        id: string;
        status: import("@prisma/client").$Enums.RideStatus;
        pickupLat: number;
        pickupLng: number;
        dropLat: number;
        dropLng: number;
        createdAt: Date;
        updatedAt: Date;
        riderId: string;
        driverId: string | null;
    }>;
    updateLocation(req: any, dto: UpdateLocationDto): Promise<{
        success: boolean;
    }>;
    acceptRide(req: any, rideId: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
