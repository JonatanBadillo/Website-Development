import express, { Express } from "express";
import repository from "./data";
const rowLimit = 10;

// Función para registrar el middleware de formularios
export const registerFormMiddleware = (app: Express) => {
  // Usa el middleware de express para parsear datos urlencoded
  app.use(express.urlencoded({ extended: true }));
};

// Función para registrar las rutas relacionadas con formularios
export const registerFormRoutes = (app: Express) => {
  // Ruta GET para renderizar el formulario
  app.get("/form", async (req, resp) => {
    // Renderiza la vista "age" con el historial de resultados
    resp.render("age", {
      history: await repository.getAllResults(rowLimit),
    });
  });

  // Ruta POST para procesar el formulario
  app.post("/form", async (req, resp) => {
    // Calcula la próxima edad sumando la edad actual y los años ingresados
    const nextage =
      Number.parseInt(req.body.age) + Number.parseInt(req.body.years);
    // Crea el contexto para la vista con los datos del formulario y el historial de resultados por nombre
    const context = {
      ...req.body,
      nextage,
      history: await repository.getResultsByName(req.body.name, rowLimit),
    };
    // Renderiza la vista "age" con el contexto actualizado
    resp.render("age", context);
  });
};
