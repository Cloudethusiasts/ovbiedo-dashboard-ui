import React, { useState } from "react";
import pendant from "../Images/Oviedosignin.jpg";
import { FaEyeSlash, FaEye, FaEnvelope, FaLock } from "react-icons/fa"; // Import FaEye for toggling
import { Link, useNavigate } from "react-router-dom";

const OviedoSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://ovbiedo-dashboard-api.cloudethusiast.com/api/AdminDashboard/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Login failed. Please check your credentials and try again.");
      }

      const data = await response.json();
      console.log("Login successful:", data);

      // Redirect user to a different page on successful login
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen flex justify-center items-center">
      <div className="w-full md:w-3/4 lg:w-1/2 min-h-{100%} flex flex-col sm:flex-row rounded-lg overflow-hidden shadow-lg">
        {/* Left Side with Red Background and Image */}
        <div className="hidden sm:block sm:w-1/2 bg-gradient-to-b from-[#FBB03B] via-[#f3055c] to-[#520207] relative">
          <img
            src={pendant}
            alt="mobile-App"
            className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-multiply"
          />
          <div className="absolute bottom-6 left-4 text-white text-center">
            <h2 className="text-2xl font-bold">Obviedo Events Management Dashboard</h2>
            <p className="text-sm">
              Create Oviedo Events, Track Participants, and Manage Event Records
            </p>
          </div>
        </div>

        {/* Right Side (Form) */}
        <div className="w-full sm:w-1/2 bg-white p-10 flex flex-col justify-center">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold text-center">Log in to your Account</h2>
            <p className="text-xs font-extralight text-gray-500 text-center">
              Welcome Back! Let’s Get You Back on Track.
            </p>

            {/* Email Input with Icon */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Example@gmail.com"
                  className="w-full px-4 py-2 pl-10 border border-gray-400 rounded focus:outline-none focus:border-[#821F1F] hover:border-[#821F1F]"
                  required
                />
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
            </div>

            {/* Password Input with Icon */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"} // Dynamic type based on visibility state
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-2 pl-10 border border-gray-400 rounded focus:outline-none focus:border-[#821F1F] hover:border-[#821F1F] pr-10"
                  required
                />
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                {showPassword ? (
                  <FaEye
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                    onClick={() => setShowPassword(false)} // Hide password
                  />
                ) : (
                  <FaEyeSlash
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                    onClick={() => setShowPassword(true)} // Show password
                  />
                )}
              </div>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* Remember Me & Forgot Password */}
            <div className="flex justify-between items-center">
              <label className="flex items-center text-sm text-gray-700">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <Link
                to="/NewEmail"
                className="text-sm text-black hover:underline hover:text-[#821F1F]"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#821F1F] text-white font-bold text-sm py-2 rounded hover:bg-[#600f0f] transition-colors duration-200"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OviedoSignIn;

