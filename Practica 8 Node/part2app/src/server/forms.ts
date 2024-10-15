import { Express } from "express";
import express from 'express';

// permite el middleware y utiliza los datos que produce en la respuesta.
// Los nombres y valores de los elementos de forma individuales se mostrarán en la respuesta, en lugar de la cadena codificada por URL
export const registerFormMiddleware = (app: Express) => {
    app.use(express.urlencoded({extended: true}))
}

//  Manejo de solicitudes GET 
export const registerFormRoutes = (app: Express) => {
    app.get("/form", (req, resp)=>{
        for(const key in req.query){
            resp.write(`${key}: ${req.query[key]}\n`)
        }
        resp.end();
    });

    app.post("/form",(req,resp)=>{
        resp.write(`Content-Type: ${req.headers["content-type"]}\n`)
        for(const key in req.body){
            resp.write(`${key}: ${req.body[key]} \n`);
        }
        resp.end();
    });
}