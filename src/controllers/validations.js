

function testValidID(idToValidate) {
    const regexParaId = new RegExp(/^[0-9]/);
    return regexParaId.test(idToValidate) ? idToValidate > 0 : false;
}

function testValidNames(textoToValidate) {
    const regexParaTexto = new RegExp(/^[a-zA-ZÀ-ÿ ]+/);
    return textoToValidate != null ? regexParaTexto.test(textoToValidate) : false;
}

function testValidEnrollment(matriculaToValidate) {
    const regexParaMatricula = new RegExp(/^A[0-9]/);
    return matriculaToValidate != null ? regexParaMatricula.test(matriculaToValidate) : false;
}

function testValidAverage(averageToValidate) {
    return !isNaN(averageToValidate) ? averageToValidate > 0 : false;
}
function validateStudentData(id, nombre, apellido, matricula, promedio) {
    return testValidID(id) &&
        testValidNames(nombre) &&
        testValidNames(apellido) &&
        testValidEnrollment(matricula) &&
        testValidAverage(promedio);
}

function searchById(id, arreglo) {
    
    return arreglo.find(a => a.id == id);
}

function validateTeacherData(id, nombre, apellido, numeroEmpleado, horasClase){
    return testValidID(id) && testValidNames(nombre) && testValidNames(apellido) && testValidAverage(numeroEmpleado) && testValidAverage(horasClase)

}


module.exports = {
    testValidID,
    testValidNames,
    testValidEnrollment,
    testValidAverage,
    validateStudentData,
    searchById,
    validateTeacherData
};
