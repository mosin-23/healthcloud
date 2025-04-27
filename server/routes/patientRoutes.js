// patientRoutes.js
const express = require('express');
const router = express.Router();
const patientController = require('../contoller/patientController');

// Route to get all patients
router.get('/', patientController.getAllPatients);

// Route to add a new patient
router.post('/', patientController.addPatient);

// Route to get patient by ID
router.get('/:id', patientController.getPatientById);

// Route to update patient details
router.put('/:id', patientController.updatePatient);

// Route to delete patient
router.delete('/:id', patientController.deletePatient);

module.exports = router;
