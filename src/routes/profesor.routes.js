
const express = require("express");
const router = express.Router();
const profesorController = require('../controllers/profesor.controller');

router.get('/', profesorController.getProfesores);
router.post("/", profesorController.uploadProfesor);
router.get('/:id', profesorController.getProfesorById);
router.put("/:id", profesorController.updateProfesor);
router.delete("/:id", profesorController.deleteProfesor)
router.route("/").all(profesorController.methodNotAllowed);
router.route("/:id").all(profesorController.methodNotAllowed);

module.exports = router;
