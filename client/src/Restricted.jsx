import React from 'react';
import { useNavigate } from 'react-router-dom';

const Restricted = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="text-center max-w-md bg-white p-8 rounded-xl shadow-lg">
        {/* Error Code */}
        <div className="text-9xl font-bold text-red-500 mb-4">401</div>
        
        {/* Main Message */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">UNAUTHORIZED</h1>
        
        {/* Description */}
        <p className="text-gray-600 mb-6">
          You don't have permission to access this page. Please contact your administrator or sign in with different credentials.
        </p>
        
        {/* Action Button */}
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Return to Login
        </button>
      </div>
    </div>
  );
};

export default Restricted;