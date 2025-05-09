import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { FaLock } from "react-icons/fa"; // Added FaLock icon

export default function NewEmail() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Create a navigate function

  const handleGetLink = async(e) => {
    e.preventDefault();
    setLoading(true);
    // navigate('/Password');
    
    try {
    
        const response = await fetch("https://ovbiedo-dashboards.dev.cloudethusiast.net/api/AdminDashboard/forgotpassword", {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Accept": "text/plain",
          },

          body: JSON.stringify({recoveryEmail: email}),
      
        });
        console.log(response)
        
        if (!response.ok) {
          throw new Error("Login failed. Please check your credentials and try again.");
        }
    
        const data = await response.json();
        console.log("Login successful:", data);
    
        // Redirect user to a different page on successful login
        navigate("/Password");
        console.log("")
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
  return (
    <div className="h-screen flex justify-center items-center bg-white px-4 sm:px-6 lg:px-8">
      <div className="relative flex w-full max-w-4xl bg-slate-50 rounded-lg shadow-md overflow-hidden"> {/* Main container */}
        
        {/* Left side with icon and text */}
        <div className="w-1/2 bg-gray-100 flex flex-col justify-center items-center p-8">
        <p className="absolute top-4 left-4 text-sm font-black"><Link to="/">Go Back</Link></p>
          <FaLock className="text-8xl text-[#00008B]" /> {/* Lock icon */}
          <h2 className="text-3xl font-bold text-[#f13434] mt-4">Forgot Password?</h2>
          <p className="text-sm text-gray-600 mt-2">Reset your password</p>
        </div>

        {/* Right side with form */}
        <div className="w-1/2 p-8 sm:p-10 md:p-12">
          <h2 className="text-xl sm:text-2xl font-bold text-start mb-4">Reset your Password</h2>
          <form>
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-1">Enter your Email</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Example@gmail.com"
                  className="w-full p-2 sm:p-3 border border-gray-400 rounded hover:border-red-500 focus:outline-none focus:border-[#821F1F]" required
                />
              </div>
            </div>
                  
            {/* Error Message */}
            {error && <p className="text-red-500 text-center">{error}</p>}


            <button
              className="w-full bg-[#821F1F] text-white font-bold py-2 sm:py-3 rounded flex items-center justify-center"
              onClick={handleGetLink}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Reset Password"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
