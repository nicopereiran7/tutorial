import React from 'react';
import { Layout } from "antd";
import { Route } from "react-router-dom";

export default function LayoutBasic(props) {
    const { routes } = props;
    const { Header, Content, Footer } = Layout;
    return (
        <Layout>
            <Header>Header...</Header>
            <Layout>
                <Content>
                    <LoadRoutes routes={routes}/>
                </Content>
                <Footer>Nicolas Pereira</Footer>
            </Layout>
        </Layout>
    )
}

function LoadRoutes(props) {
    const { routes } = props;
    console.log(routes);
    return routes.map((route, index) => (
        <Route 
            key={index}
            path={route.path}
            exact={route.exact}
            render={route.component}
        />
    ))
}
