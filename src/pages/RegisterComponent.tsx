import React from 'react';
import {
  Button,
  Checkbox,
  Form,
  Input,
} from 'antd';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export default function RegisterComponent() {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
      scrollToFirstError
    >
        <Form.Item
        name="name"
        label="이름"
        rules={[
        {
            required: true,
            message: '이름을 입력해주세요!',
        },
        ]}
        >
        <Input />
      </Form.Item>

        <Form.Item
        name="id"
        label="아이디"
        rules={[
          {
            required: true,
            message: '아이디를 입력해주세요!',
          },
        ]}
        >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="비밀번호"
        rules={[
          {
            required: true,
            message: '비밀번호를 입력해주세요!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="비밀번호 확인"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: '비밀번호 확인을 입력해주세요!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('입력된 비밀번호가 다릅니다!',));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">회원가입
        </Button>
      </Form.Item>
    </Form>
  );
};