const {testValidID,testValidNames,testValidMatricula,testValidAverage,validParams,searchById} = require('./validations');

let alumnos = [];

module.exports.methodNotAllowed = (_, res) => {
    res.status(405).json({ "Error": "Method not allowed" });
}
module.exports.getAlumnos = (_, res) => {
    res.status(200).json(alumnos);
}

module.exports.getAlumnoById = (req, res) => {
    const { id } = req.params;
    const alumnoFound = searchById(id, alumnos);
    if (!alumnoFound) {
        return res.status(404).json({ "Error": "Student not found" });
    }
    return res.status(200).json(alumnoFound);
}

module.exports.uploadAlumno = (req, res) => {
    const { id, nombres, apellidos, matricula, promedio } = req.body;
    const exist = searchById(id, alumnos);
    if (!validParams(id, nombres, apellidos, matricula, promedio)) {
        return res.status(400).json({ "Error": "Invalid Parameters" });
    }



    if (exist) {
        return res.status(400).json({ "Error": "Alumno already exists" });
    }

    const newAlumno = { id, nombres, apellidos, matricula, promedio };

    alumnos.push(newAlumno);

    return res.status(201).json(newAlumno);
};


/* module.exports.uploadAlumno = (req, res) => {
    const { id, nombres, apellidos, matricula, promedio } = req.body;
    const exist = Alumno.searchById(id, alumnos);
    if (!Alumno.validParams(id, nombres, apellidos, matricula, promedio)) {
        return res.status(400).json({ "Error": "Invalid Parameters undefined" });
    }
    if (exist) {
        return res.status(400).json({ "Error": "Alumno already exist" });
    }
    const newAlumno = { id, nombres, apellidos, matricula, promedio };
    alumnos.push(newAlumno);
    return res.status(201).json(newAlumno);
};
 */


module.exports.updateAlumno = (req, res) => {
    const { id } = req.params;
    const { nombres, apellidos, matricula, promedio } = req.body;
    const alumnoFound = searchById(id, alumnos);

    if (!alumnoFound) {
        return res.status(400).json({ "Error": "Alumno not found" });
    }
    if (!validParams(id, nombres, apellidos, matricula, promedio)) {
        return res.status(400).json({ "Error": "Invalid Parameters undefined" });
    }

    alumnos[alumnos.indexOf(alumnoFound)] = { ...alumnoFound, nombres, apellidos, promedio, matricula };
    return res.status(200).json(alumnoFound);

}

