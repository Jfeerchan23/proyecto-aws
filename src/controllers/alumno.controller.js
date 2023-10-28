let alumnos = [];

module.exports.getAlumnos = (_, res) => {
    res.status(200).json(alumnos);
}
