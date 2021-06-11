import Category from "../models/Category.js";

export const createCategory = (req, res) => {
    const { name  } = req.body;
    const category = new Category();
    category.name = name;

    if(!name) {
        res.status(404).send({ message: "Todos los campos son obligatorios" });
    }else {
        Category.findOne({ name: name }, (err, result) => {
            if(err) {
                res.status(500).send({ message: "Error en el Servidor" });
            }else {
                if(result) {
                    res.status(404).send({ message: `La categorua ${name} ya existe` });
                }else {
                    category.save((err, categoryStored) => {
                        if(err) {
                            res.status(500).send({ message: "Error en el Servidor" });
                        }else {
                            if(!categoryStored) {
                                res.status(404).send({ message: "Error al crear la Categoria" });
                            }else {
                                res.status(200).send({ categoryStored });
                            }
                        }
                    })
                }
            }
        })
    }

}

export const getCategories = (req, res) => {
    Category.find({}, (err, categories) => {
        if(err) {
            res.status(500).send({ message: "Error en el Servidor" });
        }else {
            if(!categories) {
                res.status(404).send({ message: "No hay categorias registradas" });
            }else {
                res.status(200).send({ categories });
            }
        }
    })
}