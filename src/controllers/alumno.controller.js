const { validateStudentData, searchById } = require('./validations');

let alumnos = [];

module.exports.methodNotAllowed = (_, res) => {
    res.status(405).json({ "Error": "Method not allowed" });
}
module.exports.getAlumnos = (_, res) => {
    res.status(200).json(alumnos);
}

module.exports.getAlumnoById = (req, res) => {
    const { id } = req.params;
    const studentFound = searchById(id, alumnos);
    if (!studentFound) {
        return res.status(404).json({ "Error": "Student not found" });
    }
    return res.status(200).json(studentFound);
}

module.exports.uploadAlumno = (req, res) => {
    const { id, nombres, apellidos, matricula, promedio } = req.body;
    const exist = searchById(id, alumnos);
    if (!validateStudentData(id, nombres, apellidos, matricula, promedio)) {
        return res.status(400).json({ "Error": "Invalid parameters" });
    }

    if (exist) {
        return res.status(400).json({ "Error": "Student already exists" });
    }

    const newStudent = { id, nombres, apellidos, matricula, promedio };

    alumnos.push(newStudent);

    return res.status(201).json(newStudent);
};

module.exports.updateAlumno = (req, res) => {
    const { id } = req.params;
    const { nombres, apellidos, matricula, promedio } = req.body;
    const studentFound = searchById(id, alumnos);

    if (!studentFound) {
        return res.status(400).json({ "Error": "Student not found" });
    }
    if (!validateStudentData(id, nombres, apellidos, matricula, promedio)) {
        return res.status(400).json({ "Error": "Invalid parameters" });
    }

    alumnos[alumnos.indexOf(studentFound)] = { ...studentFound, nombres, apellidos, promedio, matricula };
    return res.status(200).json("Student updated");

}

module.exports.deleteAlumno = (req, res) => {
    const { id } = req.params;
    const studentFound = searchById(id, alumnos);

    if (studentFound) {
        alumnos = alumnos.filter(alumno => alumno !== studentFound);
        return res.status(200).json("Student deleted");
    } else {
        return res.status(404).json({ "Error": "Student not found" });
    }
}

