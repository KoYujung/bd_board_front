import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function LoginComponent() {
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
      };

    const navigate = useNavigate();

    return (
        <Form
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}>

        <Form.Item
          rules={[{ required: true, message: '아이디를 입력해주세요!', }]}>
          <Input prefix={<UserOutlined />} placeholder="아이디" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: '비밀번호를 입력해주세요!', }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="비밀번호"
          />
        </Form.Item>
  
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button><a onClick={() => navigate('/register_board')}>회원가입</a></Form.Item>
      </Form>
  )
}