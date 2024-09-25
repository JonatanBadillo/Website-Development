"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readHandler = void 0;
const stream_1 = require("stream");
// Handler para procesar la solicitud POST
const readHandler = async (req, resp) => {
    req.pipe(createLowerTransform()).pipe(resp); // Se utiliza un transformador para modificar los datos
};
exports.readHandler = readHandler;
// Transformador para convertir el contenido de la solicitud a minúsculas
const createLowerTransform = () => new stream_1.Transform({
    transform(data, encoding, callback) {
        callback(null, data.toString().toLowerCase()); // Convierte los datos a minúsculas
    }
});
