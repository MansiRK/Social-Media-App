import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import './default.css'
import { Link } from 'react-router-dom';
import Home from '../pages/home';

const { Header, Sider, Content } = Layout;

const Default = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[window.location.pathname]}
        >
          {/* Using Link component for navigation */}
          <Menu.Item key="/" icon={<UserOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="/addpost" icon={<VideoCameraOutlined />}>
            <Link to="/addpost">Add Post</Link>
          </Menu.Item>
          <Menu.Item key="/profile" icon={<UploadOutlined />}>
            <Link to="/profile">Profile</Link>
          </Menu.Item>
          <Menu.Item icon={<LogoutOutlined />}>
            <Link onClick={()=>{localStorage.removeItem(('user'), window.location.reload)}}>Logout</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header 
          style={{
            padding: 0,
            background: colorBgContainer, 
          }}
        >
          <div className='d-flex justify-content-between bs1'>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })
            }
            <h2>MR</h2>
            <h4>{JSON.parse(localStorage.getItem('user')).username}</h4>
          </div>
        </Header>
        <Content
          style={{
           
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Default;
