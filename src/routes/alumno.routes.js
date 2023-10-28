
const express = require("express");
const router = express.Router();
const alumnoController = require('../controllers/alumno.controller');
// Definir rutas y lógica aquí

module.exports = router;
router.get('/', alumnoController.getAlumnos);

/* router.get('/', alumnosController.getAlumnos);
router.post("/", alumnosController.createAlumno);
router.get('/:id', alumnosController.getAlumnoById);
router.put("/:id", alumnosController.updateAlumno);
router.delete("/:id", alumnosController.deleteAlumno);
router.route("/").all(alumnosController.methodNotAllowed);
router.route("/:id").all(alumnosController.methodNotAllowed);

module.exports = router; */