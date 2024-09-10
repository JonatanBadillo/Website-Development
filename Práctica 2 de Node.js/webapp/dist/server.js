"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// crea un servidor HTTP y escucha en el puerto especificado.
const handler_1 = require("./handler"); // se importa manejador de solicitudes
const http_1 = require("http"); // se importa la funcion para crear servidor
// puerto en el que se va a ejecutar el servidor
const port = 5000;
// crear el servidor HTTP, con el manejador importado para crear servidor http
const server = (0, http_1.createServer)(handler_1.handler);
// inicia el servidor : escuchando en el puerto especificado y muestre mensaje en consola
server.listen(port, function () {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
