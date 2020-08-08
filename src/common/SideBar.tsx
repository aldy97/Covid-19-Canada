import React, { useState } from 'react';
import styled from 'styled-components';
import { Menu, Button } from 'antd';
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
} from '@ant-design/icons';
import 'antd/dist/antd.css';

const { SubMenu } = Menu;

const StyledSideBar = styled.div`
  margin-top: 10px;
  position: fixed;
  width: 256px;
`;

function SideBar() {
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <StyledSideBar>
      <Button
        type='primary'
        onClick={toggleCollapsed}
        style={{ marginBottom: 16 }}
      >
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
      </Button>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode='inline'
        theme='dark'
        inlineCollapsed={collapsed}
      >
        <Menu.Item key='1' icon={<PieChartOutlined />}>
          Option 1
        </Menu.Item>
        <Menu.Item key='2' icon={<DesktopOutlined />}>
          Option 2
        </Menu.Item>
        <Menu.Item key='3' icon={<ContainerOutlined />}>
          Option 3
        </Menu.Item>
        <SubMenu key='sub2' icon={<AppstoreOutlined />} title='Navigation Two'>
          <Menu.Item key='9'>Option 9</Menu.Item>
          <Menu.Item key='10'>Option 10</Menu.Item>
          <SubMenu key='sub3' title='Submenu'>
            <Menu.Item key='11'>Option 11</Menu.Item>
            <Menu.Item key='12'>Option 12</Menu.Item>
          </SubMenu>
        </SubMenu>
      </Menu>
    </StyledSideBar>
  );
}

export default SideBar;