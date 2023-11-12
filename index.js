const express = require("express");
const cors = require("cors");
const alumnosRoutes = require("./src/routes/alumno.routes");
const profesoresRoutes = require("./src/routes/profesor.routes")
const app = express();

app.use(cors());
app.use(express.json());

app.use("/alumnos", alumnosRoutes);
app.use("/profesores", profesoresRoutes);

const port = process.env.port || 8080;
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
  });
