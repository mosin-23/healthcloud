# Healthcare App

This is a full-stack healthcare application built using the MERN (MongoDB, Express.js, React, Node.js) stack, integrated with AWS services. The app provides various functionalities, including role-based access control (RBAC) for Doctors, Staff, and Patients, patient dashboards, prescription management, and report storage in AWS S3 and DynamoDB. The application helps manage patient data, generate reports, and provides insights for healthcare professionals.

## Features

- **Role-Based Access Control (RBAC)**: 
  - Different user roles: Doctor, Staff, and Patient with specific access levels.
  - Doctors can prescribe medication, view patient reports, and manage patient records.
  - Staff can manage appointments, patient data, and assist with administrative tasks.
  - Patients can view their own health records, prescriptions, and reports.

- **Dashboard for Doctors, Staff, and Patients**:
  - **Doctor's Dashboard**: View patient records, prescribe medications, and access reports.
  - **Staff Dashboard**: Manage appointments, handle administrative tasks, and view patient data.
  - **Patient Dashboard**: Access health records, prescriptions, and health insights.

- **Prescription Management**:
  - Doctors can prescribe medications for patients, and the prescription details are stored and managed in the system.

- **Health Reports**:
  - Health reports are generated for patients and stored in AWS S3 for easy access and management.
  - Reports are also stored in AWS DynamoDB for quick retrieval and efficient data management.

- **Cloud Integration**:
  - **AWS S3**: Store patient health reports, prescriptions, and medical files securely.
  - **AWS DynamoDB**: Store patient data, including personal details, health records, and prescription histories.

- **Real-Time Updates**:
  - Real-time updates for patient health data and prescription details across different user roles (Doctors, Staff, and Patients).

- **Scalability**:
  - The app is built to be scalable, leveraging AWS services for efficient cloud storage and data management.

## Technologies Used

- **Frontend**:
  - React.js
  - Redux for state management
  - Tailwind CSS for styling

- **Backend**:
  - Node.js
  - Express.js
  - JWT (JSON Web Tokens) for authentication and authorization

- **Database**:
  - MongoDB for storing user data and health records
  - AWS DynamoDB for patient data and prescription history

- **Cloud Services**:
  - AWS S3 for storing patient reports and medical files
  - AWS DynamoDB for storing patient data and health records
  - AWS IAM for access management and security

- **Authentication & Authorization**:
  - Role-Based Access Control (RBAC) with JWT tokens
  - Doctor, Staff, and Patient roles with distinct permissions

## Setup and Installation

Follow these steps to set up the project locally:

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/healthcare-app.git
cd healthcare-app
cd client
npm run dev

cd server
npm run dev
