import React from 'react'
import Header from './Header'
import Prescribe from './Prescribe'
import Chart from './Chart'

const DoctorDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Prescribe Medication - Left Side */}
          <div className="lg:w-1/3">
            <Prescribe />
          </div>
          
          {/* Patient Data Analysis - Right Side */}
          <div className="lg:w-2/3">
            <Chart />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard