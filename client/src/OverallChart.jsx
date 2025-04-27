import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Header from './Header'
// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const PatientSymptomsAnalysis = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all patients
  const fetchPatients = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:8800/patients');
      setPatients(response.data);
    } catch (err) {
      setError("Failed to fetch patients. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  // Analyze symptom frequency
  const analyzeSymptoms = () => {
    const symptomCounts = {};

    patients.forEach((patient) => {
      if (!patient.symptoms) return;
      
      const symptomsList = patient.symptoms
        .split(',')
        .map((symptom) => symptom.trim().toLowerCase());

      symptomsList.forEach((symptom) => {
        symptomCounts[symptom] = (symptomCounts[symptom] || 0) + 1;
      });
    });

    return symptomCounts;
  };

  // Analyze disease frequency
  const analyzeDiseases = () => {
    const diseaseCounts = {};

    patients.forEach((patient) => {
      const disease = patient.disease || 'Not Diagnosed';
      diseaseCounts[disease] = (diseaseCounts[disease] || 0) + 1;
    });

    return diseaseCounts;
  };

  const symptomCounts = analyzeSymptoms();
  const diseaseCounts = analyzeDiseases();

  // Prepare data for charts
  const symptomsData = {
    labels: Object.keys(symptomCounts),
    datasets: [
      {
        label: 'Symptom Frequency',
        data: Object.values(symptomCounts),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const diseasesData = {
    labels: Object.keys(diseaseCounts),
    datasets: [
      {
        data: Object.values(diseaseCounts),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
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
        text: '',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
    },
  };

  return (
    <>
    <Header/>
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Patient Health Analysis
      </h1>

      {loading && (
        <div className="p-3 mb-4 bg-blue-100 text-blue-700 rounded-lg">
          Loading patient data...
        </div>
      )}

      {error && (
        <div className="p-3 mb-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {patients.length > 0 && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Patient Summary</h2>
              <p>
                <span className="font-medium">Total Patients:</span> {patients.length}
              </p>
              <p>
                <span className="font-medium">Unique Symptoms:</span> {Object.keys(symptomCounts).length}
              </p>
              <p>
                <span className="font-medium">Diseases Diagnosed:</span> {Object.keys(diseaseCounts).length}
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Top Diseases</h2>
              <ul className="space-y-1">
                {Object.entries(diseaseCounts)
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 5)
                  .map(([disease, count]) => (
                    <li key={disease}>
                      <span className="font-medium">{disease}:</span> {count} patients
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-80">
              <h3 className="text-lg font-semibold mb-2">Disease Distribution</h3>
              <Pie 
                data={{...diseasesData, 
                  datasets: [{
                    ...diseasesData.datasets[0],
                    label: 'Patients by Disease'
                  }]
                }} 
                options={{
                  ...pieOptions,
                  plugins: {
                    ...pieOptions.plugins,
                    title: {
                      display: true,
                      text: 'Patients by Disease'
                    }
                  }
                }} 
              />
            </div>

            <div className="h-80">
              <h3 className="text-lg font-semibold mb-2">Most Common Symptoms</h3>
              <Bar 
                data={symptomsData} 
                options={{
                  ...chartOptions,
                  plugins: {
                    ...chartOptions.plugins,
                    title: {
                      display: true,
                      text: 'Symptom Frequency'
                    }
                  }
                }} 
              />
            </div>
          </div>

          <div className="h-96">
            <h3 className="text-lg font-semibold mb-2">Symptom Trends</h3>
            <Line 
              data={symptomsData} 
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  title: {
                    display: true,
                    text: 'Symptom Occurrence Over Patients'
                  }
                }
              }} 
            />
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default PatientSymptomsAnalysis;