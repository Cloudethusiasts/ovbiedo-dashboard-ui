import React, { useState } from "react";
import { FaLock } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

const OviedoOTP = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGetLink = async () => {
    const otpCode = otp.join("");
    
    if (otpCode.length < 6) {
      setError("Please enter the full 6-digit OTP code.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://ovbiedo-dashboards.dev.cloudethusiast.net/api/AdminDashboard/verifypasswordresetcode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ resetCode: otpCode }),
      });

      if (!response.ok) {
        throw new Error("OTP verification failed. Please check for the issue and try again.");
      }

      const data = await response.json();
      console.log("OTP verified:", data);
      console.log("OTP email:", data.data.email);

      // Navigate to success page upon successful OTP verification
      navigate("/SucessfulPass", {email:data.data.email});
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    let newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Move focus to the next input box
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg--100">
      <div className="relative my-auto h-96 md:w-1/3 lg:w-3/6 flex flex-col sm:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
        
        {/* Left Section */}
        <div className="w-full sm:w-1/2 p-6 bg-[#f6f6f6] flex flex-col justify-center items-center">
          <p className="absolute top-4 left-4 text-sm font-black"><Link to="/NewEmail">Go Back</Link></p>
          <FaLock className="text-6xl text-blue-400" />
          <h1 className="text-3xl font-bold text-red-500 mt-4">Forgot Password?</h1>
          <p className="text-gray-600 mt-2">Recover your password</p>
        </div>

        {/* Right Section */}
        <div className="w-full sm:w-1/2 p-8 flex flex-col justify-center">
          <p className="text-gray-700 mb-4">
            We’ve sent a 6 digit code to your <br/> administrator account email <strong>admin@obviedo.com</strong>
          </p>

          {/* OTP Input */}
          <div className="flex justify-between">
            {otp.map((data, index) => (
              <input
                className="w-12 h-12 text-center border border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                type="text"
                name="otp"
                maxLength="1"
                key={index}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onFocus={(e) => e.target.select()}
              />
            ))}
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}

          {/* Verify Button */}
          <button
            className="w-full bg-green-500 text-white font-bold text-sm py-2 rounded-lg mt-6 hover:bg-green-600 transition-colors duration-200"
            onClick={handleGetLink}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          <p className="text-gray-600 mt-4 text-sm text-center">
            Resend OTP in 60 seconds
          </p>
        </div>
      </div>
    </div>
  );
};

export default OviedoOTP;