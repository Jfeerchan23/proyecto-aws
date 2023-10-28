const express = require("express");
const cors = require("cors");
const alumnosRoutes = require("./src/routes/alumno.routes");
const app = express();

app.use(cors());
app.use(express.json());

//ROUTES
app.use("/alumnos", alumnosRoutes);

const port = process.env.port || 8080;
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
  });
