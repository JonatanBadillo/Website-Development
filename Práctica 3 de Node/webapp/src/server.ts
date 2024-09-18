// server.ts
import express, { Express } from "express";  
import { createServer as createHttpsServer } from "https";  
import { readFileSync } from "fs";  
import { redirectionHandler, defaultHandler, notFoundHandler, faviconHandler } from "./handler";  

const app: Express = express();  
const port = 5000;  
const https_port = 5500;  

// Manejo de redirección para HTTP  
app.get("*", redirectionHandler);  // Redirigir todas las solicitudes a HTTPS

// Configuración para el servidor HTTPS  
const httpsConfig = {  
    key: readFileSync("key.pem"),  
    cert: readFileSync("cert.pem")  
};  

// Crear servidor HTTPS utilizando Express
const httpsApp: Express = express();

// Manejar el favicon para evitar que se pase a defaultHandler
httpsApp.get("/favicon.ico", faviconHandler); // 204 No Content para favicon

httpsApp.get("/error", notFoundHandler);
// Manejar todas las rutas en el servidor HTTPS
httpsApp.get("/:name?", defaultHandler); // Maneja rutas con un parámetro opcional

// Iniciar el servidor HTTP  
app.listen(port, () => console.log(`HTTP Server listening on port ${port}`))

// Iniciar el servidor HTTPS
const httpsServer = createHttpsServer(httpsConfig, httpsApp);  
httpsServer.listen(https_port, () => console.log(`HTTPS Server listening on port ${https_port}`));  
