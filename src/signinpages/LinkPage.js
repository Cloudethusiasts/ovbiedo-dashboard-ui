import React, { useState } from 'react';
import { FaRegCheckCircle } from "react-icons/fa";
import { IoMdInformationCircleOutline, IoIosClose } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

export default function LinkPage() {
  const [isModalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  const handleModalLink = () => {
    setModalVisible(true); // Show the modal
  };

  const handleGetLink = () => {
    navigate('/NewPassword'); // Replace '/NewPassword' with the actual route you want to navigate to
  };

  return (
    <div className="bg-white h-screen flex justify-center items-center relative">
      {/* Top Right Box */}
      <div className="absolute top-3 right-12 bg-[#ffcccc] text-black p-3 rounded shadow-md text-xs border border-red-500">
        <div className="flex items-center">
          <IoMdInformationCircleOutline className='text-[#ee6767] text-xl mr-1' />
          <h3 className='text-base font-bold relative'>Warning!</h3>
          <IoIosClose className='absolute top-2 right-2 text-xl cursor-pointer' />
        </div>
        <p className='ml-6'>Your reset link is valid for 30 minutes. <br /> Please use it within this period.</p>
      </div>

      <div className='w-1/2 md:w-1/4 h-[50%] bg-slate-50 border-y-4 block items-center justify-center'>
        <h2 className='text-2xl font-bold text-center mt-5'>Link Sent</h2>
        <p className="text-sm font-semi-bold mt-2 text-center">
          We sent a code to example@gmail.com
        </p>

        <div className="mt-4 flex flex-col items-center">
          <FaRegCheckCircle className='text-[#86ee67] text-6xl' />  {/* Centered and larger icon */}

          <div className="text-center text-black text-xs font-semi-bold mt-3">
            <p>Didn't receive the email? <Link to="/Password" className="text-[#ee6767] hover:underline">Click to resend</Link></p>
          </div>

          <button className="w-full bg-[#ee6767] text-white font-bold text-sm py-1 rounded flex items-center justify-center mt-4"
            onClick={handleModalLink} // Show the modal on button click
          >
            Continue
          </button>
        </div>
      </div>

      {isModalVisible && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
          <div className='bg-white p-5 rounded-md w-[300px]'> {/* Adjust the width here */}
            <IoCheckmarkCircleOutline className='text-green-500 text-4xl mx-auto'/>  
            <h2 className="text-center mt-4">Verification Successful</h2>
            <p className="text-center mt-2">Your link has been successfully verified. Thank you!</p>
            <button
              className="w-full bg-[#ee6767] text-white font-bold text-sm py-1 rounded flex items-center justify-center mt-4"
              onClick={handleGetLink} 
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


