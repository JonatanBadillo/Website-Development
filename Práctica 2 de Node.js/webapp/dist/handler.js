"use strict";
// import { handler } from './handler';
// import { IncomingMessage, ServerResponse } from "http";
Object.defineProperty(exports, "__esModule", { value: true });
exports.basicHandler = void 0;
// Definición de la función handler
const basicHandler = (req, resp) => {
    resp.end("Hello, World");
};
exports.basicHandler = basicHandler;
