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
const s3 = new AWS.S3();
module.exports = { sns, s3};
