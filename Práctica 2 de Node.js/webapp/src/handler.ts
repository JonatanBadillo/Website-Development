import { IncomingMessage, ServerResponse } from "http";

// Definición de la función handler
export const handler = (req: IncomingMessage, res: ServerResponse) => {
    // Envía la respuesta "Hello World"
    res.end("Hello World");
}