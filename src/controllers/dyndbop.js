const { ddb } = require("../models/AWSConfig");

function generateRandomString(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function putItemInDynamoDB(params) {
    return new Promise((resolve, reject) => {
        ddb.putItem(params, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

function getItemFromDynamoDB(uuid) {
    return new Promise((resolve, reject) => {
        ddb.getItem({
            TableName: 'sesiones-alumnos',
            Key: {
                'id': { S: uuid }
            }
        }, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

function searchItem(alumnoId, sessionString) {
    const params = {
        TableName: 'sesiones-alumnos',
        FilterExpression: 'alumnoId = :alumnoId AND sessionString = :sessionString AND active = :active',
        ExpressionAttributeValues: {
            ':alumnoId': { N: alumnoId }, // Asumiendo que alumnoId es un número
            ':sessionString': { S: sessionString },
            ':active': { BOOL: true } // Asumiendo que active es un booleano
        }
    };

    return new Promise((resolve, reject) => {
        ddb.scan(params, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data.Items);
            }
        });
    });
}

module.exports = {
    generateRandomString,
    putItemInDynamoDB,
    getItemFromDynamoDB,
    searchItem
};

