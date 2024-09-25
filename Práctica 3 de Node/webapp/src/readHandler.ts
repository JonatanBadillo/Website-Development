import { IncomingMessage, ServerResponse } from "http";
import { Transform } from "stream";

// Handler para procesar la solicitud POST y transformar el texto a minúsculas
export const readHandler = async (req: IncomingMessage, resp: ServerResponse) => {
    req.pipe(createLowerTransform()).pipe(resp);
};

// Transformador que convierte el texto recibido a minúsculas
const createLowerTransform = () => new Transform({
    transform(data, encoding, callback) {
        callback(null, data.toString().toLowerCase());
    }
});
