import { Database } from "sqlite3";
import { Repository, Result } from "./repository";
import { readFileSync } from "fs";

// Clase que implementa la interfaz Repository utilizando una base de datos SQLite
export class SqlRepository implements Repository {
    db: Database;

    // Constructor que inicializa la base de datos y ejecuta un script SQL
    constructor() {
        this.db = new Database("age.db");
        this.db.exec(readFileSync("age.sql").toString(), (err) => {
            if (err != undefined) throw err; // Lanza un error si ocurre algún problema al ejecutar el script SQL
        });
    }

    // Método para guardar un resultado en la base de datos (aún no implementado)
    saveResult(r: Result): Promise<number> {
        throw new Error("Method not implemented.");
    }

    // Método para obtener todos los resultados con un límite (aún no implementado)
    getAllResults($limit: number): Promise<Result[]> {
        throw new Error("Method not implemented.");
    }

    // Método para obtener resultados por nombre con un límite (aún no implementado)
    getResultsByName($name: string, $limit: number): Promise<Result[]> {
        throw new Error("Method not implemented.");
    }
}
