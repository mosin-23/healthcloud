import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const StaffDashboardHeader = ({ staffName, staffAvatar, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  // SVG Icons
  const PatientIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
    </svg>
  );

  const UploadIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  );

  const LogoutIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
    </svg>
  );

  const ChevronDownIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  );

  return (
    <header className="bg-gray-900 text-gray-100 shadow-xl sticky top-0 z-50 border-b border-gray-700">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        {/* Brand Section */}
        <div 
          className="flex items-center space-x-4 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <img 
            src="https://www.freeiconspng.com/uploads/doctors-logo-icon-29.png" 
            alt="Clinic Logo" 
            className="h-10 w-auto"
          />
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            MediCare Portal
          </h1>
        </div>

        {/* Navigation Tabs */}
        {/* Navigation Tabs */}
<nav className="flex-1 mx-8">
  <ul className="flex space-x-1">
    {/* Show Patient List for both roles */}
    <li>
      <NavLink
        to="/patients"
        className={({ isActive }) =>
          `flex items-center space-x-2 px-5 py-3 rounded-lg transition-all font-medium ${
            isActive
              ? 'bg-gray-800 text-blue-400 shadow-inner border border-gray-700'
              : 'text-gray-300 hover:bg-gray-800 hover:text-white'
          }`
        }
      >
        <PatientIcon />
        <span>Patient List</span>
      </NavLink>
    </li>

    {/* If role is 'staff', show Upload Records */}
    {role === 'staff' && (
      <li>
        <NavLink
          to="/uploadpatient"
          className={({ isActive }) =>
            `flex items-center space-x-2 px-5 py-3 rounded-lg transition-all font-medium ${
              isActive
                ? 'bg-gray-800 text-purple-400 shadow-inner border border-gray-700'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`
          }
        >
          <UploadIcon />
          <span>Upload Records</span>
        </NavLink>
      </li>
    )}
    

    {/* If role is 'doctor', show List Staff */}
    {role === 'doctor' && (
      <li>
        <NavLink
          to="/staff"
          className={({ isActive }) =>
            `flex items-center space-x-2 px-5 py-3 rounded-lg transition-all font-medium ${
              isActive
                ? 'bg-gray-800 text-purple-400 shadow-inner border border-gray-700'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`
          }
        >
          <UploadIcon />
          <span>List Staff</span>
        </NavLink>
      </li>
    )}

    {/* If role is 'doctor', show View Analysis */}
{role === 'doctor' && (
  <li>
    <NavLink
      to="/viewanalysis"
      className={({ isActive }) =>
        `flex items-center space-x-2 px-5 py-3 rounded-lg transition-all font-medium ${
          isActive
            ? 'bg-gray-800 text-purple-400 shadow-inner border border-gray-700'
            : 'text-gray-300 hover:bg-gray-800 hover:text-white'
        }`
      }
    >
      <span>View Analysis</span>
    </NavLink>
  </li>
)}
  </ul>
</nav>


        {/* User Controls */}
        <div className="flex items-center space-x-4 relative">
          <div 
            className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-800 cursor-pointer transition-all group"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <div className="relative">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png" 
                alt="Staff" 
                className="w-9 h-9 rounded-full border-2 border-gray-600 group-hover:border-blue-400 transition-colors"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
            </div>
            <div className="flex flex-col items-start">
              <span className="font-medium text-white">{localStorage.getItem('name')}</span>
              <span className=" text-gray-400 text-xs capitalize font-bold  ">{localStorage.getItem('role')}</span>
            </div>
            <ChevronDownIcon className={`transition-transform ${showDropdown ? 'rotate-180' : ''}`}/>
          </div>
          
          {showDropdown && (
            <div className="absolute right-0 top-14 mt-2 w-56 bg-gray-800 rounded-lg shadow-xl border border-gray-700 z-50 overflow-hidden">
              <div className="py-1">
                <button 
                  onClick={() => {
                    navigate('/profile');
                    setShowDropdown(false);
                  }}
                  className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 w-full text-left"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  Your Profile
                </button>
                <button 
                  onClick={() => {
                    navigate('/settings');
                    setShowDropdown(false);
                  }}
                  className="flex items-center px-4 py-3 text-gray-500 hover:bg-gray-700 w-full text-left"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  Settings
                </button>
                <div className="border-t border-gray-700"></div>
                <button 
                  onClick={() => {
                    onLogout();
                    setShowDropdown(false);
                  }}
                  className="flex items-center px-4 py-3 text-red-400 hover:bg-gray-700 w-full text-left"
                >
                  <LogoutIcon />
                  <span className="ml-3" onClick={()=>{localStorage.clear();navigate('/')}}>Sign out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default StaffDashboardHeader;