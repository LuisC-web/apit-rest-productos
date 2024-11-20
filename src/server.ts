import express from "express";
import cors, { CorsOptions } from "cors";
import colors from "colors";
import { db } from "./db"; // Asegúrate de importar correctamente tu conexión a la base de datos

async function dbConnection() {
  try {
    await db.authenticate();
    db.sync();
    console.log(colors.green.bold("Se ha conectado correctamente"));
  } catch (error) {
    console.error(error);
    console.error(
      colors.red.bold("Hubo un error en la conexión de la base de datos")
    );
  }
}
dbConnection();

const server = express();

const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(new Error("Error de CORS"));
    }
  },
};

server.use(cors(corsOptions));
server.use(express.json());

// Define tus rutas aquí
// server.use("/api/products", products);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
