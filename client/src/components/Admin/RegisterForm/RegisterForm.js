import React, { useState } from 'react';
import { Form, Input, Button, notification, Icon } from "antd";
import { nombreValidation, minLengthValidation, emailValidation } from "../../../utils/formValidations";
import { signUpApi } from "../../../api/user";

import "./RegisterForm.scss";

export default function RegisterForm() {
    const [inputs, setInputs] = useState({
        name: "",
        lastname: "",
        email: "",
        password: "",
        repeatPassword: ""
    })

    const [formValid, setFormValid] = useState({
        name: false,
        lastname: false,
        email: false,
        password: false,
        repeatPassword: false
    })

    const changeForm = e => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value 
        })
    }

    const inputValidation = e => {
        
        const { type, name } = e.target;

        if(type === "email") {
            setFormValid({
                ...formValid,
                [name]: emailValidation(e.target)
            })
        }else if(type === "password") {
            setFormValid({
                ...formValid,
                [name]: minLengthValidation(e.target, 6)
            })
        }else if(type === "text") {
            setFormValid({
                ...formValid,
                [name]: nombreValidation(e.target)
            })
        }
    }

    const register = async e => {
        e.preventDefault();
        const { name, lastname, email, password, repeatPassword } = inputs;

        if(!name || !lastname || !email || !password || !repeatPassword) {
            notification["error"]({
                message: "Todos los campos son obligatorios"
            })
        }else {
            if(password !== repeatPassword) {
                notification["error"]({
                    message: "Las contraseñas no son iguales"
                })
            }else{
                const result = await signUpApi(inputs);
                if(!result.ok) {
                    notification["error"]({
                        message: result.message
                    })
                }else {
                    notification["success"]({
                        message: result.message
                    })
                    resetForm();
                }
            }
        }
    }

    const resetForm = () => {
        const inputs = document.getElementsByTagName("input");
        for(let i = 0; i<inputs.length; i++) {
            inputs[i].classList.remove("success");
            inputs[i].classList.remove("error");
        }

        setInputs({
            name: "",
            lastname: "",
            email: "",
            password: "",
            repeatPassword: ""
        })

        setFormValid({
            name: false,
            lastname: false,
            email: false,
            password: false,
            repeatPassword: false
        })
    }

    return (
        <Form className="register-form" onSubmit={register} onChange={changeForm}> 
            <Form.Item>
                <Input 
                    prefix={<Icon type="user"/>}
                    type="text"
                    name="name"
                    placeholder="Ingresa Tu Nombre"
                    className="register-form__input"
                    value={inputs.name}
                    onChange={inputValidation}
                />
            </Form.Item>
            <Form.Item>
                <Input 
                    prefix={<Icon type="user"/>}
                    type="text"
                    name="lastname"
                    placeholder="Ingresa Tu Apellido"
                    className="register-form__input"
                    value={inputs.lastname}
                    onChange={inputValidation}
                />
            </Form.Item>
            <Form.Item>
                <Input 
                    prefix={<Icon type="mail"/>}
                    type="email"
                    name="email"
                    placeholder="Ingresa Tu Correo Electronico"
                    className="register-form__input"
                    value={inputs.email}
                    onChange={inputValidation}
                />
            </Form.Item>
            <Form.Item>
                <Input 
                    prefix={<Icon type="lock"/>}
                    type="password"
                    name="password"
                    placeholder="Ingresa Contraseña"
                    className="register-form__input"
                    value={inputs.password}
                    onChange={inputValidation}
                />
            </Form.Item>
            <Form.Item>
                <Input 
                    prefix={<Icon type="lock"/>}
                    type="password"
                    name="repeatPassword"
                    placeholder="Repite tu Contraseña"
                    className="register-form__input"
                    value={inputs.repeatPassword}
                    onChange={inputValidation}
                />
            </Form.Item>
            <Form.Item>
                <Button className="register-form__btn" htmlType="submit">Crear Nuevo Usuario</Button>
            </Form.Item>
        </Form>
    )
}
