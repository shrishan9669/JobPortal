import { CgProfile } from "react-icons/cg";
import { FaArrowDown } from "react-icons/fa";

import { CiSearch } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoNotificationsOutline } from "react-icons/io5";
import SideBarUser from "../UserComponents/SideBarUser";
interface HeaderProps {
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setSideBarUser:React.Dispatch<React.SetStateAction<boolean>>;
}
export default function Header({setShowLogin,setSideBarUser}:HeaderProps){
    return <div className="w-screen font-aman shadow-2xl px-30 flex justify-between">
       {/* logo and name div */}

       <div onClick={()=> window.location.href = '/'} className="flex cursor-pointer flex-col animate-pulse h-20 w-20 justify-center items-center  rounded-full">

         <img src="/LogoYuva.jpg" className="w-full rounded-full border object-contain border-slate-400 h-full" alt="" />
         
       </div>


       {/* Mid div elements */}
       <div className="flex gap-10 text-lg text-gray-600 items-center">
        <span className="hover:cursor-pointer hover:text-black">Jobs</span>
        <span className="hover:cursor-pointer hover:text-black">Companies</span>
        <span className="hover:cursor-pointer hover:text-black">Services</span>
       </div>



       {/* Search Bar , naukri 360 and notification and UserSettings bar */}
       {localStorage.getItem('email') && <div className="flex gap-20">
        <div className="flex items-center rounded-full px-5 gap-5 border border-gray-400 shadow-lg my-4 justify-between">
          <span className="text-slate-500 text-sm">Search jobs here</span>
          <CiSearch className="rounded-full h-6 w-6  text-slate-500"/>
        </div>


      <div className="flex justify-center gap-6 items-center"> 
        <button className="text-blue-500 cursor-pointer border rounded-full border-blue-500 font-bold px-4 py-2">Yuva<span className="text-green-400">360</span></button>

        <IoNotificationsOutline className="text-2xl cursor-pointer text-slate-500" />
        
        <span
        onClick={()=>setSideBarUser(true)}
        className="flex justify-between gap-4 px-2 py-2 border cursor-pointer border-gray-400 rounded-full  items-center">
          <RxHamburgerMenu className="text-slate-500"/>
          <CgProfile className="text-xl text-slate-500" />

        </span>
      </div>
       </div>}
       
        




       {/* End div button */}
      {!localStorage.getItem("email") &&  <div className="flex items-center gap-3">
         <button className="px-4 cursor-pointer rounded-full py-2 text-lg border border-blue-500 hover:bg-slate-300 text-blue-600 font-medium " onClick={()=>{
          console.log("hi");
          setShowLogin(true);
         }}>Login</button>
         
         <button className="px-4 cursor-pointer hover:saturate-300 rounded-full py-2   bg-orange-600 text-white  text-lg font-medium"
         onClick={()=> window.location.href='/signup'}
         >Register</button>
         {/* small line */}
         <div className="h-[20px] border border-slate-300 "></div>
        <div className="flex cursor-pointer gap-3 text-lg items-center">
  <span className="text-slate-500  hover:text-black relative group">
    For employers
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
  </span>
  <FaArrowDown className="text-sm" />
</div>
       </div>}
       
    </div>
}