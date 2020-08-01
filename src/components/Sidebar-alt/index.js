import React, { useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
const { SubMenu } = Menu;
const { Sider } = Layout;

function SidebarAlt({ selectedKey, setSelectedKey }) {
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = collapsed => {
    console.log(collapsed);
    setCollapsed(collapsed => {
      return !collapsed;
    });
  };
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      width={200}
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        justifyContent: 'space-between',
      }}
      className="site-layout-background"
    >
      <div
        className="logo"
        style={{
          color: 'white',
          textAlign: 'center',
          margin: '20px',
          fontSize: collapsed ? '14px' : '20px',
          borderRight: 0,
        }}
      >
        Cisco DevNet
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        // defaultOpenKeys={['sub1']}
        style={{
          borderRight: 0,
        }}
      >
        <Menu.Item onClick={() => setSelectedKey(1)} key="1">
          School
        </Menu.Item>
        <Menu.Item onClick={() => setSelectedKey(2)} key="2">
          Food Items
        </Menu.Item>
      </Menu>
      <Button
        style={{
          width: '80%',
          fontSize: collapsed ? '10px' : '14px',
          margin: '70px auto',
        }}
        type="primary"
      >
        {collapsed ? <ArrowLeftOutlined /> : <GoBack />}
      </Button>
    </Sider>
  );
}

const GoBack = () => {
  return (
    <div>
      <ArrowLeftOutlined style={{ marginRight: '20px' }} />
      List of Schools
    </div>
  );
};

export default SidebarAlt;
