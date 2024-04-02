import { Avatar, Flex } from 'antd';
const ChatList = (props) => {
  console.log(props);

  const { list, userName } = props;

  return (
    <div className="message-box">
      {list.map((item, index) => {
        return userName == item.nickName ? (
          <Flex justify="flex-end" className="message-user" key={index}>
            <Flex className="message-text" align="center">
              {item.message}
            </Flex>
            {!!item.nickName && (
              <Avatar
                className="avator"
                style={{ backgroundColor: item.color }}
                size={40}
              >
                {item.nickName}
              </Avatar>
            )}
          </Flex>
        ) : (
          <Flex
            justify={!!item.nickName ? '' : 'center'}
            className="message-another"
            key={index}
          >
            {!!item.nickName && (
              <Avatar style={{ backgroundColor: item.color }} size={40}>
                {item.nickName}
              </Avatar>
            )}
            {!!item.nickName ? (
              <Flex align="center" className="message-text">
                {item.message}
              </Flex>
            ) : (
              <div className="welcome">{item.message}</div>
            )}
          </Flex>
        );
      })}
    </div>
  );
};
export default ChatList;
