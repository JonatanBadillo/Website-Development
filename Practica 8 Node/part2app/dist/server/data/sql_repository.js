"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlRepository = void 0;
const fs_1 = require("fs");
const sqlite3_1 = require("sqlite3");
const sql_queries_1 = require("./sql_queries");
class SqlRepository {
    db;
    constructor() {
        this.db = new sqlite3_1.Database("age.db");
        this.db.exec((0, fs_1.readFileSync)("age.sql").toString(), (err) => {
            if (err != undefined)
                throw err;
        });
    }
    saveResult(r) {
        throw new Error("Method not implemented.");
    }
    getAllResults($limit) {
        return this.executeQuery(sql_queries_1.queryAllSql, { $limit });
    }
    getResultsByName($name, $limit) {
        return this.executeQuery(`
        SELECT Results.*, name, age, years, nextage FROM Results
        INNER JOIN People ON personId = People.id
        INNER JOIN Calculations ON calculationId = Calculations.id
        WHERE name = "${$name}"`, {});
    }
    executeQuery(sql, params) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err == undefined) {
                    resolve(rows);
                }
                else {
                    reject(err);
                }
            });
        });
    }
}
exports.SqlRepository = SqlRepository;
