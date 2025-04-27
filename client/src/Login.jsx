import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
const Login = ({setLogged}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("https://healthcloud-l1hl.onrender.com/users/login", {
        email,
        password,
      });
    
      if (response.data) {  // Explicit success check
        console.log("Login successful:", response.data);
        setLogged(true);
        const userole=response.data.user.role
        const uid=response.data.user._id
        const name=response.data.user.name
        localStorage.setItem('role',userole);
        localStorage.setItem('uid',uid)
        localStorage.setItem('name',name)
        if(userole=='patient' )
        {
          navigate('/patientdashboard')
        }
        else if(userole=='staff' ){
          navigate('/staffdashboard')
        }
        else if(userole=='doctor'){
          navigate('/doctor')
        }
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r  from-blue-300 to-gray-400 p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden"
      >
        <div className="p-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-800">Health & Cloud</h1>
            <p className="text-gray-600 mt-2">Secure access to your health data</p>
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="relative mb-6"
            >
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsFocusedEmail(true)}
                onBlur={() => setIsFocusedEmail(email.length > 0)}
                className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-all"
                required
              />
              <label
                htmlFor="email"
                className={`absolute left-4 transition-all duration-300 ${
                  isFocusedEmail || email
                    ? "top-0 text-xs text-blue-500"
                    : "top-3 text-gray-400"
                }`}
              >
                Email
              </label>
            </motion.div>

            {/* Password Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="relative mb-8"
            >
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setIsFocusedPassword(true)}
                onBlur={() => setIsFocusedPassword(password.length > 0)}
                className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-all"
                required
              />
              <label
                htmlFor="password"
                className={`absolute left-4 transition-all duration-300 ${
                  isFocusedPassword || password
                    ? "top-0 text-xs text-blue-500"
                    : "top-3 text-gray-400"
                }`}
              >
                Password
              </label>
            </motion.div>

            {/* Login Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-400 text-white py-3 px-4 rounded-lg font-medium transition-all text-xl"
            >
              {loading ? "Logging in..." : "Login"}
            </motion.button>
          </form>

          {/* Register Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-6 text-center"
          >
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 hover:underline font-medium"
              >
                Register here
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;