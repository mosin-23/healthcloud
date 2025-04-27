import { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfileCard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const uid = localStorage.getItem('uid');
        if (!uid) throw new Error('No user ID found');
        
        const response = await axios.get(`http://localhost:8800/users/user/${uid}`);
        setUser(response.data.user);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div className="text-center py-8">Loading profile...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  if (!user) return <div className="text-center py-8">No user data found</div>;

  // Role icon component
  const RoleIcon = () => {
    const iconProps = {
      className: "w-6 h-6",
      fill: "currentColor",
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg"
    };

    switch(user.role) {
      case 'doctor':
        return (
          <svg {...iconProps}>
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clipRule="evenodd" />
          </svg>
        );
      case 'patient':
        return (
          <svg {...iconProps}>
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
          </svg>
        );
      case 'staff':
        return (
          <svg {...iconProps}>
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        );
      default: // admin
        return (
          <svg {...iconProps}>
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
          </svg>
        );
    }
  };

  // Role badge color
  const roleColor = {
    doctor: 'bg-blue-100 text-blue-800',
    patient: 'bg-green-100 text-green-800',
    staff: 'bg-purple-100 text-purple-800',
    admin: 'bg-yellow-100 text-yellow-800'
  }[user.role] || 'bg-gray-100 text-gray-800';

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        {/* Profile Header */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative">
            <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center">
              <svg className="h-12 w-12 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-sm">
              <RoleIcon />
            </span>
          </div>
          
          <div>
            <h1 className="text-xl font-bold text-gray-800">{user.name}</h1>
            <span className={`px-2 py-1 text-xs rounded-full ${roleColor}`}>
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </span>
          </div>
        </div>

        {/* Profile Details */}
        <div className="space-y-3">
          <h1>{user._id}</h1>
          <DetailItem icon="email" label="Email" value={user.email} />
          <DetailItem icon="phone" label="Phone" value={user.phoneno} />
          
          {(user.qualification || user.role === 'doctor') && (
            <DetailItem 
              icon="qualification" 
              label="Qualification" 
              value={user.qualification || 'Not specified'} 
            />
          )}
          
          {(user.experience || user.role === 'doctor') && (
            <DetailItem 
              icon="experience" 
              label="Experience" 
              value={user.experience ? `${user.experience} years` : 'Not specified'} 
            />
          )}
          
          {(user.specialization || user.role === 'doctor') && (
            <DetailItem 
              icon="specialization" 
              label="Specialization" 
              value={user.specialization || 'Not specified'} 
            />
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-100 text-sm text-gray-500">
          Member since {new Date(user.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

// Reusable detail item component
const DetailItem = ({ icon, label, value }) => {
  const getIcon = () => {
    const iconProps = {
      className: "w-5 h-5 text-gray-500 mr-3",
      fill: "currentColor",
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg"
    };

    switch(icon) {
      case 'email':
        return (
          <svg {...iconProps}>
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
        );
      case 'phone':
        return (
          <svg {...iconProps}>
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
        );
      case 'qualification':
        return (
          <svg {...iconProps}>
            <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
            <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
          </svg>
        );
      case 'experience':
        return (
          <svg {...iconProps}>
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
        );
      default: // specialization
        return (
          <svg {...iconProps}>
            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
            <path d="M3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
          </svg>
        );
    }
  };

  return (
    <div className="flex items-start">
      {getIcon()}
      <div>
        <div className="text-xs text-gray-500">{label}</div>
        <div className="text-gray-700">{value}</div>
      </div>
    </div>
  );
};

export default UserProfileCard;