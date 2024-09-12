// Importamos la clase Worker de worker_threads
import { Worker } from "worker_threads";
// Definimos la función Count que realiza el conteo de forma concurrente
export const Count = (request: number, iterations: number, total: number): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        // Creamos una instancia de Worker y le pasamos los datos necesarios
        const worker = new Worker(__dirname + "/count_worker.js", {
            workerData: {
                iterations,
                total,
                request
            }
        });

        // Escuchamos el evento "message" para recibir los resultados de cada iteración
        worker.on("message", (iter) => {
            const msg = `Request: ${request}, Iteration: ${(iter)}`;
            console.log(msg);
        });

        // Escuchamos el evento "exit" para manejar la finalización del Worker
        worker.on("exit", (code) => {
            if (code !== 0) {
                reject();
            } else {
                resolve();
            }
        });

        // Escuchamos el evento "error" para manejar cualquier error ocurrido en el Worker
        worker.on("error", reject);
    });
}