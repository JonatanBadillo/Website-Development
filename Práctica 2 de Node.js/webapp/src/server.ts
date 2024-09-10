// crea un servidor HTTP y escucha en el puerto especificado.
import { handler } from "./handler";
import { createServer } from "http";

// puerto en el que se va a ejecutar el servidor
const port = 5000;

// crear el servidor HTTP
const server = createServer(handler);

// escuchar en el puerto especificado
server.listen(port, function(){
    console.log(`Servidor escuchando en el puerto ${port}`);
});