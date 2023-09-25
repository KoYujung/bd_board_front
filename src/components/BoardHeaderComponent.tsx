import { HomeOutlined, LoginOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SmileOutlined } from '@ant-design/icons';
import { Button, Menu, MenuProps } from 'antd';
import { Header } from 'antd/es/layout/layout'
import MenuItem from 'antd/es/menu/MenuItem';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number];

export default function BoardHeaderComponent() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }
  
  const items: MenuItem[] = [
    getItem('HOME', '1', <HomeOutlined />),
    getItem('LOGIN', '2', <LoginOutlined  />),
  
    getItem('OTHERS', 'sub1', <SmileOutlined />, [
      getItem('Option 1', '3'),
      getItem('Option 2', '4'),
    ]),
  ];

  return (
    <div>
      <Header
        style={{
          position: 'sticky',
          zIndex: 1,
          display: 'flex',
          fontSize : 20,
          padding : 0
        }}
      >
      <Button type="primary" onClick={toggleCollapsed} style={{ margin: 15 }}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <a onClick={() => navigate('/')} style={{cursor: 'pointer', color: 'white', margin: 'auto'}}>게시판</a>
      </Header>

      <div style={{ width: 200 , height: "100%",}}>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
        onClick={({key}) => {
          if(key === '1') {
            navigate('/board');
          } else if (key === '2') {
            navigate('/create_board');
          }
        }}
      />
    </div>
    </div>
  )
}
