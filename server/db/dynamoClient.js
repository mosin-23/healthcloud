// dynamoClient.js
const AWS = require('aws-sdk');

AWS.config.update({
  region: process.env.AWS_REGION,  
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// Create DynamoDB document client (to interact with DynamoDB in a more straightforward way)
const dynamoClient = new AWS.DynamoDB.DocumentClient();

module.exports = dynamoClient;
