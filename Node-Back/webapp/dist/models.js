"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Videojuego = void 0;
// src/models.ts
const sequelize_1 = require("sequelize");
const database_1 = require("./database");
class Videojuego extends sequelize_1.Model {
    id;
    nombre;
    descripcion;
    precio;
    consola;
    imagen;
}
exports.Videojuego = Videojuego;
Videojuego.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    precio: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    consola: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false
    },
    imagen: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize: database_1.sequelize,
    modelName: 'Videojuego'
});
