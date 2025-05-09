import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import redcheck from "../Images/redcheck.png";
// import { useLocation } from "react-router-dom";

export default function NewPassword() {
  const navigate = useNavigate();

  // const location = useLocation();
  // const email = location.state?.email || ""; 

  const [NewEmail, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // console.log(email)

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://ovbiedo-dashboards.dev.cloudethusiast.net/api/AdminDashboard/resetpassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: newPassword,
            email:NewEmail, 
            confirmPassword:confirmPassword, 
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Password reset failed. Please try again.");
      }

      // const location = useLocation();
      // const email = location.state?.email || "";
      

      const data = await response.json();
      // console.log("Email Response:", data.data.email);

     

      // Screen 2:
      // const SecondPage = ({route}) => {
	    // ....
      //  ....
      //  <Text style={styles.textStyle}>
    	//   Values passed from First page: {route.params.paramKey}
  	  //   </Text>
  	  //  ....
      //  ....
      //  }

      // Success
      setIsModalVisible(true); // Show success modal
    } catch (error) {
      setError(error.message || "An error occurred while resetting your password.");
    } finally {
      setLoading(false);
    }
  };

  const handleGetLink = () => {
    setIsModalVisible(false);
    navigate("/"); // Navigate to the login page after success
  };

  return (
    <div className="h-screen flex justify-center items-center bg-white px-4 sm:px-6 lg:px-8 relative">
      {/* Modal Overlay */}
      {isModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-11/12 md:w-1/3 p-6 rounded-lg shadow-lg relative z-50">
            <div className="text-center">
              <img src={redcheck} alt="Success" className="mx-auto w-[60px] h-[60px] mb-4" />
              <h2 className="text-2xl font-bold">Password reset successful</h2>
              <p className="text-sm mt-2">You can now proceed to login.</p>
              <button
                className="w-full bg-[#ee6767] text-white font-bold text-sm py-2 mt-5 rounded"
                onClick={handleGetLink}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={`relative flex w-full max-w-4xl bg-slate-50 rounded-lg shadow-md overflow-hidden ${isModalVisible ? "opacity-25" : "opacity-100"}`}>
        {/* Left Side */}
        <div className="w-1/2 bg-gray-100 flex flex-col justify-center items-center p-8">
          <p className="absolute top-4 left-4 text-sm font-black"><Link to="/Password">Go Back</Link></p>
          <FaLock className="text-8xl text-[#00008B]" />
          <h2 className="text-3xl font-bold text-[#f13434] mt-4">Forgot Password?</h2>
          <p className="text-sm text-gray-600 mt-2">Reset your password</p>
        </div>

        {/* Right Side */}
        <div className="w-1/2 p-8 sm:p-10 md:p-12">
          <h2 className="text-xl sm:text-2xl font-bold text-start mb-4">Reset your Password</h2>
          <form>
            <div className="mb-6">
              {/* New Password Field */}
              <label className="block text-gray-700 font-bold mb-1">Enter Your Email</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your Email"
                  value={NewEmail}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 sm:p-3 border border-gray-400 rounded hover:border-red-500 focus:outline-none focus:border-[#821F1F] "
                  required
                />
              </div>

              <label className="block text-gray-700 font-bold mb-1">Enter New Password</label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-2 sm:p-3 border border-gray-400 rounded hover:border-red-500 focus:outline-none focus:border-[#821F1F]"
                  required
                />
                {showNewPassword ? (
                  <FaEye
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                    onClick={() => setShowNewPassword(false)}
                  />
                ) : (
                  <FaEyeSlash
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                    onClick={() => setShowNewPassword(true)}
                  />
                )}
              </div>

              {/* Confirm Password Field */}
              <label className="block text-gray-700 font-bold mb-1 mt-4">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-2 sm:p-3 border border-gray-400 rounded hover:border-red-500 focus:outline-none focus:border-[#821F1F]"
                  required
                />
                {showConfirmPassword ? (
                  <FaEye
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                    onClick={() => setShowConfirmPassword(false)}
                  />
                ) : (
                  <FaEyeSlash
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                    onClick={() => setShowConfirmPassword(true)}
                  />
                )}
              </div>
            </div>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <button
              className="w-full bg-[#821F1F] text-white font-bold py-2 sm:py-3 rounded flex items-center justify-center"
              onClick={handleResetPassword}
              disabled={loading}
            >
              {loading ? "Processing..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
