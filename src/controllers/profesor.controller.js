const {testValidID,testValidNames,testValidMatricula,testValidAverage,validParams,searchById} = require('./validations');

let profesores = [];

/* module.exports.methodNotAllowed = (_, res) => {
    res.status(405).json({ "Error": "Method not allowed" });
}
module.exports.getProfesores = (_, res) => {
    res.status(200).json(profesores);
}

module.exports.getProfesorById = (req, res) => {
    const { id } = req.params;
    const profesorFound = searchById(id, profesores);
    if (!profesorFound) {
        return res.status(404).json({ "Error": "Student not found" });
    }
    return res.status(200).json(profesorFound);
}

module.exports.uploadAlumno = (req, res) => {
    const { id, nombres, apellidos, matricula, promedio } = req.body;
    const exist = searchById(id, Profesores);
    if (!validParams(id, nombres, apellidos, matricula, promedio)) {
        return res.status(400).json({ "Error": "Invalid Parameters" });
    }

    if (exist) {
        return res.status(400).json({ "Error": "Profesor already exists" });
    }

    const newProfesor = { id, nombres, apellidos, matricula, promedio };

    profesores.push(newProfesor);

    return res.status(201).json(newProfesor);
};

module.exports.updateAlumno = (req, res) => {
    const { id } = req.params;
    const { nombres, apellidos, matricula, promedio } = req.body;
    const profesorFound = searchById(id, Profesores);

    if (!profesorFound) {
        return res.status(400).json({ "Error": "Alumno not found" });
    }
    if (!validParams(id, nombres, apellidos, matricula, promedio)) {
        return res.status(400).json({ "Error": "Invalid Parameters undefined" });
    }

    profesores[profesores.indexOf(profesorFound)] = { ...profesorFound, nombres, apellidos, promedio, matricula };
    return res.status(200).json("Student updated");

}

module.exports.deleteAlumno = (req, res) => {
    const { id } = req.params;
    const profesorFound = searchById(id, profesores);

    if (profesorFound) {
        // Filtrar el array para excluir el profesorFound
        profesores = profesores.filter(alumno => alumno !== profesorFound);
        return res.status(200).json("Student deleted");
    } else {
        return res.status(404).json({ "Error": "Student not found" });
    }
}
 */