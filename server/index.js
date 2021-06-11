import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

// IMPORTANDO RUTAS
import ActionRoutes from "./routes/action.js";
import CategoryRoutes from "./routes/category.js";
import ProductRoutes from "./routes/product.js";
import UserRoutes from "./routes/user.js";

// CONSTANTES
const app = express();
const PORT_DB = 27017;
const PORT_SERVER = 3001;
const CONNECTION_DB = `mongodb://localhost:${PORT_DB}/tutorial`;

// CONFIGURACIONES
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// CONEXION A MONGODB
mongoose
  .connect(CONNECTION_DB, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT_SERVER, () => {
      console.log(
        `CONECTADO A MONGODB | Server http://localhost:${PORT_SERVER}/api`
      );
    })
  )
  .catch((err) => console.log(err));

// RUTAS DEL API
app.use("/api/action", ActionRoutes);
app.use("/api/category", CategoryRoutes);
app.use("/api/product", ProductRoutes);
app.use("/api/user", UserRoutes);
