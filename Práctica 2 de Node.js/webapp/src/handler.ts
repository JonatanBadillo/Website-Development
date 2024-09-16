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

// // Una operación de bloqueo en el archivo handler.ts
// import { IncomingMessage, ServerResponse } from "http";
// //import { readFile } from "fs/promises";
// import { endPromise, writePromise } from "./promises";
// // Declaración de variables
// const total = 2_000_000_000;
// const iterations = 5;
// let shared_counter = 0;

// // Definición de la función handler
// export const handler = async (req: IncomingMessage, res: ServerResponse) => {
//     // Incrementa el contador compartido
//     const request = shared_counter++;

//     // Bucle externo para las iteraciones
//     for (let iter = 0; iter < iterations; iter++) {
//         // Bucle interno para contar hasta el total
//         for (let count = 0; count < total; count++) {
//             count++;
//         }

//         // Mensaje a imprimir en cada iteración
//         const msg = `Request: ${request}, Iteration: ${(iter)}`;
//         console.log(msg);

//         // Escribir el mensaje en la respuesta , mientras se espera a que se complete la operación
//         await writePromise.bind(res)(msg + "\n");
//     }

//     // Finalizar la respuesta
//     await endPromise.bind(res)("Done");
// };

// // Uso de la función setImmediate en el archivo handler.ts en la carpeta src.
// import { IncomingMessage, ServerResponse } from "http";
// import { endPromise, writePromise } from "./promises";
// // Declaración de variables
// const total = 2_000_000_000;
// const iterations = 5;
// let shared_counter = 0;

// // Definición de la función handler
// export const handler = async (req: IncomingMessage, res: ServerResponse) => {
//     // Incrementa el contador compartido
//     const request = shared_counter++;

//     // Función recursiva para iterar
//     const iterate = async (iter: number = 0) => {
//         // Bucle interno para contar hasta el total
//         for (let count = 0; count < total; count++) {
//             count++;
//         }

//         // Mensaje a imprimir en cada iteración
//         const msg = `Request: ${request}, Iteration: ${(iter)}`;
//         console.log(msg);

//         // Escribir el mensaje en la respuesta, mientras se espera a que se complete la operación
//         await writePromise.bind(res)(msg + "\n");

//         // Verificar si es la última iteración
//         if (iter == iterations - 1) {
//             await endPromise.bind(res)("Done");
//         } else {
//             // Llamar a la función iterate de forma asíncrona en la siguiente iteración
//             setImmediate(() => iterate(++iter)); // setImmediate se utiliza para ejecutar una función después de que se haya completado la ejecución actual
//         }
//     };

//     // Llamar a la función iterate para iniciar las iteraciones
//     iterate();
// };

// // La diferencia importante con los ejemplos anteriores es que el trabajo para las solicitudes se
// // realiza en paralelo, en lugar de que todo el trabajo se realice en un solo hilo. Esto se logra al crear un nuevo subproceso de trabajo para cada solicitud.
// import { IncomingMessage, ServerResponse } from "http";
// import { endPromise, writePromise } from "./promises";
// import { Worker } from "worker_threads";
// const total = 2_000_000_000;
// const iterations = 5;
// let shared_counter = 0;

// // Definición de la función handler
// export const handler = async (req: IncomingMessage, res: ServerResponse) => {
//     const request = shared_counter++;

//     // Crear un nuevo worker para ejecutar el código en un hilo separado de trabajo
//     // se crean subprocesos de trabajo
//     const worker = new Worker(__dirname + "/count_worker.js", {
//         workerData: {
//             iterations,
//             total,
//             request
//         }
//     });

//     // Manejar el evento "message" del worker
//     worker.on("message", async (iter: number) => {
//         const msg = `Request: ${request}, Iteration: ${(iter)}`;
//         console.log(msg);
//         await writePromise.bind(res)(msg + "\n");
//     });

//     // Manejar el evento "exit" del worker
//     worker.on("exit", async (code: number) => {
//         if (code == 0) {
//             await endPromise.bind(res)("Done");
//         } else {
//             // En caso de error, establecer el código de estado 500 y finalizar la respuesta
//             res.statusCode = 500;
//             await res.end();
//         }
//     });

//     // Manejar el evento "error" del worker
//     worker.on("error", async (err) => {
//         console.log(err);
//         // En caso de error, establecer el código de estado 500 y finalizar la respuesta
//         res.statusCode = 500;
//         await res.end();
//     });
// };

// import { IncomingMessage, ServerResponse } from "http";
// import { endPromise, writePromise } from "./promises";
// //import { Worker } from "worker_threads";
// import { Count } from "./counter_cb";
// // Declaración de variables
// const total = 2_000_000_000;
// const iterations = 5;
// let shared_counter = 0;

// // Definición de la función handler
// export const handler = async (req: IncomingMessage, res: ServerResponse) => {
//     // Incrementa el contador compartido
//     const request = shared_counter++;

//     // Llama a la función Count para realizar el trabajo de las solicitudes
//     Count(request, iterations, total, async (err, update) => {
//         if (err !== null) {
//             // En caso de error, muestra el mensaje de error, establece el código de estado 500 y finaliza la respuesta
//             console.log(err);
//             res.statusCode = 500;
//             await res.end();
//         } else if (update !== true) {
//             // Si no hay error y no es la última iteración, muestra el mensaje en la consola y escribe el mensaje en la respuesta
//             const msg = `Request: ${request}, Iteration: ${(update)}`;
//             console.log(msg);
//             await writePromise.bind(res)(msg + "\n");
//         } else {
//             // Si no hay error y es la última iteración, finaliza la respuesta
//             await endPromise.bind(res)("Done");
//         }
//     });
// };

// // La diferencia importante con los ejemplos anteriores es que el trabajo para las solicitudes se
// // realiza en paralelo, en lugar de que todo el trabajo se realice en un solo hilo. Esto se logra al crear un nuevo subproceso de trabajo para cada solicitud.
// import { IncomingMessage, ServerResponse } from "http";
// import { endPromise, writePromise } from "./promises";
// //import { Count } from "./counter_cb";
// import { Count } from "./count_promise";
// //import { Count } from "./counter_cb";

// // Declaración de variables
// const total = 2_000_000_000;
// const iterations = 5;
// let shared_counter = 0;

// // Definición de la función handler
// export const handler = async (req: IncomingMessage, res: ServerResponse) => {
//     // Incrementa el contador compartido
//     const request = shared_counter++;

//     try {
//         // Llama a la función Count para realizar el trabajo de las solicitudes
//         await Count(request, iterations, total);

//         // Mensaje a imprimir en cada iteración
//         const msg = `Request: ${request}, Iterations: ${(iterations)}`;

//         // Escribe el mensaje en la respuesta
//         await writePromise.bind(res)(msg + "\n");

//         // Finaliza la respuesta
//         await endPromise.bind(res)("Done");
//     } catch (err: any) {
//         // En caso de error, muestra el mensaje de error, establece el código de estado 500 y finaliza la respuesta
//         console.log(err);
//         res.statusCode = 500;
//         res.end();
//     }
// };

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import { IncomingMessage, ServerResponse } from "http";
// export const handler = async (req: IncomingMessage, resp: ServerResponse) => {
//   resp.end("Hello, World");
// };

// El objeto de configuración se puede omitir si se requieren los valores predeterminados. La
// función de controlador (handler) se invoca cuando se ha recibido una solicitud HTTP y sus
// parámetros son objetos cuyos tipos son los especificados por las propiedades
// IncomingMessage y ServerResponse, o los tipos predeterminados si no se ha modificado la
// configuración.


// El código del listado 4 omite el objeto de configuración, lo que significa que se utilizarán los
// tipos predeterminados para representar la solicitud y la respuesta HTTP
import { IncomingMessage, ServerResponse } from "http";
export const handler = async (req: IncomingMessage, resp: ServerResponse) => {
    resp.end("Hello, World");
    };