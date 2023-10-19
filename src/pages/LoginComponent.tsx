import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface loginType{
  uid:string,
  upass:string
};

export default function LoginComponent() {
  const [login, setLogin] = useState<loginType>();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    setLogin(values);
    console.log(login);
  };

  return (
    <Form
    className="login-form"
    initialValues={{ remember: true }}
    onFinish={onFinish}>
      <Form.Item
        name="uid"
        rules={[{ required: true, message: '아이디를 입력해주세요!', }]}>
        <Input prefix={<UserOutlined />} placeholder="아이디" />
      </Form.Item>

      <Form.Item
        name="upass"
        rules={[{ required: true, message: '비밀번호를 입력해주세요!', }]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="비밀번호"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">로그인</Button>
        <a onClick={() => navigate('/register_member')}>회원가입</a>
      </Form.Item>
    </Form>
  )
}