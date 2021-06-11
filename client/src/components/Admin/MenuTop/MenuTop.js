import React from 'react';
import { Button, Icon } from "antd";
import logo from "../../../assets/img/logo.png";

import "./MenuTop.scss";

export default function MenuTop() {
    return (
        <div className="menu-top">
            <div className="menu-top__left">
                <img 
                    className="menu-top__left-logo"
                    src={logo}
                    alt="Nicolas Pereira"
                />
            </div>
            
            <div className="menu-top__right">
                <Button type="link" onClick={() => console.log("cerrando sesion")}>
                    <Icon type="poweroff"/>
                </Button>
            </div>
        </div>
    )
}
