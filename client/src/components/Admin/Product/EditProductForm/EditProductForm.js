import React, { useState } from "react";
import {
  Form,
  Row,
  Col,
  Input,
  InputNumber,
  Icon,
  Button,
  notification,
} from "antd";
import { updateProductApi } from "../../../../api/product";

import "./EditProductForm.scss";

export default function EditProductForm(props) {
  const { product, setIsVisible, setReloadProducts } = props;

  const [productData, setProductData] = useState({
    name: product.name,
    description: product.description,
    stock: product.stock,
  });

  const updateProduct = async (e) => {
    e.preventDefault();

    if (!productData.name || !productData.description || !productData.stock) {
      notification["error"]({
        message: "Todos los campos son obligatorios",
      });
    } else {
      await updateProductApi(product._id, productData).then((response) => {
        if (!response.ok) {
          notification["error"]({
            message: response.message,
          });
        } else {
          setReloadProducts(true);
          notification["success"]({
            message: response.result.message,
          });
          setIsVisible(false);
        }
      });
    }
  };

  return (
    <div className="edit-product-form">
      <Form className="form" onSubmit={updateProduct}>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item>
              <Input
                prefix={<Icon type="user" />}
                placeholder="Nombre del Producto"
                defaultValue={productData.name}
                onChange={(e) =>
                  setProductData({ ...productData, name: e.target.value })
                }
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item>
              <Input
                prefix={<Icon type="user" />}
                placeholder="Descripcion del Producto"
                defaultValue={productData.description}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    description: e.target.value,
                  })
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
                defaultValue={productData.stock}
                onChange={(value) =>
                  setProductData({ ...productData, stock: value })
                }
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="btn-submit">
            Actualizar Producto
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
