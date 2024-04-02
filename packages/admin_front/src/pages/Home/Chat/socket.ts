import { io } from 'socket.io-client';
const URL = 'http://127.0.0.1:1101';
export const socket = io(URL, {
  transports: ['websocket', 'polling', 'flashsocket'],
});
