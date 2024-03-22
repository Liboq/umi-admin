import { login } from '@/utils/request/user';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {
  LoginForm,
  ProFormInstance,
  ProFormText,
} from '@ant-design/pro-components';
import { useModel, useNavigate } from '@umijs/max';
import { Tabs, theme } from 'antd';
import { useRef, useState } from 'react';
import { register } from '../../utils/request/user/index';
type tabType = 'login' | 'register';

const Login = () => {
  const { token } = theme.useToken();
  const [tabType, setTabType] = useState<tabType>('login');
  const navigate = useNavigate();
  const formRef = useRef<ProFormInstance>();
  const { refresh } = useModel('@@initialState');
  const handleSubmit = async (values) => {
    if (tabType === 'login') {
      handleLogin(values);
    }
    if (tabType === 'register') {
      handleRegister(values);
    }
  };
  const handleLogin = async (values: any) => {
    const res = await login(values);
    if (res.data) {
      const { token, user_info } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user_info', JSON.stringify(user_info));
      navigate('/');
      refresh();
    }
  };
  const handleRegister = async (values: any) => {
    const res = await register(values);
    if (res.status === 200) {
      navigate('/login');
    }
  };
  const validatePassword = (_, value, callback) => {
    console.log(formRef);

    const { password } = formRef.current?.getFieldsFormatValue?.();

    if (value === password) {
      callback();
    } else {
      callback('两次输入的密码不一致');
    }
  };
  return (
    <div
      style={{ backgroundColor: token.colorBgContainer, marginTop: '100px' }}
    >
      <LoginForm
        logo="https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg"
        title="Github"
        subTitle="全球最大的代码托管平台"
        onFinish={handleSubmit}
        formRef={formRef}
      >
        <Tabs
          centered
          activeKey={tabType}
          onChange={(activeKey) => setTabType(activeKey as tabType)}
        >
          <Tabs.TabPane key={'login'} tab={'账号密码登录'} />
          <Tabs.TabPane key={'register'} tab={'账号注册'} />
        </Tabs>
        {tabType === 'login' && (
          <>
            <ProFormText
              name="name"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={'prefixIcon'} />,
              }}
              placeholder={'用户名'}
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'} />,
                strengthText:
                  'Password should contain numbers, letters and special characters, at least 8 characters long.',
                statusRender: (value) => {
                  const getStatus = () => {
                    if (value && value.length > 12) {
                      return 'ok';
                    }
                    if (value && value.length > 6) {
                      return 'pass';
                    }
                    return 'poor';
                  };
                  const status = getStatus();
                  if (status === 'pass') {
                    return (
                      <div style={{ color: token.colorWarning }}>强度：中</div>
                    );
                  }
                  if (status === 'ok') {
                    return (
                      <div style={{ color: token.colorSuccess }}>强度：强</div>
                    );
                  }
                  return (
                    <div style={{ color: token.colorError }}>强度：弱</div>
                  );
                },
              }}
              placeholder={'密码'}
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
            />
          </>
        )}
        {tabType === 'register' && (
          <>
            <ProFormText
              name="name"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={'prefixIcon'} />,
              }}
              placeholder={'用户名'}
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'} />,
                strengthText:
                  'Password should contain numbers, letters and special characters, at least 8 characters long.',
                statusRender: (value) => {
                  const getStatus = () => {
                    if (value && value.length > 12) {
                      return 'ok';
                    }
                    if (value && value.length > 6) {
                      return 'pass';
                    }
                    return 'poor';
                  };
                  const status = getStatus();
                  if (status === 'pass') {
                    return (
                      <div style={{ color: token.colorWarning }}>强度：中</div>
                    );
                  }
                  if (status === 'ok') {
                    return (
                      <div style={{ color: token.colorSuccess }}>强度：强</div>
                    );
                  }
                  return (
                    <div style={{ color: token.colorError }}>强度：弱</div>
                  );
                },
              }}
              placeholder={'密码'}
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
            />
            <ProFormText.Password
              name="rpassword"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'} />,
                strengthText: '与上方 密码保持一致',
                statusRender: (value) => {
                  const getStatus = () => {
                    if (value && value.length > 12) {
                      return 'ok';
                    }
                    if (value && value.length > 6) {
                      return 'pass';
                    }
                    return 'poor';
                  };
                  const status = getStatus();
                  if (status === 'pass') {
                    return (
                      <div style={{ color: token.colorWarning }}>强度：中</div>
                    );
                  }
                  if (status === 'ok') {
                    return (
                      <div style={{ color: token.colorSuccess }}>强度：强</div>
                    );
                  }
                  return (
                    <div style={{ color: token.colorError }}>强度：弱</div>
                  );
                },
              }}
              placeholder={'密码'}
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
                {
                  validator: validatePassword,
                },
              ]}
            />
          </>
        )}
        <div
          style={{
            marginBlockEnd: 24,
          }}
        >
          <a
            style={{
              float: 'right',
            }}
          >
            忘记密码
          </a>
        </div>
      </LoginForm>
    </div>
  );
};
export default Login;
