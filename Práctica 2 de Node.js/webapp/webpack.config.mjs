// Este archivo de configuración básico le indica a webpack que procese el archivo client.js en
// la carpeta static y escriba el paquete que crea en un archivo llamado bundle.js en la carpeta
// dist/client. No hay suficiente JavaScript del lado del cliente en el proyecto de ejemplo como
// para que webpack tenga mucho que hacer, pero en un proyecto real, webpack seguirá todas
// las importaciones realizadas en el archivo JavaScript inicial e incorporará todo el código que
// la aplicación requiere en el paquete.
import path from "path";
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export default {
mode: "development",
entry: "./static/client.js",
output: {
path: path.resolve(__dirname, "dist/client"),
filename: "bundle.js"
}
}