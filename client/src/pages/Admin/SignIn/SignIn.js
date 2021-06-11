import React from "react";
import { Layout, Tabs } from "antd";
import RegisterForm from "../../../components/Admin/RegisterForm";

import "./SignIn.scss";

export default function SignIn() {
  const { Content } = Layout;
  const { TabPane } = Tabs;

  return (
    <Layout className="sign-in">
      <Content className="sign-in__content">
        <div className="sign-in__content-tabs">
          <Tabs type="card">
            <TabPane tab={<span>Entrar</span>} key="1">
              Componenete LoginForm
            </TabPane>
            <TabPane tab={<span>Nuevo Usuario</span>} key="2">
              <RegisterForm />
            </TabPane>
          </Tabs>
        </div>
      </Content>
    </Layout>
  );
}
