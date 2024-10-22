import express, { Express } from "express";

// Middleware para registrar el manejo de formularios
export const registerFormMiddleware = (app: Express) => {
  // Configura la aplicación para que use urlencoded para analizar los cuerpos de las solicitudes
  app.use(express.urlencoded({ extended: true }));
};

// Rutas para manejar el formulario
export const registerFormRoutes = (app: Express) => {
  // Ruta GET para mostrar el formulario
  app.get("/form", (req, resp) => {
    // Renderiza la vista "age"
    resp.render("age");
  });

  // Ruta POST para procesar el formulario
  app.post("/form", (req, resp) => {
    // Calcula la edad futura sumando la edad actual y los años proporcionados
    const nextage =
      Number.parseInt(req.body.age) + Number.parseInt(req.body.years);
    
    // Crea un contexto con los datos del formulario y la edad futura
    const context = {
      ...req.body,
      nextage,
    };

    // Renderiza la vista "age" con el contexto actualizado
    resp.render("age", context);
  });
};
