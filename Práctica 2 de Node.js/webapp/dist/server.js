"use strict";
// // crea un servidor HTTP y escucha en el puerto especificado.
// import { handler } from "./handler"; // se importa manejador de solicitudes
// import { createServer } from "http"; // se importa la funcion para crear servidor
Object.defineProperty(exports, "__esModule", { value: true });
// // puerto en el que se va a ejecutar el servidor
// const port = 5000;
// // crear el servidor HTTP, con el manejador importado para crear servidor http
// const server = createServer(handler);
// // inicia el servidor : escuchando en el puerto especificado y muestre mensaje en consola
// server.listen(port, function(){
//     console.log(`Servidor escuchando en el puerto ${port}`);
// });
const http_1 = require("http");
const handler_1 = require("./handler");
const port = 5000;
const server = (0, http_1.createServer)();
server.on("request", handler_1.handler);
server.listen(port);
server.on("listening", () => {
    console.log(`(Event) Server listening on port ${port}`);
});
