import bcrypt from "bcrypt-nodejs";
import User from "../models/User.js";
import { createAccessToken, createRefreshToken } from "../services/jwt.js";

export const signUp = (req, res) => {
  const user = new User();
  const { name, lastname, email, password, repeatPassword } = req.body;

  user.name = name;
  user.lastname = lastname;
  user.email = email;

  if (!name || !lastname || !email || !password || !repeatPassword) {
    res.status(404).send({ message: "Todos los campos son obligatorios" });
  } else {
    if (password !== repeatPassword) {
      res.status(404).send({ message: "Las contraseñas no son iguales" });
    } else {
      bcrypt.hash(password, null, null, (err, hash) => {
        if (err) {
          res.status(500).send({ message: "Error al encriptar la contraseña" });
        } else {
          user.password = hash;

          user.save((err, userStored) => {
            if (err) {
              res
                .status(500)
                .send({ message: "El usuario ya esta registrado" });
            } else {
              if (!userStored) {
                res.status(404).send({ message: "Error al crear Usuario" });
              } else {
                res.status(200).send({
                  user: userStored,
                  message: "El usuario fue creado Correctamente",
                });
              }
            }
          });
        }
      });
    }
  }
};

export const signIn = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email }, (err, userStored) => {
    if (err) {
      res.status(500).send({ message: "Error en el Servidor" });
    } else {
      if (!userStored) {
        res.status(404).send({ message: "Usuario no encontrado" });
      } else {
        bcrypt.compare(password, userStored.password, (err, check) => {
          if (err) {
            res.status(500).send({ message: "Error en el Servidor" });
          } else {
            if (!check) {
              res
                .status(404)
                .send({ message: "El usuario o contraseña incorrecto" });
            } else {
              res.status(200).send({
                message: "Usuario Logeado",
              });
            }
          }
        });
      }
    }
  });
};
