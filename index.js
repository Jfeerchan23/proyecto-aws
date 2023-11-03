const express = require("express");
const cors = require("cors");
const alumnosRoutes = require("./src/routes/alumno.routes");
const profesoresRoutes = require("./src/routes/profesor.routes")
const app = express();

const validPath = (req) => {
    const reqq = ["/alumnos", "/profesores"];
    return reqq.includes(req.url);
}

app.use(cors());
app.use(express.json());

//ROUTES
app.use("/alumnos", alumnosRoutes);
app.use("/profesores", profesoresRoutes);

app.use((req, res, next) => {
    if (!validPath(req)) {
        res.status(404).json({
            "Error": { "Path not allowed": req.url }
        });
    }
    next();
})

const port = process.env.port || 8080;
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
  });
