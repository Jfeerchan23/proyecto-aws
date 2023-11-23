const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("./db");

class Profesor extends Model { }

Profesor.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        numeroEmpleado: DataTypes.INTEGER,
        nombres: DataTypes.STRING,
        apellidos: DataTypes.STRING,
        horasClase: DataTypes.INTEGER,
    },
    { sequelize, modelName: "profesor" }
);
Profesor.sync();
module.exports = { Profesor };