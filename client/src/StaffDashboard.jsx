import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header';

const StaffDashboard = () => {
  const [patientData, setPatientData] = useState({
    name: '',
    email: '',
    phoneNo: '',
    weight: '',
    age: '',
    symptoms: '',
    anyOtherDiseases: 'None',
    status: 'Active',
    // Medical vitals
    bloodPressure: '',
    heartRate: '',
    bloodSugar: ''
  });

  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [showVitals, setShowVitals] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8800/patients', patientData);
      setSubmissionStatus('success');
      // Reset form after successful submission
      setPatientData({
        name: '',
        email: '',
        phoneNo: '',
        weight: '',
        age: '',
        symptoms: '',
        anyOtherDiseases: 'None',
        status: 'Active',
        bloodPressure: '',
        heartRate: '',
        bloodSugar: ''
      });
      setShowVitals(false);
    } catch (error) {
      setSubmissionStatus('error');
      console.error('Error submitting patient data:', error);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
          <h1 className="text-2xl font-bold text-cyan-700 mb-6">Patient Information Collection</h1>
          
          {submissionStatus === 'success' && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
              Patient data submitted successfully!
            </div>
          )}
          
          {submissionStatus === 'error' && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              Error submitting patient data. Please try again.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">Basic Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name Field */}
                <div className="flex flex-col">
                  <label className="text-sm text-gray-600 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={patientData.name}
                    onChange={handleChange}
                    placeholder="Patient Name"
                    className="border-b border-cyan-200 py-2 px-1 focus:outline-none focus:border-cyan-500"
                    required
                  />
                </div>

                {/* Email Field */}
                <div className="flex flex-col">
                  <label className="text-sm text-gray-600 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={patientData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="border-b border-cyan-200 py-2 px-1 focus:outline-none focus:border-cyan-500"
                    required
                  />
                </div>

                {/* Phone Field */}
                <div className="flex flex-col">
                  <label className="text-sm text-gray-600 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phoneNo"
                    value={patientData.phoneNo}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="border-b border-cyan-200 py-2 px-1 focus:outline-none focus:border-cyan-500"
                    required
                  />
                </div>

                {/* Age Field */}
                <div className="flex flex-col">
                  <label className="text-sm text-gray-600 mb-1">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={patientData.age}
                    onChange={handleChange}
                    placeholder="Age"
                    className="border-b border-cyan-200 py-2 px-1 focus:outline-none focus:border-cyan-500"
                    required
                  />
                </div>

                {/* Weight Field */}
                <div className="flex flex-col">
                  <label className="text-sm text-gray-600 mb-1">Weight (kg)</label>
                  <input
                    type="number"
                    name="weight"
                    value={patientData.weight}
                    onChange={handleChange}
                    placeholder="Weight"
                    className="border-b border-cyan-200 py-2 px-1 focus:outline-none focus:border-cyan-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Medical Information Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">Medical Information</h2>
              
              {/* Symptoms Field */}
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">Symptoms</label>
                <textarea
                  name="symptoms"
                  value={patientData.symptoms}
                  onChange={handleChange}
                  placeholder="Describe symptoms..."
                  className="border border-cyan-200 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-cyan-500 resize-none"
                  rows="3"
                  required
                />
              </div>

              {/* Other Diseases Field */}
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">Other Medical Conditions</label>
                <textarea
                  name="anyOtherDiseases"
                  value={patientData.anyOtherDiseases}
                  onChange={handleChange}
                  placeholder="Any other diseases or conditions?"
                  className="border border-cyan-200 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-cyan-500 resize-none"
                  rows="2"
                />
              </div>

              {/* Vitals Toggle */}
              <button
                type="button"
                onClick={() => setShowVitals(!showVitals)}
                className="text-cyan-600 hover:text-cyan-800 text-sm font-medium flex items-center"
              >
                {showVitals ? 'Hide' : 'Show'} Vital Signs
                <svg
                  className={`w-4 h-4 ml-1 transition-transform ${showVitals ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Vitals Section */}
              {showVitals && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-blue-50 rounded-lg">
                  {/* Blood Pressure */}
                  <div className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-1 flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                      Blood Pressure
                    </label>
                    <div className="flex items-center border-b border-blue-200 py-2">
                      <input
                        type="text"
                        name="bloodPressure"
                        value={patientData.bloodPressure}
                        onChange={handleChange}
                        placeholder="120/80"
                        className="appearance-none bg-transparent w-full text-gray-700 focus:outline-none"
                      />
                      <span className="text-xs text-gray-500 ml-1">mmHg</span>
                    </div>
                  </div>

                  {/* Heart Rate */}
                  <div className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-1 flex items-center">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                      Heart Rate
                    </label>
                    <div className="flex items-center border-b border-blue-200 py-2">
                      <input
                        type="text"
                        name="heartRate"
                        value={patientData.heartRate}
                        onChange={handleChange}
                        placeholder="72"
                        className="appearance-none bg-transparent w-full text-gray-700 focus:outline-none"
                      />
                      <span className="text-xs text-gray-500 ml-1">bpm</span>
                    </div>
                  </div>

                  {/* Blood Sugar */}
                  <div className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-1 flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Blood Sugar
                    </label>
                    <div className="flex items-center border-b border-blue-200 py-2">
                      <input
                        type="text"
                        name="bloodSugar"
                        value={patientData.bloodSugar}
                        onChange={handleChange}
                        placeholder="90"
                        className="appearance-none bg-transparent w-full text-gray-700 focus:outline-none"
                      />
                      <span className="text-xs text-gray-500 ml-1">mg/dL</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
              >
                Submit Patient Data
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default StaffDashboard;