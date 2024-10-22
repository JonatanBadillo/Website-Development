"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlRepository = void 0;
const sqlite3_1 = require("sqlite3");
const fs_1 = require("fs");
// Clase que implementa la interfaz Repository utilizando una base de datos SQLite
class SqlRepository {
    db;
    // Constructor que inicializa la base de datos y ejecuta un script SQL
    constructor() {
        this.db = new sqlite3_1.Database("age.db");
        this.db.exec((0, fs_1.readFileSync)("age.sql").toString(), (err) => {
            if (err != undefined)
                throw err; // Lanza un error si ocurre algún problema al ejecutar el script SQL
        });
    }
    // Método para guardar un resultado en la base de datos (aún no implementado)
    saveResult(r) {
        throw new Error("Method not implemented.");
    }
    // Método para obtener todos los resultados con un límite (aún no implementado)
    getAllResults($limit) {
        throw new Error("Method not implemented.");
    }
    // Método para obtener resultados por nombre con un límite (aún no implementado)
    getResultsByName($name, $limit) {
        throw new Error("Method not implemented.");
    }
}
exports.SqlRepository = SqlRepository;
