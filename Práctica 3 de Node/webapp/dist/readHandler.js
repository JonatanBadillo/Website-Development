"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readHandler = void 0;
const stream_1 = require("stream");
// Handler para procesar la solicitud POST y transformar el texto a minúsculas
const readHandler = async (req, resp) => {
    req.pipe(createLowerTransform()).pipe(resp);
};
exports.readHandler = readHandler;
// Transformador que convierte el texto recibido a minúsculas
const createLowerTransform = () => new stream_1.Transform({
    transform(data, encoding, callback) {
        callback(null, data.toString().toLowerCase());
    }
});
