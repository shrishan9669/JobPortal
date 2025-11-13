import axios from "axios";
import { useEffect, useState } from "react";
import { BiQuestionMark } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";
import { FaHamburger, FaUserCircle } from "react-icons/fa";
import { GiTireIronCross } from "react-icons/gi";
import { LuLogOut, LuUser } from "react-icons/lu";

export default function SideBarUser({ onClose, sideBarUser }: any) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    // Wait for animation to complete before calling onClose
    setTimeout(() => {
      onClose();
    }, 500); // Match this with your CSS transition duration
  };

  // Reset closing state when sidebar opens
  useEffect(() => {
    if (sideBarUser) {
      setIsClosing(false);
    }
  }, [sideBarUser]);


   function Logout(){
         localStorage.removeItem('email');
         localStorage.removeItem('name');
         localStorage.removeItem('token');

         window.location.href = '/'
   }

  return (
    <div className="fixed inset-0 flex font-aman justify-end bg-black/20 backdrop-blur-xs z-50">
      {/* Backdrop click to close */}
      <div 
        className={`absolute inset-0 transition-opacity duration-300 ${
          isClosing ? 'opacity-0' : 'opacity-100'
        }`}
        onClick={handleClose}
      />
      
      <div 
        className={`font-aman h-screen px-4 py-10 bg-white rounded-l-2xl w-[400px] z-50 transition-transform duration-300 ${
          sideBarUser && !isClosing ? 'slide-in' : 'slide-out'
        }`}
      >
        {/* Cross button */}
        <div onClick={handleClose} className="flex mb-3 justify-end cursor-pointer">
          <GiTireIronCross className="text-slate-600 hover:text-slate-400" />
        </div>

        {/* profile picture and name description*/}
        <div className="px-4 gap-4 flex justify-around items-center">
          {/* picture */}

          <div className="bg-slate-400 p-1 rounded-full">
            <div className="p-1 bg-white rounded-full">
            <FaUserCircle className="text-slate-400 hover:text-black/50 cursor-pointer w-[80px] h-[80px]" />
          </div>
          </div>
          

          {/* Name */}
          <div className="flex flex-col gap-2">
            <span className="font-medium text-xl">{localStorage.getItem('name')?.toUpperCase()}</span>
            <span className="text-slate-600">Not Mentioned</span>
            <span
            onClick={()=> window.location.href = '/IamUser/profile'}
            className="text-blue-500 font-medium cursor-pointer" >View & Update Profile</span>
          </div>
        </div>

        {/* line */}
       <div className="border-t border-gray-300 my-4"></div>


        {/* profile performance */}
        <div className="px-4 flex justify-between items-center">
          <span className="font-semibold">Your profile performance</span>
          <span className="text-slate-500 text-xs">Last 90 days</span>
        </div>

        

        <div className=" mx-5 flex justify-between mt-7 h-[140px] bg-blue-100 rounded-xl">
          <div className="w-[50%] border-gray-300 border-r flex flex-col items-center justify-center">
            <span>0</span>
            <span>Search Appearances</span>
            <span>View all</span>
          </div>

      

          <div className="w-[50%] flex flex-col items-center justify-center">
            <span>0</span>
            <span>Recruiter Actions</span>
            <span>View all</span>
          </div>
        </div>

        <div className="flex flex-col gap-4 px-4 mt-10 items-start">
          <span className="flex gap-3  cursor-pointer items-center"><FaHamburger className="text-slate-500" /><span>Naukri Blog</span></span>
          <span className="flex gap-3 cursor-pointer text-lg items-center"><CiSettings className="text-slate-500" /><span>Settings</span></span>
          <span className="flex gap-3 cursor-pointer items-center"><BiQuestionMark className="text-slate-500" /><span>FAQs</span></span>
          <span
          onClick={Logout}
          className="flex gap-3 cursor-pointer items-center"><LuLogOut className="text-slate-500" /><span>Logout</span></span>
        </div>
      </div>
    </div>
  );
}