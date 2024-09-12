// Importamos la clase Worker de worker_threads
import { Worker } from "worker_threads";

// Definimos la función Count que realiza el conteo
export const Count = (
    request: number, // Valor de inicio del conteo
    iterations: number, // Número de iteraciones del conteo
    total: number, // Valor máximo del conteo
    callback: (err: Error | null, update: number | boolean) => void // Función de callback para manejar los resultados del conteo
) => {
    // Creamos una instancia de Worker y le pasamos el archivo count_worker.js como workerData
    const worker = new Worker(__dirname + "/count_worker.js", {
        workerData: {
            iterations,
            total,
            request,
        },
    });

    // Escuchamos el evento "message" para recibir actualizaciones del conteo
    worker.on("message", async (iter: number) => {
        callback(null, iter);
    });

    // Escuchamos el evento "exit" para manejar la finalización del conteo
    worker.on("exit", async (code: number) => {
        callback(code === 0 ? null : new Error(), true);
    });

    // Escuchamos el evento "error" para manejar errores en el conteo
    worker.on("error", async (err) => {
        callback(err, true);
    });
};
