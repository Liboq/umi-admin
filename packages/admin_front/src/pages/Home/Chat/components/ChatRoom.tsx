import { Button, Flex, Input } from 'antd';
import { useEffect, useState } from 'react';
import { socket } from '../socket';
import ChatList from './ChatList';

const ChatRoom = (props) => {
  const [connected, setConnected] = useState(false); // 是否成功链接到socket.io
  const [message, setMessage] = useState(''); // 发送的消息
  const [receivedMessages, setReceivedMessages]: any = useState([]); // 接受所有消息的集合
  const [onlineUser, setOnlineUser] = useState<number>(0); // 当前房间的人

  /**
   * 创建或加入房间
   */
  const createOrJoinRoom = () => {
    socket.emit('join', { id: props.id, nickName: props.nickName });
  };
  /**
   * 发送消息
   */
  const sendMessage = () => {
    socket.emit('newMessage', {
      message: message,
      id: props.id,
      nickName: props.nickName,
      color: props.color,
    });
    setMessage('');
  };
  /**
   * 获取当前房间的人数
   */
  const getOnlineUser = () => {
    socket.emit('getRoomUsers', { id: props.id });
  };
  /**
   * 退出房间
   */
  const leave = () => {
    socket.emit('leave', {
      id: props.id,
      nickName: props.nickName,
    });
    getOnlineUser();
    props.changeRoom({ id: '', nickName: '' });
  };
  useEffect(() => {
    createOrJoinRoom();
    getOnlineUser();
    socket.on('join', (e) => {
      setConnected(true);
      const arr = { message: e, type: 'join' };
      setReceivedMessages((messages) => [...messages, arr]);
    });
    socket.on('leave', (e) => {
      const arr = { message: e, type: 'leave' };
      setReceivedMessages((messages) => [...messages, arr]);
    });
    socket.on('newMessage', (e) => {
      setReceivedMessages((messages) => [...messages, e]);
    });
    socket.on('getRoomUsers', (e) => {
      setOnlineUser(e);
    });
  }, []);
  return (
    <>
      {connected && (
        <div>
          <Button danger onClick={leave}>
            退出房间
          </Button>
          <Flex>
            <div>房间号：{props.id}</div>
            <div>在线人数：{onlineUser}</div>
          </Flex>
          <div>
            内容
            <div>
              <ChatList list={receivedMessages} userName={props.nickName} />
            </div>
          </div>
          <Flex gap="small">
            <Input.TextArea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></Input.TextArea>
            <Button type="primary" onClick={sendMessage}>
              发送
            </Button>
          </Flex>
        </div>
      )}
    </>
  );
};

export default ChatRoom;
