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



// // Conducción de datos al archivo readHandler.ts en la carpeta src.
// // El método pipe se utiliza para conectar un flujo Readable a un flujo Writeable, lo que
// // garantiza que todos los datos se lean del Readable y se escriban en el Writable sin más
// // intervención,

// import { IncomingMessage, ServerResponse } from "http";

// // Exportamos la función readHandler que manejará la conducción de datos
// export const readHandler = async (req: IncomingMessage, resp: ServerResponse) => {
//     req.pipe(resp); // Utilizamos el método pipe para conducir los datos de la solicitud al flujo de respuesta
// }




// // Transformación de datos
// // La clase Transform se utiliza para crear objetos, conocidos como transformadores, que
// // reciben datos de un flujo de lectura, los procesan de alguna manera y luego los pasan. Los
// // transformadores se aplican a los flujos con el método de canalización, como se muestra en el
// // Creación de un transformador en el archivo readHandler.ts en la carpeta src.
// import { IncomingMessage, ServerResponse } from "http";
// import { Transform } from "stream";
// // Exportamos la función readHandler que manejará la conducción de datos
// export const readHandler = async (req: IncomingMessage, resp: ServerResponse) => {
//     // Utilizamos el método pipe para conducir los datos de la solicitud al flujo de respuesta
//     req.pipe(createLowerTransform()).pipe(resp);
// }

// // Creamos un transformador que convierte los datos a minúsculas
// const createLowerTransform = () => new Transform({
//     // La función transform recibe los datos, la codificación y una función de devolución de llamada
//     transform(data, encoding, callback) {
//         // Convertimos los datos a minúsculas y los pasamos a través de la función de devolución de llamada
//         callback(null, data.toString().toLowerCase());
//     }
// });




// // Análisis de JSON en el archivo readHandler.ts en la carpeta src.
// import { IncomingMessage, ServerResponse } from "http";
// import { Transform } from "stream";


// // Definimos la función readHandler que manejará la lectura de datos
// export const readHandler = async (req: IncomingMessage, resp: ServerResponse) => {
//     // Verificamos si el tipo de contenido es JSON
//     if (req.headers["content-type"] == "application/json") {
//         // Conducimos los datos de la solicitud a través de un transformador que analiza el JSON
//         req.pipe(createFromJsonTransform()).on("data", (payload) => {
//             // Verificamos si el payload es un array
//             if (payload instanceof Array) {
//                 resp.write(`Recibido un array con ${payload.length} elementos`);
//             } else {
//                 resp.write("No se recibió un array");
//             }
//             resp.end(); // Finalizamos la respuesta
//         });
//     } else {
//         // Si el tipo de contenido no es JSON, simplemente conducimos los datos de la solicitud a la respuesta
//         req.pipe(resp);
//     }
// }

// // Creamos un transformador que convierte los datos JSON en objetos JavaScript
// const createFromJsonTransform = () => new Transform({
//     readableObjectMode: true,
//     transform(data, encoding, callback) {
//         // Analizamos los datos JSON y los pasamos a través de la función de devolución de llamada
//         callback(null, JSON.parse(data));
//     }
// });


// import { IncomingMessage, ServerResponse } from "http";
// //import { Transform } from "stream";
// import { Request, Response } from "express";



// // Definimos la función readHandler que manejará la lectura de datos
// export const readHandler = async (req: Request, resp: Response) => {
//     // Verificamos si el tipo de contenido es JSON
//     if (req.headers["content-type"] == "application/json") {
//         const payload = req.body;
//         // Verificamos si el payload es un array
//         if (payload instanceof Array) {
//             //resp.write(`Received an array with ${payload.length} items`)
//             resp.json({ arraySize: payload.length });
//         } else {
//             resp.write("Did not receive an array");
//         }
//         resp.end();
//     } else {
//         req.pipe(resp);
//     }
// }
// //const createFromJsonTransform = () => new Transform({
// // readableObjectMode: true,
// // transform(data, encoding, callback) {
// // callback(null, JSON.parse(data));
// // }
// //});



/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////



import { Request, Response } from "express";
export const readHandler = (req: Request, resp: Response) => {
resp.json({
message: "Hello, World"
});
}

