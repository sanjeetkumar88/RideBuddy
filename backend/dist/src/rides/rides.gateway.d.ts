import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class RidesGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private logger;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleJoinRoom(driverId: string, client: Socket): {
        success: boolean;
        room: string;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
        room?: undefined;
    };
    notifyDriver(driverId: string, event: string, payload: any): void;
}
