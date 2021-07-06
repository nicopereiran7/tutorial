import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";

import "./MenuSide.scss";

export default function MenuSide() {
  const { Sider } = Layout;
  return (
    <Sider className="menu-side">
      <Menu
        theme="dark"
        mode="inline"
        defaultOpenKeys={["1"]}
        className="menu-side__menu"
      >
        <Menu.Item key="1">
          <Link to={"/admin"}>
            <Icon type="home" />
            <span className="nav-text">Home</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to={"/admin/products"}>
            <Icon type="menu" />
            <span className="nav-text">Productos</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}
