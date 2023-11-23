const { searchById, validateTeacherData } = require('./validations');
const { Profesor } = require("../models/Profesor");


module.exports.methodNotAllowed = (_, res) => {
    res.status(405).json({ "Error": "Method not allowed" });
}
module.exports.getProfesores = (_, res) => {
    Profesor.findAll().then(profesores => {
        res.status(200).json({ profesores })
    });
}

module.exports.getProfesorById = async (req, res) => {
    const { id } = req.params;
    const teacherFound = await searchById(id, Profesor);
    if (!teacherFound) {
        return res.status(404).json({ "Error": "Teacher not found" });
    }
    return res.status(200).json(teacherFound);
}

module.exports.uploadProfesor = (req, res) => {
    const { nombres, apellidos, numeroEmpleado, horasClase } = req.body;
  
    if (!validateTeacherData(nombres, apellidos, numeroEmpleado, horasClase)) {
        return res.status(400).json({ "Error": "Invalid parameters" });
    }

    Profesor.create({ nombres, apellidos, numeroEmpleado, horasClase })
        .then(newTeacher => {
            return res.status(201).json(newTeacher);
        });

};

module.exports.updateProfesor = async (req, res) => {
    const { id } = req.params;
    const { nombres, apellidos, numeroEmpleado, horasClase } = req.body;
    const teacherFound = searchById(id, Profesor);

    if (!teacherFound) {
        return res.status(400).json({ "Error": "Teacher not found" });
    }
    if (!validateTeacherData(nombres, apellidos, numeroEmpleado, horasClase)) {
        return res.status(400).json({ "Error": "Invalid parameters" });
    }

    const teacherUpdated = await Profesor.update(
        { nombres, apellidos, numeroEmpleado, horasClase },
        { where: { id } }
    )
    return res.status(200).json(teacherUpdated);

}

module.exports.deleteProfesor = async (req, res) => {

    const { id } = req.params;
    const teacherFound = await searchById(id, Profesor);
    if (!teacherFound) {
        return res.status(404).json({ "Error": "Teacher not found" });
    }
    await Profesor.destroy({ where: { id } })
    return res.status(200).json({ "deleted": teacherFound })
}
