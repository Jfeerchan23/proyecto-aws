require("dotenv").config();
const PORT = process.env.AWS_PORT
const DATABASE = process.env.AWS_DATABASE
const DATABASEUSER = process.env.AWS_DATABASE_USER
const DATABASEPASSWORD = process.env.AWS_DATABASE_PASSWORD
const DATABASEHOST = process.env.AWS_DATABASE_HOST
const DATABASEDIALECT = process.env.AWS_DIALECT


module.exports = {
    PORT,
    DATABASE,
    DATABASEUSER,
    DATABASEPASSWORD,
    DATABASEHOST,
    DATABASEDIALECT
};