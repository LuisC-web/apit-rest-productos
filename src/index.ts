import { magenta } from "./../node_modules/colors/index.d";
import colors from "colors";
import server from "./server";
const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(
    colors.magenta(`Servidor escuchando en ${process.env.FRONTEND_URL}`)
  );
});
