require("dotenv").config();
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
            TableName: process.env.AWS_DYNAMODB,
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
        TableName: process.env.AWS_DYNAMODB,
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

function updateItemInDynamoDB(uuid, updateExpression, expressionAttributeValues) {
    return new Promise((resolve, reject) => {
        const params = {
            TableName: process.env.AWS_DYNAMODB,
            Key: {
                'id': { S: uuid }
            },
            UpdateExpression: updateExpression,
            ExpressionAttributeValues: expressionAttributeValues,
            ReturnValues: 'ALL_NEW' // Esto devuelve el elemento actualizado
        };

        ddb.updateItem(params, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

module.exports = {
    generateRandomString,
    putItemInDynamoDB,
    getItemFromDynamoDB,
    searchItem,
    updateItemInDynamoDB
};

