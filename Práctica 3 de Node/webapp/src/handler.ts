import { Request, Response } from "express";  

export const redirectionHandler = (req: Request, res: Response) => {  
    res.redirect(302, "https://localhost:5500");  
}  

export const greetHandler = (req: Request, res: Response) => {  
    const name = req.params.name; // Obtiene el parámetro de ruta  
    const greeting = name ? `Hello, ${name}!` : "Hello, stranger!";  
    
    res.status(200).send(greeting);  
}