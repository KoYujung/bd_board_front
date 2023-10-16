import React, { useState } from 'react';
import './index.css';
import './App.css';
import { Layout, Menu, Button, theme } from 'antd';
import ListBoardComponent from './pages/ListBoardComponent';
import { Footer } from 'antd/es/layout/layout';
import { Route, Routes, useNavigate } from 'react-router-dom';
import MainComponent from './pages/MainComponent';
import CreateBoardComponent from './pages/CreateBoardComponent';
import UpdateBoardComponent from './pages/UpdateBoardComponent';
import ReadBoardComponent from './pages/ReadBoardComponent';
import {
    FormOutlined,
    HomeOutlined,
    LoginOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SmileOutlined,
  } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

export default function App_menu() {
  const [collapsed, setCollapsed] = useState(false);
  const {token: { colorBgContainer }} = theme.useToken();
  const navigate = useNavigate();

  return (
    <>
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <HomeOutlined />,
              label: '홈',
            },
            {
              key: '2',
              icon: <SmileOutlined />,
              label: '게시판',
            },
            {
              key: '3',
              icon: <FormOutlined />,
              label: '글 작성',
            },
            {
              key: '4',
              icon: <LoginOutlined />,
              label: '로그인',
            },
          ]}
          onClick={({key}) => {
            switch(key) {
                case '1':
                    navigate('/');
                    break;
                case '2':
                    navigate('/board');
                    break;
                case '3':
                    navigate('/create_board');
                    break;
                case '4':
                    navigate('/login_board');
                    break;
            }
          }}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}

          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          /><a onClick={() => navigate('/')} style={{cursor: 'pointer', color: '#1677ff', fontSize: 23}}>게시판</a>
        </Header>
        <Content 
          style={{
            margin: '24px 16px',
            minHeight: '78vh',
            background: colorBgContainer,
          }}
        >
        <div className='board_content'>
          <Routes>
            <Route path='/' element={<MainComponent />} />
            <Route path='/board' element={<ListBoardComponent />} />
            <Route path='/create_board' element={<CreateBoardComponent />} />
            <Route path='/update_board/:no' element={<UpdateBoardComponent />} />
            <Route path='/read_board/:no' element={<ReadBoardComponent />} />
          </Routes>
        </div>
        </Content>
      </Layout>
    </Layout>
    <Footer>©2023 Created by yuu</Footer>
    </>
  );
};