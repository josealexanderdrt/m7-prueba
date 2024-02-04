import express from "express";
import cors from "cors";

import cafeRoutes from "./config/routes/cafeRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use(cafeRoutes);

app.listen(PORT, console.log(`¡Servidor encendido en el puerto! ${PORT}`));

app.use("*", (req, res) => {
  res.status(404).send({ message: "La ruta que intenta consultar no existe" });
});

export default app;
