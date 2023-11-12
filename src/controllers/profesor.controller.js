const { searchById, validateTeacherData } = require('./validations');

let profesores = [];

module.exports.methodNotAllowed = (_, res) => {
    res.status(405).json({ "Error": "Method not allowed" });
}
module.exports.getProfesores = (_, res) => {
    res.status(200).json(profesores);
}

module.exports.getProfesorById = (req, res) => {
    const { id } = req.params;
    const teacherFound = searchById(id, profesores);
    if (!teacherFound) {
        return res.status(404).json({ "Error": "Teacher not found" });
    }
    return res.status(200).json(teacherFound);
}

module.exports.uploadProfesor = (req, res) => {
    const { id, nombres, apellidos, numeroEmpleado, horasClase } = req.body;
    const exist = searchById(id, profesores);
    if (!validateTeacherData(id, nombres, apellidos, numeroEmpleado, horasClase)) {
        return res.status(400).json({ "Error": "Invalid parameters" });
    }

    if (exist) {
        return res.status(400).json({ "Error": "Teacher already exists" });
    }

    const newTeacher = { id, nombres, apellidos, numeroEmpleado, horasClase };

    profesores.push(newTeacher);

    return res.status(201).json(newTeacher);
};

module.exports.updateProfesor = (req, res) => {
    const { id } = req.params;
    const { nombres, apellidos, numeroEmpleado, horasClase } = req.body;
    const teacherFound = searchById(id, profesores);

    if (!teacherFound) {
        return res.status(400).json({ "Error": "Teacher not found" });
    }
    if (!validateTeacherData(id, nombres, apellidos, numeroEmpleado, horasClase)) {
        return res.status(400).json({ "Error": "Invalid parameters" });
    }

    profesores[profesores.indexOf(teacherFound)] = { ...teacherFound, nombres, apellidos, numeroEmpleado, horasClase };
    return res.status(200).json("Teacher updated");

}

module.exports.deleteProfesor = (req, res) => {
    const { id } = req.params;
    const teacherFound = searchById(id, profesores);

    if (teacherFound) {
        profesores = profesores.filter(profesor => profesor !== teacherFound);
        return res.status(200).json("Teacher deleted");
    } else {
        return res.status(404).json({ "Error": "Teacher not found" });
    }
}
