import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private onlineUsers = new Map<string, string>();

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    console.log(`✅ Client connected: ${client.id}, userId: ${userId}`);

    if (userId) {
      this.onlineUsers.set(userId, client.id);
      console.log('📌 Current online users:', this.onlineUsers);
    }
     if (!userId) {
    console.error(`❌ userId is missing. Disconnecting ${client.id}`);
    client.disconnect();
    return;
  }
   client.join(userId);
  }

  handleDisconnect(client: Socket) {
    console.log(`❌ Client disconnected: ${client.id}`);
    const userId = [...this.onlineUsers.entries()].find(([, socketId]) => socketId === client.id)?.[0];
    if (userId) {
      this.onlineUsers.delete(userId);
      console.log('📌 After disconnect:', this.onlineUsers);
    }
  }

  sendNotification(userId: string, message: string) {
    const socketId = this.onlineUsers.get(userId);
    console.log(`🔔 Sending notification to userId: ${userId}, socketId: ${socketId}, message: ${message}`);

    if (socketId) {
      this.server.to(socketId).emit('notification', { message });
      console.log(' Notification emitted successfully');
    } else {
      console.log(' User is offline, cannot send notification');
    }
  }
}
