"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerFormRoutes = exports.registerFormMiddleware = void 0;
const express_1 = __importDefault(require("express"));
// permite el middleware y utiliza los datos que produce en la respuesta.
// Los nombres y valores de los elementos de forma individuales se mostrarán en la respuesta, en lugar de la cadena codificada por URL
const registerFormMiddleware = (app) => {
    app.use(express_1.default.urlencoded({ extended: true }));
};
exports.registerFormMiddleware = registerFormMiddleware;
//  Manejo de solicitudes GET 
const registerFormRoutes = (app) => {
    app.get("/form", (req, resp) => {
        for (const key in req.query) {
            resp.write(`${key}: ${req.query[key]}\n`);
        }
        resp.end();
    });
    app.post("/form", (req, resp) => {
        resp.write(`Content-Type: ${req.headers["content-type"]}\n`);
        for (const key in req.body) {
            resp.write(`${key}: ${req.body[key]} \n`);
        }
        resp.end();
    });
};
exports.registerFormRoutes = registerFormRoutes;
