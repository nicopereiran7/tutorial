import Product from "../models/Product.js";

export const createProduct = (req, res) => {
    const { name, description, stock, category } = req.body;
    const product = new Product();
    product.name = name;
    product.description = description;
    product.stock = stock;
    product.category = category;

    if(!name || !description || !stock || !category) {
        res.status(404).send({ message: "Todos los campos son obligatorios" })
    }else {
        Product.findOne({ name: name }, (err, result) => {
            if(err) {
                res.status(500).send({ message: "Error en el Servidor" });
            }else {
                if(result) {
                    res.status(404).send({ message: `El producto ${name} ya existe` });
                }else {
                    product.save((err, productStored) => {
                        if(err) {
                            res.status(500).send({ message: "Error en el Servidor" });
                        }else {
                            if(!productStored) {
                                res.status(404).send({ message: "Error al crear Producto" });
                            }else {
                                res.status(200).send({ productStored });
                            }
                        }
                    })
                }
            }
        })
    }
}

export const getProducts = (req, res) =>{
    Product.find({}, null, { sort: { createdAt: -1 } }, (err, products) => {
        if(err) {
            res.status(500).send({ message: "Error en el Servidor" });
        }else {
            if(products.length < 1) {
                res.status(404).send({ message: "No hay productos registrados" });
            }else {
                res.status(200).send({ products });
            }
        }
    })
}

export const updateProduct = (req, res) => {
    const productData = req.body;
    const params = req.params;

    Product.findByIdAndUpdate({ _id: params.id }, productData, (err, productUpdate) => {
        if(err) {
            res.status(500).send({ message: "Error en el Servidor" });
        }else {
            if(!productUpdate) {
                res.status(404).send({ message: "El producto no se encuentra" });
            }else {
                res.status(200).send({ message: "Producto Actualizado Correctamente" });
            }
        }
    })
}

export const deleteProduct = (req, res) => {
    const { id } = req.params;

    Product.findByIdAndRemove(id, (err, productDelete) => {
        if(err) {
            res.status(500).send({ message: "Error en el Servidor" });
        }else {
            if(!productDelete) {
                res.status(404).send({ message: "Error al eliminar Producto" });
            }else{
                res.status(200).send({ message: "El producto fue eliminado Correctamente" });
            }
        }
    })
}