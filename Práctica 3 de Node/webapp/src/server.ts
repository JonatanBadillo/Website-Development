import express, { Express } from "express";  
import { createServer as createHttpsServer } from "https";  
import { readFileSync } from "fs";  
import { redirectionHandler, defaultHandler, notFoundHandler } from "./handler";  

const app: Express = express();  
const port = 5000;  
const https_port = 5500;  

// Manejo de redirección para HTTP  
app.get("*", redirectionHandler);  

// Configuración para el servidor HTTPS  
const httpsConfig = {  
    key: readFileSync("key.pem"),  
    cert: readFileSync("cert.pem")  
};  

// Crear servidor HTTPS utilizando Express
const httpsApp: Express = express();

// Manejar favicon antes de la ruta wildcard
httpsApp.get("/error", notFoundHandler);

// Manejar todas las rutas en el servidor HTTPS
httpsApp.get("/:name?", defaultHandler); // Maneja rutas con un parámetro opcional


const httpsServer = createHttpsServer(httpsConfig, httpsApp);  
httpsServer.listen(https_port, () => console.log(`HTTPS Server listening on port ${https_port}`));  

// Iniciar el servidor HTTP  
app.listen(port, () => console.log(`HTTP Server listening on port ${port}`));
