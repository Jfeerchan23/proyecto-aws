class Alumno {
    constructor(id, nombre, apellido, matricula, promedio) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.matricula = matricula;
        this.promedio = promedio;
    }

    static testValidID(idToValidate) {
        const regexParaId = new RegExp(/^[0-9]/);
        return regexParaId.test(idToValidate) ? idToValidate > 0 : false;
    }

    static testValidNames(textoToValidate) {
        const regexParaTexto = new RegExp(/^[a-zA-ZÀ-ÿ ]+/);
        return textoToValidate != null ? regexParaTexto.test(textoToValidate) : false;
    }

    static testValidMatricula(matriculaToValidate) {
        const regexParaMatricula = new RegExp(/^A[0-9]/);
        return matriculaToValidate != null ? regexParaMatricula.test(matriculaToValidate) : false;
    }

    static testValidAverage(averageToValidate) {
        return !isNaN(averageToValidate) ? averageToValidate > 0 : false;
    }

    static validParams(id, nombre, apellido, matricula, promedio) {
        return Alumno.testValidID(id) &&
            Alumno.testValidNames(nombre) &&
            Alumno.testValidNames(apellido) &&
            Alumno.testValidMatricula(matricula) &&
            Alumno.testValidAverage(promedio);
    }

    static searchById(id, arreglo) {
        
        return arreglo.find(a => a.id == id);
    }
}
module.exports = { Alumno };
