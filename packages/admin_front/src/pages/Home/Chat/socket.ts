import { io } from 'socket.io-client';
const URL = 'https://umiend.liboqiao.top';
export const socket = io(URL, {
  secure: true, // 指定使用安全的 HTTPS 连接
  reconnection: true, // 如果连接断开，自动尝试重新连接
  rejectUnauthorized: false, // 如果服务器的 SSL 证书不受信任，也连接
  transports: ['websocket'],
});
