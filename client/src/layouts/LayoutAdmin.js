import React from 'react';
import { Layout } from "antd";
import { Route, Switch, Redirect } from "react-router-dom";
import MenuTop from "../components/Admin/MenuTop";
import MenuSide from "../components/Admin/MenuSide";
import AdminSignIn from "../pages/Admin/SignIn";

import "./LayoutAdmin.scss";

export default function LayoutAdmin(props) {
    const { routes } = props;
    const { Header, Content, Footer } = Layout;

    const user = null;

    if(!user) {
        return (
            <>
                <Route path="/admin/login" component={AdminSignIn}/>
                <Redirect to="/admin/login"/>
            </>
        );
    }

    return (
        <Layout>
            <MenuSide />
            <Layout className="layout-admin">
                <Header className="layout-admin__header">
                    <MenuTop />
                </Header>
                <Content className="layout-admin__content">
                    <LoadRoutes routes={routes}/>
                </Content>
                <Footer className="layout-admin__footer">Inventario...</Footer>
            </Layout>
        </Layout>
    )
}

function LoadRoutes(props) {
    const { routes } = props;
    return (
        <Switch>
            {routes.map((route, index) => (
                <Route 
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    render={route.component}
                />
            ))}
        </Switch>
    );
}
