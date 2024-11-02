
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { sequelize } from './database';

export class Videojuego extends Model<InferAttributes<Videojuego>, InferCreationAttributes<Videojuego>> {
  declare id: CreationOptional<number>;
  declare nombre: string;
  declare descripcion: string;
  declare precio: number;
  declare consola: string[];
  declare imagen: string;
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
  modelName: 'Videojuego',
  tableName: 'Videojuegos'
});