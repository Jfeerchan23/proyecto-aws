require("dotenv").config();
const { validateStudentData, searchById } = require('./validations');
const { generateRandomString, putItemInDynamoDB, getItemFromDynamoDB} =require('./dyndbop');
const { Alumno } = require("../models/Alumno");
const { sns} = require("../models/AWSConfig");
const { v4: uuidv4 } = require('uuid'); // Para generar UUIDs

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
    const { nombres, apellidos, matricula, promedio, password } = req.body;
    if (!validateStudentData(nombres, apellidos, matricula, promedio, password)) {
        return res.status(400).json({ "Error": "Invalid parameters" });
    }

    Alumno.create({ nombres, apellidos, matricula, promedio, password })
        .then(newAlumno => {
            return res.status(201).json(newAlumno);
        });
};

module.exports.updateAlumno = async (req, res) => {
    const { id } = req.params;
    const { nombres, apellidos, matricula, promedio, password } = req.body;
    const studentFound = await searchById(id, Alumno);

    if (!studentFound) {
        return res.status(400).json({ "Error": "Student not found" });
    }
    if (!validateStudentData(nombres, apellidos, matricula, promedio, password)) {
        return res.status(400).json({ "Error": "Invalid Parameters undefined" });
    }

    const alumnoEdited = await Alumno.update(
        { nombres, apellidos, matricula, promedio, password },
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

module.exports.enviarAlerta = async (req, res) => {

    const { id } = req.params;
    const studentFound = await searchById(id, Alumno);
    if (!studentFound) {
        return res.status(404).json({ "Error": "Not Found" });
    }
    const { nombres, apellidos, promedio } = studentFound;
    const params = {
        Message: JSON.stringify({ nombres, apellidos, promedio }),
        Subject: 'Información del alumno',
        TopicArn: process.env.AWS_ARN_TOPIC // reemplaza con el ARN de tu topic SNS 'proyecto-topic'
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

module.exports.uploadFotoPerfil = async (req, res) => {
    const { id } = req.params;
    const fileLocation = req.file.location;
    const status = await Alumno.update(
        {
            fotoPerfilUrl: fileLocation,
        },
        {
            where: {
                id: id,
            },
        }
    )
    if (status != 0) {
        const studentFound = await searchById(id, Alumno);
        if (!studentFound) {
            return res.status(404).json({ "Error": "Not Found" });
        }
        return res.status(200).json(studentFound);
    }
    res.status(500).json(studentFound);
}

module.exports.login = async (req, res) => {

    const { id } = req.params;
    const password = req.body.password;
    const studentFound = await searchById(id, Alumno);

    if (!studentFound) {
        return res.status(400).json({ "Error": "Student not Found" });
    }
  
    if (password === studentFound.password) {

        const sessionString = generateRandomString(128); // Función para generar el string aleatorio
        const uuid = uuidv4();
        var params = {
            TableName: 'sesiones-alumnos',
            'Item': {
                'id': { S: uuid }, // Cambiado a tipo String (S)
                'fecha': { N: Math.floor(new Date().getTime() / 1000).toString() }, // Unix timestamp como número (N)
                'alumnoId': { N: id }, // Reemplaza '123' con el ID del alumno en formato de número (N)
                'active': { BOOL: true }, // Booleano, true por defecto (BOOL)
                'sessionString': { S: sessionString }
            }

        };

        await putItemInDynamoDB(params);

        const sessionData = await getItemFromDynamoDB(uuid);

        return res.status(200).json({ "sessionString": sessionData.Item.sessionString.S });

    } else {
        // Las contraseñas no coinciden
        console.log('las contraseñas no coinciden');

        return res.status(400).json({ "Error": "Wrong password" });
    }

}
