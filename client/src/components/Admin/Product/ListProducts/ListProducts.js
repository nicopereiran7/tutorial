import React, { useState, useEffect } from "react";
import {
  List,
  Avatar,
  Button,
  Icon,
  Modal as ModalAntd,
  notification,
} from "antd";
import { getProductsApi, deleteProductApi } from "../../../../api/product";
import EditProductForm from "../EditProductForm";
import CreateProductForm from "../CreateProductForm";
import Modal from "../../../Modal";

import "./ListProducts.scss";

export default function ListProducts() {
  const [products, setProducts] = useState([]);
  const [reloadProducts, setReloadProducts] = useState(false);
  //estados del modal
  const [isVisible, setIsVisible] = useState(false);
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);

  const { confirm } = ModalAntd;

  useEffect(() => {
    async function fechData() {
      await getProductsApi().then((response) => {
        setProducts(response.products);
      });
    }
    fechData();
    setReloadProducts(false);
  }, [reloadProducts]);

  const editProduct = (product) => {
    setTitle(`Editar ${product.name}`);
    setContent(
      <EditProductForm
        product={product}
        setIsVisible={setIsVisible}
        setReloadProducts={setReloadProducts}
      />
    );
    setIsVisible(true);
  };

  const createProduct = () => {
    setTitle("Crear Nuevo Producto");
    setContent(
      <CreateProductForm
        setIsVisible={setIsVisible}
        setReloadProducts={setReloadProducts}
      />
    );
    setIsVisible(true);
  };

  const deleteProduct = (product) => {
    confirm({
      title: "Eliminando Usuario",
      content: `¿Estas seguro que deseas eliminar ${product.name}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteProductApi(product._id)
          .then((response) => {
            notification["success"]({
              message: response.result,
            });
            setReloadProducts(true);
          })
          .catch((err) => {
            notification["error"]({
              message: err.message,
            });
          });
      },
    });
  };

  return (
    <div className="list-products">
      <div className="list-products__header">
        <h1>Lista de Productos</h1>
        <Button color="primary" onClick={createProduct}>
          Agregar Nuevo Producto
        </Button>
      </div>
      <div className="list-products__content">
        <List
          className="products"
          itemLayout="horizontal"
          dataSource={products}
          renderItem={(product) => (
            <List.Item
              actions={[
                <Button onClick={() => editProduct(product)}>
                  <Icon type="edit" />
                </Button>,
                <Button onClick={() => deleteProduct(product)}>
                  <Icon type="delete" />
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar type="user" />}
                title={product.name}
                description={`${product.description} Stock: ${product.stock}`}
              />
            </List.Item>
          )}
        />
      </div>
      <Modal title={title} isVisible={isVisible} setIsVisible={setIsVisible}>
        {content}
      </Modal>
    </div>
  );
}
