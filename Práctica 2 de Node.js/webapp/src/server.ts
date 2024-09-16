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

// import { createServer } from "http";
// import { handler } from "./handler";

// // Define el puerto en el que se va a ejecutar el servidor
// const port = 5000;

// // Crea el servidor HTTP
// const server = createServer();

// // Maneja las solicitudes entrantes
// server.on("request", (req, res) => {
//     // Verifica si la solicitud es para el archivo favicon.ico
//     if (req.url?.endsWith("favicon.ico")) {
//         // Si es así, responde con un código de estado 404 y finaliza la respuesta
//         res.statusCode = 404;
//         res.end();
//     } else {
//         // Si no es para el archivo favicon.ico, pasa la solicitud al manejador
//         handler(req, res);
//     }
// });

// // Inicia el servidor y lo pone a escuchar en el puerto especificado
// server.listen(port);

// // Muestra un mensaje en la consola cuando el servidor comienza a escuchar
// server.on("listening", () => {
//     console.log(`(Event) Server listening on port ${port}`);
// });

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import { createServer } from "http";
// import { handler } from "./handler";
// const port = 5000;
// const server = createServer();
// server.on("request", handler);
// server.listen(port);
// server.on("listening", () => {
// console.log(`(Event) Server listening on port ${port}`);
// });

// import { createServer } from "http";
// import { handler } from "./handler";
// // Define el puerto en el que se va a ejecutar el servidor
// const port = 5000;
// // Crea el servidor HTTP
// const server = createServer(handler);

// //server.on("request", handler);

// // Inicia el servidor y lo pone a escuchar en el puerto especificado
// server.listen(port, () => console.log(`(Event) Server listening on port: ${port}`));

// //server.on("listening", () => {
// // console.log(`(Event) Server listening on port ${port}`);
// //});

// Manejo de solicitudes HTTPS en el archivo server.ts en la carpeta src.
import { createServer } from "http";
import { handler } from "./handler";
import { createServer as createHttpsServer } from "https";
import { readFileSync } from "fs";
// Define el puerto en el que se va a ejecutar el servidor HTTP
const port = 5000;
// Define el puerto en el que se va a ejecutar el servidor HTTPS
const https_port = 5500;

// Crea el servidor HTTP y asigna el manejador de solicitudes
const server = createServer(handler);
server.listen(port, () =>
    console.log(`(Event) Server listening on port ${port}`)
);

// Configuración para el servidor HTTPS
const httpsConfig = {
    key: readFileSync("key.pem"), // Lee el archivo de clave privada
    cert: readFileSync("cert.pem"), // Lee el archivo de certificado
};

// Crea el servidor HTTPS y asigna el manejador de solicitudes y la configuración
const httpsServer = createHttpsServer(httpsConfig, handler);
httpsServer.listen(https_port, () =>
    console.log(`HTTPS Server listening on port ${https_port}`)
);
