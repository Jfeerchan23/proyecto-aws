require("dotenv").config();
const AWS = require('aws-sdk');

// Configura las credenciales de AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  sessionToken: process.env.AWS_SESSION_TOKEN,
  region: process.env.AWS_REGION // por ejemplo, 'us-west-2'
});

const sns = new AWS.SNS();
module.exports = { sns };

/* const params = {
  Message: 'Este es un mensaje de prueba enviado desde Node.js a través de AWS SNS.',
  Subject: 'Alerta desde Node.js',
  TopicArn: 'ARN_DE_TU_PROYECTO_TOPIC' // reemplaza con el ARN de tu topic SNS 'proyecto-topic'
};

sns.publish(params, (err, data) => {
  if (err) {
    console.error('Error al enviar la alerta:', err);
  } else {
    console.log('Alerta enviada correctamente:', data.MessageId);
  }
}); */
