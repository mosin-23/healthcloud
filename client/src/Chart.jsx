import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PatientAnalysisChart = () => {
  const [patientId, setPatientId] = useState('');
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPatientData = async () => {
    if (!patientId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:8800/patients/${patientId}`);
      setPatientData(response.data);
    } catch (err) {
      setError("Failed to fetch patient data. Please check the ID.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Chart data configuration
  const chartData = {
    labels: ['Age', 'Weight', 'Blood Pressure', 'Heart Rate'],
    datasets: [
      {
        label: 'Patient Metrics',
        data: [
          patientData?.age || 0,
          patientData?.weight || 0,
          patientData?.bloodPressure ? parseInt(patientData.bloodPressure) : 0,
          patientData?.heartRate ? parseInt(patientData.heartRate) : 0,
        ],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Patient Health Metrics - ${patientData?.name || ''}`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="ml-auto top-2  p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Patient Data Analysis</h1>
      
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          placeholder="Enter Patient ID (e.g., p745503)"
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
        />
        <button
          onClick={fetchPatientData}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition"
        >
          {loading ? 'Loading...' : 'Fetch Data'}
        </button>
      </div>

      {error && (
        <div className="p-3 mb-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {patientData && (
        <div className="mt-6">
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Patient Details</h2>
            <p><span className="font-medium">Name:</span> {patientData.name}</p>
            <p><span className="font-medium">Disease:</span> {patientData.disease}</p>
            <p className='text-red-400 font-bold'><span className="font-medium text-black">Status:</span> {patientData.status}</p>
          </div>

          <div className="h-80">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientAnalysisChart;