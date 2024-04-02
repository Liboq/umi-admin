import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

// @WebSocketGateway是一个装饰器，用于创建WebSocket网关类。WebSocket网关类是用于处理 WebSocket连接和消息的核心组件之一。
// 它充当WebSocket服务端的中间人，负责处理客户端发起的连接请求，并定义处理不同类型消息的逻辑
@WebSocketGateway({ cors: { origin: '*' } })
export class EventGateway {
  constructor() {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('newMessage')
  handleMessage(@MessageBody() body: any, @ConnectedSocket() client: Socket) {
    console.log(body);
    const msg: any = {};
    const { id, nickName, message,color } = body || {};
    msg.message = message;
    msg.nickName = nickName;
    msg.id = id;
    msg.color = color
    this.server.to(id).emit('newMessage', msg);
  }
  // 离开房间
  @SubscribeMessage('leave')
  handleLeave(@MessageBody() body: any, @ConnectedSocket() client: Socket) {
    const { id, nickName } = body || {};
    // 先广播离开消息给房间内其他人
    this.server.to(id).emit('leave', `用户：${nickName}离开了房间 ${id}`);
    client.leave(id);
  }
  // 创建房间并加入房间
  @SubscribeMessage('join')
  handleJoin(@MessageBody() body: any, @ConnectedSocket() client: Socket) {
    console.log('jin', body);
    const { id, nickName } = body || {};
    client.join(id);
    // client只能给发送给发起请求的客户端
    // client.emit('join', `用户：${nickName}加入了房间 ${id}`);
    // 广播消息给除自己以外的所有客户端
    // client.broadcast.emit('join', `用户：${nickName}加入了房间 ${id}`);
    // 使用服务器实例来广播消息给所有客户端
    this.server.to(id).emit('join', `用户：${nickName}加入了房间 ${id}`);
  }

  // 获取当前房间的人数
  @SubscribeMessage('getRoomUsers')
  handleGetRoomUsers(
    @MessageBody() body: any,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(body);

    const room = this.server.sockets.adapter.rooms.get(body.id);
    if (room) {
      this.server.to(body.id).emit('getRoomUsers', room.size);
    } else {
      this.server.to(body.id).emit('getRoomUsers', 0);
    }
  }
}
