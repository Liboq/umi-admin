// 运行时配置
import { BulbOutlined, LogoutOutlined } from '@ant-design/icons';
import {
  RunTimeLayoutConfig,
  history,
  useAccess,
  useNavigate,
} from '@umijs/max';
import { Dropdown, MappingAlgorithm, MenuProps, theme } from 'antd';
import { useAntdConfigSetter } from 'umi';
// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{
  user_info?: API.UserInfo;
  roles?: any[];
}> {
  let user_info;
  let roleList;
  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem('token');
      const user_info = JSON.parse(localStorage.getItem('user_info') || '');
      if (!token || !user_info) {
        history.push('/login');
      }
      return { token, user_info };
    } catch (error) {
      history.push('/login');
    }
    return { token: null, user_info: null };
  };
  if (history.location.pathname !== '/login') {
    const res = await fetchUserInfo();
    const { roles, ...reset } = res.user_info;
    user_info = reset;
    roleList = roles;
  }
  return {
    user_info,
    roles: roleList,
  };
}

const { darkAlgorithm, defaultAlgorithm } = theme;
const RightMenu = ({ dom }) => {
  const navigate = useNavigate();
  const setAntdConfig = useAntdConfigSetter();
  const DropdownItems: MenuProps['items'] = [
    {
      key: 'theme',
      icon: <BulbOutlined />,
      label: '切换主题',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];
  const DropdownOnClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case 'logout':
        navigate('/login');
        localStorage.setItem('token', '');
        localStorage.setItem('user_info', '');
        break;
      case 'theme':
        setAntdConfig((config: any) => {
          const algorithm = config.theme!.algorithm as MappingAlgorithm[];
          if (algorithm && algorithm.includes(darkAlgorithm)) {
            config.theme!.algorithm = [defaultAlgorithm];
          } else {
            config.theme!.algorithm = [darkAlgorithm];
          }
          return config;
        });
        break;
    }
  };
  return (
    <>
      <Dropdown
        menu={{
          items: DropdownItems,
          onClick: DropdownOnClick,
        }}
      >
        {dom}
      </Dropdown>
    </>
  );
};
export const layout: RunTimeLayoutConfig = ({ initialState }: any) => {
  const { user_info } = initialState;
  const access = useAccess();
  console.log(access);

  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
    antd: {
      configProvider: {},
    },
    title: 'hot',
    layout: 'mix', //菜单的方式，有mix,top,side三种，这里用mix
    splitMenus: true, // 这里用了mix才会生效
    avatarProps: {
      src: initialState?.user_info?.avator || undefined, //右上角头像
      title: initialState?.user_info?.name || '用户', //右上角名称
      size: 'small',
      render: (props, dom) => {
        return <RightMenu dom={dom} />;
      },
    },
  };
};
