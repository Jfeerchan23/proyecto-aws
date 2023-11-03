const express = require("express");
const router = express.Router();
const alumnosController = require('../controllers/alumno.controller')

router.get('/', alumnosController.getAlumnos);
router.post("/", alumnosController.uploadAlumno);
router.get('/:id', alumnosController.getAlumnoById);
router.put("/:id", alumnosController.updateAlumno);
router.delete("/:id", alumnosController.deleteAlumno)
router.route("/").all(alumnosController.methodNotAllowed);
router.route("/:id").all(alumnosController.methodNotAllowed);

module.exports = router;