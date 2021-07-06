import React, { useState } from "react";
import {
  Form,
  Button,
  Icon,
  Row,
  Col,
  Input,
  InputNumber,
  notification,
} from "antd";
import { createProductApi } from "../../../../api/product";

import "./CreateProductForm.scss";

export default function CreateProductForm(props) {
  const { setReloadProducts, setIsVisible } = props;
  const [data, setData] = useState({
    name: "",
    description: "",
    stock: 0,
  });
  const createProduct = async (e) => {
    e.preventDefault();

    const { name, description, stock } = data;

    if (!name || !description || !stock) {
      notification["error"]({
        message: "Todos los campos son obligatorios",
      });
    } else {
      await createProductApi(data).then((response) => {
        if (!response.ok) {
          notification["error"]({
            message: response.message,
          });
        } else {
          notification["success"]({
            message: "El producto fue creado correctamente",
          });
          setReloadProducts(true);
          setIsVisible(false);
          resetForm();
        }
      });
    }
  };

  const resetForm = () => {
    setData({
      name: "",
      description: "",
      stock: 0,
    });
  };

  return (
    <div className="create-product-form">
      <Form className="form" onSubmit={createProduct}>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item>
              <Input
                prefix={<Icon type="user" />}
                placeholder="Ingrese Nombre del Producto"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item>
              <Input
                prefix={<Icon type="user" />}
                placeholder="Ingrese Descripcion del Producto"
                value={data.description}
                onChange={(e) =>
                  setData({ ...data, description: e.target.value })
                }
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item>
              <InputNumber
                min={0}
                max={2000}
                value={data.stock}
                onChange={(value) => setData({ ...data, stock: value })}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button color="primary" htmlType="submit">
            Crear nuevo producto
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
