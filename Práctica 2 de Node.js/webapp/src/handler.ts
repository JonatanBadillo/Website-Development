// import { handler } from './handler';
// import { IncomingMessage, ServerResponse } from "http";

// // Definición de la función handler
// export const handler = (req: IncomingMessage, res: ServerResponse) => {
//     // Envía la respuesta "Hello World"
//     res.end("Hello World");
// }

// // Importa los módulos necesarios
// import { IncomingMessage, ServerResponse } from "http";
// import { readFile } from "fs";
// // Definición de la función handler
// export const handler = (req: IncomingMessage, res: ServerResponse) => {
//     // Lee el archivo "data.json"
//     readFile("data.json", (err: Error | null, data: Buffer) => {
//         if (err == null) {
//             // Envía los datos del archivo como respuesta
//             res.end(data, () => console.log("Archivo enviado"));
//         } else {
//             // En caso de error, muestra el mensaje de error y establece el código de estado 500
//             console.log(`Error: ${err.message}`);
//             res.statusCode = 500;
//             res.end();
//         }
//     });
// };


// import { IncomingMessage, ServerResponse } from "http";
// import { readFile } from "fs/promises";
// // Definición de la función handler
// export const handler = (req: IncomingMessage, res: ServerResponse) => {
//   // Lee el archivo "data.json" usando fs/promises
//   // promesa que producirá un objeto Buffer cuando se complete su operación asíncrona.
//   const p: Promise<Buffer> = readFile("data.json");

//   // Maneja la promesa para enviar los datos del archivo como respuesta
//   // El método then se utiliza para registrar la función que se invocará si se resuelve la promesa
//   p.then((data: Buffer) => res.end(data, () => console.log("Archivo enviado")));

//   // Maneja el error en caso de que ocurra
//   // Una promesa rechazada es aquella en la que se ha producido un error. El método catch se
//   // utiliza para registrar una función que maneja el error producido por una promesa rechazada
//   p.catch((err: Error) => {
//     console.log(`Error: ${err.message}`);
//     res.statusCode = 500;
//     res.end();
//   });
// };

// Importa los módulos necesarios
import { IncomingMessage, ServerResponse } from "http";
import { readFile } from "fs/promises";
// Definición de la función handler
export const handler = (req: IncomingMessage, res: ServerResponse) => {
    // Lee el archivo "data.json" usando fs/promises
    // promesa que producirá un objeto Buffer cuando se complete su operación asíncrona.
    const p: Promise<Buffer> = readFile("data.json");

    // Maneja la promesa para enviar los datos del archivo como respuesta
    // El método then se utiliza para registrar la función que se invocará si se resuelve la promesa
    p.then((data: Buffer) => res.end(data, () => console.log("Archivo enviado")));

    // Maneja el error en caso de que ocurra
    // Una promesa rechazada es aquella en la que se ha producido un error. El método catch se
    // utiliza para registrar una función que maneja el error producido por una promesa rechazada
    p.catch((err: Error) => {
        console.log(`Error: ${err.message}`);
        res.statusCode = 500;
        res.end();
    });
};