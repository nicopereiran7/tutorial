import React, { useState } from "react";
import { Form, Icon, Input, Button, notification } from "antd";
import { signInApi } from "../../../api/user";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../utils/contants";

import "./LoginForm.scss";

export default function LoginForm() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const changeForm = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const login = async (e) => {
    e.preventDefault();
    const result = await signInApi(inputs);

    if (result.message) {
      notification["error"]({
        message: result.message,
      });
    } else {
      const { accessToken, refreshToken } = result;

      localStorage.setItem(ACCESS_TOKEN, accessToken);
      localStorage.setItem(REFRESH_TOKEN, refreshToken);

      notification["success"]({
        message: "Login Correcto",
      });

      window.location.href = "/admin";
    }
  };

  return (
    <Form className="login-form" onChange={changeForm} onSubmit={login}>
      <Form.Item>
        <Input
          prefix={<Icon type="user" />}
          type="email"
          name="email"
          placeholder="Ingrese Correo Electronico"
          className="login-form__input"
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<Icon type="lock" />}
          type="password"
          name="password"
          placeholder="Ingrese Contraseña"
          className="login-form__input"
        />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" className="login-form__btn">
          Entrar
        </Button>
      </Form.Item>
    </Form>
  );
}
