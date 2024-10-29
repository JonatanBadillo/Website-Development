"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeModels = void 0;
const sequelize_1 = require("sequelize");
const orm_models_1 = require("./orm_models");
const primaryKey = {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
};
const initializeModels = (sequelize) => {
    orm_models_1.Person.init({
        ...primaryKey,
        name: { type: sequelize_1.DataTypes.STRING },
    }, { sequelize });
    orm_models_1.Calculation.init({
        ...primaryKey,
        age: { type: sequelize_1.DataTypes.INTEGER },
        years: { type: sequelize_1.DataTypes.INTEGER },
        nextage: { type: sequelize_1.DataTypes.INTEGER },
    }, { sequelize });
    orm_models_1.ResultModel.init({ ...primaryKey }, { sequelize });
};
exports.initializeModels = initializeModels;
