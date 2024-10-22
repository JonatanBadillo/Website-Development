"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerFormRoutes = exports.registerFormMiddleware = void 0;
const express_1 = __importDefault(require("express"));
// Middleware para registrar el manejo de formularios
const registerFormMiddleware = (app) => {
    // Configura la aplicación para que use urlencoded para analizar los cuerpos de las solicitudes
    app.use(express_1.default.urlencoded({ extended: true }));
};
exports.registerFormMiddleware = registerFormMiddleware;
// Rutas para manejar el formulario
const registerFormRoutes = (app) => {
    // Ruta GET para mostrar el formulario
    app.get("/form", (req, resp) => {
        // Renderiza la vista "age"
        resp.render("age");
    });
    // Ruta POST para procesar el formulario
    app.post("/form", (req, resp) => {
        // Calcula la edad futura sumando la edad actual y los años proporcionados
        const nextage = Number.parseInt(req.body.age) + Number.parseInt(req.body.years);
        // Crea un contexto con los datos del formulario y la edad futura
        const context = {
            ...req.body,
            nextage,
        };
        // Renderiza la vista "age" con el contexto actualizado
        resp.render("age", context);
    });
};
exports.registerFormRoutes = registerFormRoutes;
