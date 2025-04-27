require('dotenv').config();
const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const fs = require('fs');
const router = express.Router();
const dynamoClient = require('../db/dynamoClient'); // your existing client

// Configure AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

// Multer config to store file temporarily
const upload = multer({ dest: 'uploads/' });

// Upload endpoint
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const fileContent = fs.readFileSync(req.file.path);

    // Extract patient ID from the filename (e.g., "p12345_report.pdf" => "p12345")
    const originalName = req.file.originalname;
    const pid = originalName.split('.')[0]; 

    const s3Params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${originalName}`, // Unique name
      Body: fileContent,
      ContentType: req.file.mimetype,
    };

    const result = await s3.upload(s3Params).promise();
    fs.unlinkSync(req.file.path); // Clean up the temp file

    // Save the uploaded file URL to the 'report' field in DynamoDB
    const dbParams = {
      TableName: 'Patients',
      Key: { pid },
      UpdateExpression: 'SET report = :url',
      ExpressionAttributeValues: {
        ':url': result.Location
      }
    };

    await dynamoClient.update(dbParams).promise();

    res.json({ success: true, fileUrl: result.Location, pid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Upload failed', error: err.message });
  }
});

module.exports = router;
