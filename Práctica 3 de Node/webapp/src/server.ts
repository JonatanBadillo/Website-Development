import express, { Express } from "express";  
import { redirectionHandler, greetHandler } from "./handler";  
import { createServer as createHttpsServer } from "https";  
import { readFileSync } from "fs";  

const app: Express = express();  
const port = 5000;  
const https_port = 5500;  

// Manejo de redirección para HTTP  
app.get("*", redirectionHandler);  

// Crear servidor HTTPS  
const httpsConfig = {  
    key: readFileSync("key.pem"),  
    cert: readFileSync("cert.pem")  
};  

const httpsApp: Express = express();  
httpsApp.get("/greet/:name?", greetHandler); // Ruta con parámetro opcional  

const httpsServer = createHttpsServer(httpsConfig, httpsApp);  
httpsServer.listen(https_port, () => console.log(`HTTPS Server listening on port ${https_port}`));  

// Iniciar el servidor HTTP  
app.listen(port, () => console.log(`(Event) Server listening on port ${port}`));