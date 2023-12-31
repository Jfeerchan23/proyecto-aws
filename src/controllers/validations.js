
function testValidID(idToValidate) {
    const regexForID = new RegExp(/^[0-9]/);
    return regexForID.test(idToValidate) ? idToValidate > 0 : false;
}

function testValidNames(textToValidate) {
    const regexForText = new RegExp(/^[a-zA-ZÀ-ÿ ]+/);
    return textToValidate != null ? regexForText.test(textToValidate) : false;
}

function testValidEnrollment(enrollmentToValidate) {
    const regexForEnrollment = new RegExp(/^A[0-9]/);
    return enrollmentToValidate != null ? regexForEnrollment.test(enrollmentToValidate) : false;
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

function searchById(id, array) {

    return array.find(a => a.id == id);
}

function validateTeacherData(id, nombre, apellido, numeroEmpleado, horasClase) {
    return testValidID(id) &&
        testValidNames(nombre) &&
        testValidNames(apellido) &&
        testValidAverage(numeroEmpleado) &&
        testValidAverage(horasClase)
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
