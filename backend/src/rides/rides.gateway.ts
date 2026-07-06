import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: '/rides',
})
export class RidesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger = new Logger(RidesGateway.name);

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  // Driver explicitly joins their personal room based on driverId
  @SubscribeMessage('join')
  handleJoinRoom(
    @MessageBody('driverId') driverId: string,
    @ConnectedSocket() client: Socket,
  ) {
    if (driverId) {
      client.join(driverId);
      this.logger.log(`Client ${client.id} joined room ${driverId}`);
      return { success: true, room: driverId };
    }
    return { success: false, message: 'Missing driverId' };
  }

  // Method to emit events to a specific driver from the backend services
  notifyDriver(driverId: string, event: string, payload: any) {
    this.server.to(driverId).emit(event, payload);
    this.logger.log(`Emitted ${event} to driver ${driverId}`);
  }
}
