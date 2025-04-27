// patientController.js
const dynamoClient = require('../db/dynamoClient');

// DynamoDB table name (change it if needed)
const PATIENT_TABLE = 'Patients';

const generatePatientId = () => {
    return 'p' + Math.floor(Math.random() * 1000000); 
  };

// Get all patients from DynamoDB
exports.getAllPatients = async (req, res) => {
  const params = {
    TableName: PATIENT_TABLE
  };

  try {
    const data = await dynamoClient.scan(params).promise();
    res.status(200).json(data.Items); // Return all patients
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({ message: "Error fetching patients", error });
  }
};

// Add a new patient to DynamoDB
exports.addPatient = async (req, res) => {
  const {
    name,
    age,
    phoneNo,
    email,
    status,
    prescription,
    report,
    disease,
    weight,
    anyOtherDiseases,
    symptoms,
    bloodPressure,
    heartRate,
    bloodSugar
  } = req.body;

  const pid = generatePatientId();

  if (!name || !age || !phoneNo || !email || !weight || !symptoms) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const patient = {
    pid,
    name,
    age,
    phoneNo,
    email,
    status: status || 'Active',
    prescription: prescription || '',
    report: report || '',
    disease: disease || 'Not Diagnosed',
    weight,
    anyOtherDiseases: anyOtherDiseases || 'None',
    symptoms,
    bloodPressure: bloodPressure || '',
    heartRate: heartRate || '',
    bloodSugar: bloodSugar || ''
  };

  const params = {
    TableName: PATIENT_TABLE,
    Item: patient
  };

  try {
    await dynamoClient.put(params).promise();
    res.status(201).json({ message: "Patient added successfully", patient });
  } catch (error) {
    console.error("Error adding patient:", error);
    res.status(500).json({ message: "Error adding patient", error });
  }
};


// Get a specific patient by ID
exports.getPatientById = async (req, res) => {
  const { id } = req.params;

  const params = {
    TableName: PATIENT_TABLE,
    Key: {
      pid: id
    },ScanIndexForward: false, 
  };

  try {
    const data = await dynamoClient.get(params).promise();
    if (!data.Item) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(data.Item);
  } catch (error) {
    console.error("Error fetching patient:", error);
    res.status(500).json({ message: "Error fetching patient", error });
  }
};

exports.updatePatient = async (req, res) => {
  const { id } = req.params;
  const updateFields = req.body;

  if (!id || Object.keys(updateFields).length === 0) {
    return res.status(400).json({ message: "Missing patient ID or fields to update" });
  }

  const ExpressionAttributeNames = {};
  const ExpressionAttributeValues = {};
  const updateExpressions = [];

  for (const [key, value] of Object.entries(updateFields)) {
    // Only include non-undefined values
    if (value !== undefined) {
      ExpressionAttributeNames[`#${key}`] = key;
      ExpressionAttributeValues[`:${key}`] = value;
      updateExpressions.push(`#${key} = :${key}`);
    }
  }

  const UpdateExpression = `SET ${updateExpressions.join(', ')}`;

  const params = {
    TableName: PATIENT_TABLE,
    Key: { pid: id },
    UpdateExpression,
    ExpressionAttributeNames,
    ExpressionAttributeValues,
    ReturnValues: "ALL_NEW"
  };

  try {
    const data = await dynamoClient.update(params).promise();
    res.status(200).json({ message: "Patient updated successfully", updatedPatient: data.Attributes });
  } catch (error) {
    console.error("Error updating patient:", error);
    res.status(500).json({ message: "Error updating patient", error });
  }
};


// Delete a patient by ID
exports.deletePatient = async (req, res) => {
  const { id } = req.params;

  const params = {
    TableName: PATIENT_TABLE,
    Key: {
      pid: id
    }
  };

  try {
    await dynamoClient.delete(params).promise();
    res.status(200).json({ message: "Patient deleted successfully" });
  } catch (error) {
    console.error("Error deleting patient:", error);
    res.status(500).json({ message: "Error deleting patient", error });
  }
};
