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

// // Importa los módulos necesarios
// import { IncomingMessage, ServerResponse } from "http";
// import { readFile } from "fs/promises";
// // Definición de la función handler
// export const handler = (req: IncomingMessage, res: ServerResponse) => {
//     // Lee el archivo "data.json" usando fs/promises
//     // promesa que producirá un objeto Buffer cuando se complete su operación asíncrona.
//     const p: Promise<Buffer> = readFile("data.json");

//     // Maneja la promesa para enviar los datos del archivo como respuesta
//     // El método then se utiliza para registrar la función que se invocará si se resuelve la promesa
//     p.then((data: Buffer) => res.end(data, () => console.log("Archivo enviado")));

//     // Maneja el error en caso de que ocurra
//     // Una promesa rechazada es aquella en la que se ha producido un error. El método catch se
//     // utiliza para registrar una función que maneja el error producido por una promesa rechazada
//     p.catch((err: Error) => {
//         console.log(`Error: ${err.message}`);
//         res.statusCode = 500;
//         res.end();
//     });
// };

// Uso de las palabras clave async y await en el archivo handler.ts en la carpeta src.
// import { IncomingMessage, ServerResponse } from "http";
// import { readFile } from "fs/promises";

// Definición de la función handler
// Las API de promesa y devolución de llamada se pueden mezclar sin problemas, pero el
// resultado puede ser un código extraño.
// export const handler = async (req: IncomingMessage, res: ServerResponse) => {
//     try {
//         // Lee el archivo "data.json" usando fs/promises
//         const data: Buffer = await readFile("data.json"); // devuelve una promesa, por lo que se usa await
//         // Envía los datos del archivo como respuesta
//         res.end(data, () => console.log("File sent")); // utiliza callback para mostrar mensaje en consola
//     } catch (err: any) {
//         // En caso de error, muestra el mensaje de error y establece el código de estado 500
//         console.log(`Error: ${err?.message ?? err}`);
//         res.statusCode = 500;
//         res.end();
//     }
// };


// Uso de una promesa
// Importa los módulos necesarios
// import { IncomingMessage, ServerResponse } from "http";
// import { readFile } from "fs/promises";
// import { endPromise } from "./promises";


// // Definición de la función handler
// export const handler = async (req: IncomingMessage, res: ServerResponse) => {
//     try {
//         // Lee el archivo "data.json" usando fs/promises
//         const data: Buffer = await readFile("data.json");
//         // Utiliza la función endPromise para enviar los datos del archivo como respuesta
//         await endPromise.bind(res)(data); // Tenemos que usar el método bind cuando usamos la palabra clave await en la función que promisify crea 
//         console.log("Archivo enviado");
//     } catch (err: any) {
//         // En caso de error, muestra el mensaje de error y establece el código de estado 500
//         console.log(`Error: ${err?.message ?? err}`);
//         res.statusCode = 500;
//         res.end();
//     }
// };

// Una operación de bloqueo en el archivo handler.ts 
import { IncomingMessage, ServerResponse } from "http";
//import { readFile } from "fs/promises";
import { endPromise, writePromise } from "./promises";
// Declaración de variables
const total = 2_000_000_000;
const iterations = 5;
let shared_counter = 0;

// Definición de la función handler
export const handler = async (req: IncomingMessage, res: ServerResponse) => {
    // Incrementa el contador compartido
    const request = shared_counter++;

    // Bucle externo para las iteraciones
    for (let iter = 0; iter < iterations; iter++) {
        // Bucle interno para contar hasta el total
        for (let count = 0; count < total; count++) {
            count++;
        }

        // Mensaje a imprimir en cada iteración
        const msg = `Request: ${request}, Iteration: ${(iter)}`;
        console.log(msg);

        // Escribir el mensaje en la respuesta
        await writePromise.bind(res)(msg + "\n");
    }

    // Finalizar la respuesta
    await endPromise.bind(res)("Done");
};