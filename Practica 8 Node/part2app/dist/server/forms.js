"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerFormRoutes = exports.registerFormMiddleware = void 0;
const express_1 = __importDefault(require("express"));
const data_1 = __importDefault(require("./data"));
const rowLimit = 10;
// Función para registrar el middleware de formularios
const registerFormMiddleware = (app) => {
    // Usa el middleware de express para parsear datos urlencoded
    app.use(express_1.default.urlencoded({ extended: true }));
};
exports.registerFormMiddleware = registerFormMiddleware;
// Función para registrar las rutas relacionadas con formularios
const registerFormRoutes = (app) => {
    // Ruta GET para renderizar el formulario
    app.get("/form", async (req, resp) => {
        // Renderiza la vista "age" con el historial de resultados
        resp.render("age", {
            history: await data_1.default.getAllResults(rowLimit),
        });
    });
    // Ruta POST para procesar el formulario
    app.post("/form", async (req, resp) => {
        // Calcula la próxima edad sumando la edad actual y los años ingresados
        const nextage = Number.parseInt(req.body.age) + Number.parseInt(req.body.years);
        // Crea el contexto para la vista con los datos del formulario y el historial de resultados por nombre
        const context = {
            ...req.body,
            nextage,
            history: await data_1.default.getResultsByName(req.body.name, rowLimit),
        };
        // Renderiza la vista "age" con el contexto actualizado
        resp.render("age", context);
    });
};
exports.registerFormRoutes = registerFormRoutes;
