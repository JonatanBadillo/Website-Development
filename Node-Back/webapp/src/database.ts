// src/database.ts
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite', // Nombre del archivo de la base de datos SQLite
    logging: console.log
});
