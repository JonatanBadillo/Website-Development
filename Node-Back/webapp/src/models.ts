import { DataTypes, Model } from 'sequelize';
import { sequelize } from './database';

export class Videojuego extends Model {
    public id!: number;
    public nombre!: string;
    public descripcion!: string;
    public precio!: number;
    public consola!: string[];
    public imagen!: string;
}

Videojuego.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    consola: {
        type: DataTypes.JSON,
        allowNull: false
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'Videojuego'
});
