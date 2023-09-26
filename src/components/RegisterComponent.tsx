import React, { useState } from 'react';
import {
  Button,
  Form,
  Input,
} from 'antd';
import BoardService from '../service/BoardService';

export default function RegisterComponent() {
    const [userData, setUserData] = useState({
        uid: '',
        upass: '',
        uname: ''
    });

    const [form] = Form.useForm();
    const inputName = (e : React.ChangeEvent<HTMLInputElement>) => {
        setUserData({...userData, uname : e.target.value});
    }
    const inputId = (e : React.ChangeEvent<HTMLInputElement>) => {
        setUserData({...userData, uid : e.target.value});
    }
    const inputPass = (e : React.ChangeEvent<HTMLInputElement>) => {
        setUserData({...userData, upass : e.target.value});
    }
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
    const register = (e : React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        console.log(userData);
    };

    return (
        <Form
        {...formItemLayout}
        form={form}
        name="register"
        style={{ maxWidth: 600 }}
        scrollToFirstError
        >
            
        <Form.Item
        name="uname"
        label="이름"
        rules={[
        {
            type: 'string',
            message: '이름을 입력해주세요!',
        },
        {
            required: true,
            message: '이름을 입력해주세요!',
        },
        ]}
        ><Input onInput={inputName} value={userData.uname}/>
        </Form.Item>

        <Form.Item
        name="uid"
        label="아이디"
        rules={[
        {
            type: 'string',
            message: '아이디를 입력해주세요!',
        },
        {
            required: true,
            message: '아이디를 입력해주세요!',
        },
        ]}
        ><Input onInput={inputId} value={userData.uid}/>
        </Form.Item>

        <Form.Item
            name="upass"
            label="비밀번호"
            rules={[
            {
                required: true,
                message: '비밀번호를 입력해주세요!',
            },
            ]}
            hasFeedback
        ><Input.Password onInput={inputPass} value={userData.upass}/>
        </Form.Item>

        <Form.Item
            name="confirm"
            label="비밀번호 확인"
            dependencies={['upass']}
            hasFeedback
            rules={[
            {
                required: true,
                message: '비밀번호를 입력해주세요!',
            },
            ({ getFieldValue }) => ({
                validator(_, value) {
                if (!value || getFieldValue('upass') === value) {
                    return Promise.resolve();
                }
                return Promise.reject(new Error('비밀번호가 일치하지 않아요!'));
                },
            }),
            ]}
        ><Input.Password />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" onClick={register}>회원가입
            </Button>
        </Form.Item>
        </Form>
  );
};