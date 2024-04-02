import Guide from '@/components/Guide';
import AddForm from '@/components/Modal/Add';
import { randomColor } from '@/utils';
import { trim } from '@/utils/format';
import {
  PageContainer,
  ProForm,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, message } from 'antd';
import { useState } from 'react';
import ChatRoom from './components/ChatRoom';
import './index.less';
const Chat = () => {
  const [modalVissible, setModalVissible] = useState(false);
  const [chatRoom, setChatRoom] = useState({ id: 0, nickName: '', type: '' });
  const cancel = () => {
    setModalVissible(false);
  };
  const color = randomColor();
  const handleAdd = (value) => {
    if (value.id.length !== 4) {
      message.error('请输入四位数字');
      return;
    }
    setModalVissible(false);
    setChatRoom({ ...chatRoom, ...value });
  };
  const joinRoom = () => {
    setModalVissible(true);
    setChatRoom({ ...chatRoom, type: 'join' });
  };
  const createRoom = () => {
    setModalVissible(true);
    setChatRoom({ ...chatRoom, type: 'create' });
  };
  const changeRoom = (val) => {
    setChatRoom({ ...val, type: 'leave' });
  };
  return (
    <>
      <PageContainer
        ghost
        header={{
          title: '摸鱼室',
          extra: [
            <Button key="1" onClick={joinRoom}>
              加入房间
            </Button>,
            <Button key="2" onClick={createRoom}>
              创建房间
            </Button>,
          ],
        }}
      >
        {!!chatRoom.id && (
          <ChatRoom
            color={color}
            id={chatRoom.id}
            nickName={chatRoom.nickName}
            type={chatRoom.type}
            changeRoom={changeRoom}
          />
        )}
        {!chatRoom.id && <Guide name={trim('请选择你的摸鱼室')} />}
        <AddForm modalVisible={modalVissible} onCancel={cancel} width={420}>
          <ProForm
            initialValues={{
              nickName: '',
              id: '',
            }}
            onFinish={handleAdd}
          >
            <ProForm.Group>
              <ProFormText
                name="id"
                width="md"
                label="房间号"
                placeholder="请输入四位数房间号"
              />
              <ProFormText
                name="nickName"
                width="md"
                label="昵称"
                placeholder="请输入你的昵称"
              />
            </ProForm.Group>
          </ProForm>
        </AddForm>
      </PageContainer>
    </>
  );
};
export default Chat;
