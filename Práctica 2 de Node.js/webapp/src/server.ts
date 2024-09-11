// // crea un servidor HTTP y escucha en el puerto especificado.
// import { handler } from "./handler"; // se importa manejador de solicitudes
// import { createServer } from "http"; // se importa la funcion para crear servidor

// // puerto en el que se va a ejecutar el servidor
// const port = 5000;

// // crear el servidor HTTP, con el manejador importado para crear servidor http
// const server = createServer(handler);

// // inicia el servidor : escuchando en el puerto especificado y muestre mensaje en consola
// server.listen(port, function(){
//     console.log(`Servidor escuchando en el puerto ${port}`);
// });

import { createServer } from "http";
import { handler } from "./handler";
const port = 5000;
const server = createServer();
server.on("request", handler);
server.listen(port);
server.on("listening", () => {
  console.log(`(Event) Server listening on port ${port}`);
});
