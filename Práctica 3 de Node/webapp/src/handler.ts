import { Request, Response } from "express";  

export const redirectionHandler = (req: Request, res: Response) => {  
    const fullUrl = `https://localhost:5500${req.originalUrl}`; // Redirigir a la misma ruta en HTTPS
    res.redirect(302, fullUrl);  
};  

export const defaultHandler = (req: Request, res: Response) => {  
    const name = req.params.name; // Obtiene el parámetro de ruta si existe  
    const greeting = name ? `Hello, ${name}!` : "Hello, stranger!";  
    
    res.status(200).send(greeting);  
};
