import express from "express";
import db from "./config/db";
import colors from "colors";
import products from "./routes/products";
import swaggerUi from "swagger-ui-express";
import swaggerSpecs from "./config/swagger";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
import { log } from "console";
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
    console.log(origin);

    if (origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(new Error("Error de CROS"));
    }
  },
};
server.use(cors(corsOptions));
server.use(express.json());
server.use(morgan("dev"));
server.use("/api/products", products);
server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
server.get("/api", (req, res) => {
  res.json({ msg: "Desde api" });
});
export default server;
