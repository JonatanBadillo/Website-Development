// import { IncomingMessage, ServerResponse } from "http";
// export const readHandler = (req: IncomingMessage, resp: ServerResponse) => {
// // TODO - read request body
// resp.end();
// }

// // Lectura de datos en el archivo readHandler.ts en la carpeta src.
// import { IncomingMessage, ServerResponse } from "http";

// // Exportamos la función readHandler que manejará la lectura de datos
// export const readHandler = (req: IncomingMessage, resp: ServerResponse) => {
//     // Establecemos la codificación de la solicitud como "utf-8"
//     req.setEncoding("utf-8");

//     // Escuchamos el evento "data" para leer los datos de la solicitud
//     req.on("data", (data: string) => {
//         console.log(data); // Imprimimos los datos en la consola
//     });

//     // Escuchamos el evento "end" para indicar que se han leído todos los datos
//     req.on("end", () => {
//         console.log("End: all data read"); // Imprimimos un mensaje indicando que se han leído todos los datos
//         resp.end(); // Finalizamos la respuesta
//     });
// };


// // Lectura de datos en un bucle en el archivo readHandler.ts en la carpeta src.
// import { IncomingMessage, ServerResponse } from "http";
// // Definimos la función readHandler como una función asíncrona que manejará la lectura de datos
// export const readHandler = async (
//     req: IncomingMessage,
//     resp: ServerResponse
// ) => {
//     // Establecemos la codificación de la solicitud como "utf-8"
//     req.setEncoding("utf-8");

//     // Iteramos de forma asíncrona sobre los datos de la solicitud
//     for await (const data of req) {
//         console.log(data); // Imprimimos los datos en la consola
//     }

//     console.log("End: all data read"); // Imprimimos un mensaje indicando que se han leído todos los datos

//     resp.end(); // Finalizamos la respuesta
// };



// Conducción de datos al archivo readHandler.ts en la carpeta src.
// El método pipe se utiliza para conectar un flujo Readable a un flujo Writeable, lo que
// garantiza que todos los datos se lean del Readable y se escriban en el Writable sin más
// intervención,

import { IncomingMessage, ServerResponse } from "http";

// Exportamos la función readHandler que manejará la conducción de datos
export const readHandler = async (req: IncomingMessage, resp: ServerResponse) => {
    req.pipe(resp); // Utilizamos el método pipe para conducir los datos de la solicitud al flujo de respuesta
}