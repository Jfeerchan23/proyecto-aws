require("dotenv").config();
const { validateStudentData, searchById } = require('./validations');
const { Alumno } = require("../models/Alumno");
const {sns} = require("../models/SNS");

module.exports.methodNotAllowed = (_, res) => {
    res.status(405).json({ "Error": "Method not allowed" });
}
module.exports.getAlumnos = (_, res) => {
    Alumno.findAll().then(alumnos => {
        res.status(200).json({ alumnos })
    });
}

module.exports.getAlumnoById = async (req, res) => {
    const { id } = req.params;
    const studentFound = await searchById(id, Alumno);

    if (!studentFound) {
        return res.status(404).json({ "Error": "Not Found" });
    }
    return res.status(200).json(studentFound);
}

module.exports.uploadAlumno = (req, res) => {
    const { nombres, apellidos, matricula, promedio } = req.body;
    if (!validateStudentData(nombres, apellidos, matricula, promedio)) {
        return res.status(400).json({ "Error": "Invalid parameters" });
    }

    Alumno.create({ nombres, apellidos, matricula, promedio })
        .then(newAlumno => {
            return res.status(201).json(newAlumno);
        });
};

module.exports.updateAlumno = async (req, res) => {
    const { id } = req.params;
    const { nombres, apellidos, matricula, promedio } = req.body;
    const studentFound = await searchById(id, Alumno);

    if (!studentFound) {
        return res.status(400).json({ "Error": "Student not found" });
    }
    if (!validateStudentData(nombres, apellidos, matricula, promedio)) {
        return res.status(400).json({ "Error": "Invalid Parameters undefined" });
    }

    const alumnoEdited = await Alumno.update(
        { nombres, apellidos, matricula, promedio },
        { where: { id } }
    )
    return res.status(200).json(alumnoEdited);

}

module.exports.deleteAlumno = async (req, res) => {
    const { id } = req.params;
    const studentFound = await searchById(id, Alumno);
    if (!studentFound) {
        return res.status(404).json({ "Error": "Alumno not found" });
    }
    await Alumno.destroy({ where: { id } })
    return res.status(200).json({ "deleted": studentFound })
}

module.exports.enviarAlerta =async (req,res)=>{

     const { id } = req.params;
    const studentFound = await searchById(id, Alumno);
    if (!studentFound) {
        return res.status(404).json({ "Error": "Not Found" });
    }
    const { nombres, apellidos, promedio } = studentFound;
    const params = {
        Message: JSON.stringify({ nombres, apellidos, promedio }),
        Subject: 'Información del alumno',
        TopicArn: process.env.AWS_ARN // reemplaza con el ARN de tu topic SNS 'proyecto-topic'
      };
      
      sns.publish(params, (err, data) => {
        if (err) {
          console.error('Error al enviar la alerta:', err);
        } else {
          console.log('Alerta enviada correctamente:', data.MessageId);
        }
      });


    return res.status(200).json({ nombres, apellidos, promedio });
    


}
