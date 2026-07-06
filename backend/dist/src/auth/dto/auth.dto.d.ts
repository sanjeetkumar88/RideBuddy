import { Role } from '@prisma/client';
export declare class RegisterDto {
    email: string;
    password: string;
    role?: Role;
    vehicleModel?: string;
    vehiclePlate?: string;
    vehicleColor?: string;
}
export declare class LoginDto {
    email: string;
    password: string;
}
