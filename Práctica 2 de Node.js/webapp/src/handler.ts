
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


import { IncomingMessage, ServerResponse } from "http";
import { readFile } from "fs/promises";
// Definición de la función handler
export const handler = (req: IncomingMessage, res: ServerResponse) => {
    // Lee el archivo "data.json" usando fs/promises
    const p: Promise<Buffer> = readFile("data.json");

    // Maneja la promesa para enviar los datos del archivo como respuesta
    p.then((data: Buffer) => res.end(data, () => console.log("Archivo enviado")));

    // Maneja el error en caso de que ocurra
    p.catch((err: Error) => {
        console.log(`Error: ${err.message}`);
        res.statusCode = 500;
        res.end();
    });
};
