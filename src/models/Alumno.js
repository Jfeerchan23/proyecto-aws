const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("./db");

class Alumno extends Model { }

Alumno.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombres: DataTypes.STRING,
        apellidos: DataTypes.STRING,
        matricula: DataTypes.STRING,
        promedio: DataTypes.FLOAT,
        password: DataTypes.STRING,
        fotoPerfilUrl: DataTypes.STRING,
    },
    { sequelize, modelName: "alumno" }
);
Alumno.sync();
module.exports = { Alumno };