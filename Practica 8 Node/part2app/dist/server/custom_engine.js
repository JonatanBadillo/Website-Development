"use strict";
// import { readFile } from "fs";
// import { Express } from "express";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCustomTemplateEngine = void 0;
// // Función para renderizar una plantilla
// const renderTemplate = (
//   path: string, // Ruta del archivo de plantilla
//   context: any, // Contexto con datos para la plantilla
//   callback: (err: any, response: string | undefined) => void // Callback para manejar el resultado
// ) => {
//   // Leer el archivo de plantilla
//   readFile(path, (err, data) => {
//     if (err != undefined) {
//       // Si hay un error al leer el archivo, llamar al callback con un mensaje de error
//       callback("Cannot generate content", undefined);
//     } else {
//       // Si se lee el archivo correctamente, procesar la plantilla y llamar al callback con el resultado
//       callback(undefined, parseTemplate(data.toString(), context));
//     }
//   });
// };
// // Función para procesar la plantilla
// const parseTemplate = (template: string, context: any) => {
//   // Crear un contexto con las variables del contexto
//   const ctx = Object.keys(context)
//     .map((k) => `const ${k} = context.${k}`)
//     .join(";");
//   // Expresión regular para encontrar las variables en la plantilla
//   const expr = /{{(.*)}}/gm;
//   // Reemplazar las variables en la plantilla con los valores del contexto
//   return template.toString().replaceAll(expr, (match, group) => {
//     return eval(`${ctx};${group}`);
//   });
// };
// // Función para registrar el motor de plantillas personalizado en una aplicación de Express
// export const registerCustomTemplateEngine = (expressApp: Express) =>
//   expressApp.engine("custom", renderTemplate);
const fs_1 = require("fs");
const features = __importStar(require("./custom_features"));
// Función para renderizar una plantilla
const renderTemplate = (path, // Ruta del archivo de plantilla
context, // Contexto con datos para la plantilla
callback // Callback para manejar el resultado
) => {
    // Leer el archivo de plantilla
    (0, fs_1.readFile)(path, (err, data) => {
        if (err != undefined) {
            // Si hay un error al leer el archivo, llamar al callback con un mensaje de error
            callback("Cannot generate content", undefined);
        }
        else {
            // Si se lee el archivo correctamente, procesar la plantilla y llamar al callback con el resultado
            callback(undefined, parseTemplate(data.toString(), { ...context, features }));
        }
    });
};
// Función para procesar la plantilla
const parseTemplate = (template, context) => {
    // Crear un contexto con las variables del contexto
    const ctx = Object.keys(context)
        .map((k) => `const ${k} = context.${k}`)
        .join(";");
    // Expresión regular para encontrar las variables en la plantilla
    const expr = /{{(.*)}}/gm;
    // Reemplazar las variables en la plantilla con los valores del contexto
    return template.toString().replaceAll(expr, (match, group) => {
        const evalFunc = (expr) => {
            return eval(`${ctx};${expr}`);
        };
        try {
            // Si la variable en la plantilla comienza con "@", se asume que es una función de "features"
            if (group.trim()[0] === "@") {
                group = `features.${group.trim().substring(1)}`;
                group = group.replace(/\)$/m, ", context, evalFunc)");
            }
            let result = evalFunc(group);
            // Si el resultado contiene más expresiones, procesarlas recursivamente
            if (expr.test(result)) {
                result = parseTemplate(result, context);
            }
            return result;
        }
        catch (err) {
            // Si hay un error al evaluar la expresión, devolver el error
            return err;
        }
    });
};
// Función para registrar el motor de plantillas personalizado en una aplicación de Express
const registerCustomTemplateEngine = (expressApp) => expressApp.engine("custom", renderTemplate);
exports.registerCustomTemplateEngine = registerCustomTemplateEngine;
