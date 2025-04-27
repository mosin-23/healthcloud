import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import StaffDashboard from './StaffDashboard'
import Restricted from './Restricted'
import UploadForm from '../UploadReports'
import Patients from './Patients'
import Profile from './Profile'
import DoctorDashboard from './DoctorDashboard'
import PatientSymptomsAnalysis from './OverallChart'
import StaffAndDoctorsList from './ListStaff'
import Footer from './Footer'
const App = () => {
  const [logged, setLogged] = useState(() => {
    const role = localStorage.getItem('role');
    return role === 'patient' || role === 'staff' || role === 'admin';
  });

  const role = localStorage.getItem('role');

  return (
    <>
    <Routes>
      <Route
      path='/'
      element={
        logged
          ? role === 'staff'
            ? <Navigate to='/staffdashboard' />
            : role === 'doctor'
            ? <Navigate to='/doctor' />
            : <Navigate to='/dashboard' />
          : <Login setLogged={setLogged} />
      }
    />

      <Route path='/register' element={<Register />} />

      {logged && <Route path='/staffdashboard' element={<StaffDashboard />} />}
      {logged && <Route path='/profile' element={<Profile />} />}
      {logged && <Route path='/doctor' element={<DoctorDashboard />} />}
      {!logged && <Route path='/staffdashboard' element={<Restricted />} />}
      {!logged && <Route path='/*' element={<Restricted/>}/>}
      {role === 'staff' && <Route path='/uploadpatient' element={<UploadForm />} />}
      {role === 'staff' && <Route path='/patients' element={<Patients />} />}
      {role === 'doctor' && <Route path='/patients' element={<Patients />} />}
      {role === 'doctor' && <Route path='/viewanalysis' element={< PatientSymptomsAnalysis/>} />}
      {role === 'doctor' && <Route path='/staff' element={< StaffAndDoctorsList/>} />}

    </Routes>
    {logged && <Footer/>}

    </>


  )
}

export default App;
