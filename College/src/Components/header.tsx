import { CgProfile } from "react-icons/cg";
import { FaArrowDown } from "react-icons/fa";

import { CiSearch } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoNotificationsOutline } from "react-icons/io5";
import SideBarUser from "../UserComponents/SideBarUser";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
interface HeaderProps {
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setSideBarUser:React.Dispatch<React.SetStateAction<boolean>>;
}

function Job_Hover_Div(){
  const navigate = useNavigate()
    return <div className="p-5 shadow-md w-[150px] bg-white">

      <div className="flex flex-col gap-2"> 
        <span
        onClick={()=> navigate('/IamUser/recommendedJobs')}
        className="text-slate-500 cursor-pointer hover:text-blue-400 text-sm">Recommended Jobs</span>
        <span
         onClick={()=> navigate('/IamUser/applicationStatus')}
        className="text-slate-500 cursor-pointer hover:text-blue-400 text-sm">Application status</span>
        <span
        onClick={()=> navigate('/IamUser/savedjobs')}
        className="text-slate-500 cursor-pointer hover:text-blue-400 text-sm">Saved Jobs</span>
      </div>
      
    </div>
}


export default function Header({setShowLogin,setSideBarUser}:HeaderProps){

  const [show_employer,setShowEmployer] = useState(false)
  const [show_job,setShowJob] = useState(false)
  const [countNoti,setCountNoti] = useState('')
  const navigate = useNavigate()

  async function Get_NotificationCount(){
    try{
      const Count_UnRead = await axios({
        url:"http://localhost:3000/user/getNotiCount",
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        },
        method:'GET'
      })

      if(Count_UnRead.data && Count_UnRead.data.count){
        setCountNoti(Count_UnRead.data.count)
      }
    }
    catch(err){
      console.log(err)
    }
  }


  useEffect(()=>{
     if(localStorage.getItem('token')){
      Get_NotificationCount()
     }
  },[])

    return <div className="w-screen font-aman shadow-2xl px-30 flex justify-between">
       {/* logo and name div */}

       <div  onClick={()=>{
          if(localStorage.getItem('token')){
            navigate('/IamUser/profile')
          }
         }} className="flex cursor-pointer flex-col animate-pulse h-20 w-20 justify-center items-center  rounded-full">

         <img
        
         src="/LogoYuva.jpg" className="w-full rounded-full border object-contain border-slate-400 h-full" alt="" />
         
       </div>


       {/* Mid div elements */}
       <div className="flex gap-10 text-lg text-gray-600 items-center">
        <div  className="relative flex cursor-pointer p-2 gap-3 text-lg items-center"
            onMouseEnter={() => setShowJob(true)}
            onMouseLeave={() => setShowJob(false)}>
        <span
        
        className="hover:cursor-pointer hover:text-black">Jobs</span>

         {show_job && (
        <div className="absolute top-12 z-50">
          <Job_Hover_Div />
        </div>
  )}


        </div>
        
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

         <div className="relative">
            <IoNotificationsOutline
            onClick={()=> navigate('/IamUser/notifications')}
            className="text-2xl cursor-pointer text-slate-500" />

            {countNoti && <span className="text-white absolute p-2 text-xs left-3 -top-1 bg-red-500 rounded-full w-3 h-3 flex justify-center items-center">{countNoti}</span>}
            
         </div>
       
        
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
          
  <div 
  className="relative flex cursor-pointer p-2 gap-3 text-lg items-center"
  onMouseEnter={() => setShowEmployer(true)}
  onMouseLeave={() => setShowEmployer(false)}
>
  <span className="text-slate-500 hover:text-black flex items-center gap-1">
    For employers
    <FaArrowDown className="text-sm" />
  </span>

  {show_employer && (
    <div className="absolute top-4 z-50">
      <For_EmployersDiv />
    </div>
  )}
</div>


  
</div>
       </div>}
       
    </div>
}

function For_EmployersDiv(){
  return (
    <div className="flex flex-col gap-2 px-3 py-2 rounded-2xl w-[160px] absolute mt-6 shadow-md bg-white">
      <span className="font-medium text-sm py-1 hover:text-blue-400">Buy online</span>
      <span className="font-medium text-sm py-1 hover:text-blue-400">Naukri Talent Cloud</span>
      <span onClick={()=> window.location.href = '/recruiter/login'} className="font-medium text-sm py-1 hover:text-blue-400">Employer Login</span>
    </div>
  )
}