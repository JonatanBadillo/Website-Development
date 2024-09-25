import { IncomingMessage, ServerResponse } from "http";
import { Transform } from "stream";

// Handler para procesar la solicitud POST y transformar el texto a minúsculas
export const readHandler = async (req: IncomingMessage, resp: ServerResponse) => {
    // Transforma el texto a minúsculas y lo envía en la respuesta
    req.pipe(createLowerTransform()).pipe(resp);
};

// Transformador que convierte el texto recibido a minúsculas
const createLowerTransform = () => new Transform({
    // Transforma los datos a minúsculas y los envía al siguiente paso en el flujo de datos
    transform(data, encoding, callback) {
        callback(null, data.toString().toLowerCase());
    }
});
