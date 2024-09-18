import { Request, Response } from "express";  

export const redirectionHandler = (req: Request, res: Response) => {  
    const fullUrl = `https://localhost:5500${req.originalUrl}`; // Redirigir a la misma ruta en HTTPS
    res.redirect(302, fullUrl);  
};  

export const defaultHandler = (req: Request, res: Response) => {  
    const name = req.params.name; // Obtiene el parámetro de ruta 
    const greeting = name ? `Hello, ${name}!` : "Hello, stranger!";  
    const port = req.socket.localPort;
    const protocol = req.protocol;
    const fullGreeting = `${greeting} 
    You are connected via: ${protocol} on port: ${port}.`;
    
    res.status(200).send(fullGreeting); 

};

// Función de controlador para manejar solicitudes no encontradas
export const notFoundHandler = (req: Request, resp: Response) => {
    resp.sendStatus(404); // Envía un código de estado 404 (Not Found)
};
