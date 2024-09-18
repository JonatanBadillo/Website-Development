import { Request, Response } from "express";  

export const redirectionHandler = (req: Request, res: Response) => {  
    const fullUrl = `https://localhost:5500${req.originalUrl}`; // Redirigir a la misma ruta en HTTPS
    res.redirect(302, fullUrl);  // Redirigir con un código de estado 302 (Found)
};  

export const defaultHandler = (req: Request, res: Response) => {  
    // Obtiene el parámetro de ruta "name" si se proporciona
    const name = req.params.name;
    
    // Construye el saludo en base a si proporcionaron un nombre o no
    const greeting = name ? `Hello, ${name}!` : "Hello, stranger!";
    
    // Obtiene el puerto y el protocolo de la solicitud
    const port = req.socket.localPort;
    const protocol = req.protocol;
    
    // Construye el saludo completo con información adicional
    const fullGreeting = `${greeting} 
    You are connected via: ${protocol} on port: ${port}.`;
    
    res.status(200).send(fullGreeting); // Enviar una respuesta con un código de estado 200 (OK)

};

// Función de controlador para manejar solicitudes no encontradas
export const notFoundHandler = (req: Request, resp: Response) => {
    resp.sendStatus(404); // Envía un código de estado 404 (Not Found)
};
