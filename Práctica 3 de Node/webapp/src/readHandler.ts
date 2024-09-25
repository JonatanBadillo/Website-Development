import { IncomingMessage, ServerResponse } from "http";
import { Transform } from "stream";

// Handler para procesar la solicitud POST
export const readHandler = async (req: IncomingMessage, resp: ServerResponse) => {
    req.pipe(createLowerTransform()).pipe(resp); // Se utiliza un transformador para modificar los datos
};

// Transformador para convertir el contenido de la solicitud a minúsculas
const createLowerTransform = () => new Transform({
    transform(data, encoding, callback) {
        callback(null, data.toString().toLowerCase()); // Convierte los datos a minúsculas
    }
});
