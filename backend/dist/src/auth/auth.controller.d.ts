import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import type { Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto, res: Response): Promise<{
        message: string;
    }>;
    login(dto: LoginDto, res: Response): Promise<{
        message: string;
    }>;
    getProfile(req: any): Promise<any>;
    logout(req: any, res: Response): Promise<{
        message: string;
    }>;
    refreshTokens(req: any, res: Response): Promise<{
        message: string;
    }>;
    private setCookies;
}
