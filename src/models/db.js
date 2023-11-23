const { Sequelize } = require("sequelize");
const {
    DATABASE,
    DATABASEUSER,
    DATABASEPASSWORD,
    DATABASEHOST,
    DATABASEDIALECT,
} = require("./environment");
const sequelize = new Sequelize(DATABASE, DATABASEUSER, DATABASEPASSWORD, {
    host: DATABASEHOST,
    dialect: DATABASEDIALECT,
});

sequelize.authenticate()
    .then(() => { console.log("Connection has been established successfully.") })
    .catch(err => { console.error("Unable to connect to the database:", err) });

module.exports = { sequelize };