const express = require("express");
const router = express.Router();
const alumnosController = require('../controllers/alumno.controller');

// Definir rutas y lógica aquí


// #/alumnos => GET             (Listado de alumnos)
router.get('/', alumnosController.getAlumnos);
// #/alumnos => POST            (Crear nuevo alumno)
router.post("/", alumnosController.uploadAlumno);

// #/alumnos/{id} => GET        (Obtener un alumno por su id)
router.get('/:id', alumnosController.getAlumnoById);
// #/alumnos/{id} => PUT        (Actualizar un alumno por su id)
router.put("/:id", alumnosController.updateAlumno);
// #/alumnos/{id} => DELETE     (Eliminar un alumno por su id)
/* router.delete("/:id", alumnosController.deleteAlumno); */

// Todo lo demás que no sea /alumnos con [GET, POST] => 405
router.route("/").all(alumnosController.methodNotAllowed);
// Todo lo demás que no sea /alumnos/:id con [GET, PUT, DELETE] => 405
router.route("/:id").all(alumnosController.methodNotAllowed);


/* router.route("/").all(alumnoController.methodNotAllowed);
router.route("/:id").all(alumnoController.methodNotAllowed); */
module.exports = router;