import { useEffect, useState } from 'react'
import Header from './Components/header'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NaukriRegister from './Components/signup';
import Login, { ChangePassword, LoginWithOtp } from './Components/login';
import SignupAddEdu from './Components/SinupAddEdu';
import BarLoader from './Components/loader';

import { GoogleOAuthProvider } from "@react-oauth/google";
import Home from './Components/Home';

import UpdateUser from './UserComponents/UpdateUser';
import SideBarUser from './UserComponents/SideBarUser';
import axios from 'axios';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID; // apna Google client ID




function App() {

  const [showLogin,setShowLogin] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showOtpComponent,setShowOtpComponent] = useState(false);
  const [sideBarUser,setSideBarUser] = useState(false)
  


  async function Continuous(){
    const Getting = await axios({
      url:'http://localhost:3000/user/continuous',
      method:'GET'
    })

    if(Getting.data && Getting.data.ok){
      console.log("OK");
    }

  } 

  useEffect(()=>{

   const Timeout = setInterval(()=>{
       Continuous();
    },20000)


    return () => clearInterval(Timeout)
     
  },[])
  
 
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className='overflow-x-hidden'>
        <Header setShowLogin={setShowLogin} setSideBarUser={setSideBarUser}/>
     {/* Overlay */}
      {showLogin && (
        <div
          onClick={() => setShowLogin(false)}
          className="fixed inset-0 bg-transparent  bg-opacity-30 z-40 transition-opacity"
        ></div>
      )}
{/* Slide-in login panel */}
      {showLogin && (
        <Login show={showLogin} onShowOtpPopup={()=>setShowOtpComponent(true)} onShowPopup={()=> setShowPopup(true)} onClose={()=> setShowLogin(false)}/>
      )}


      {showPopup && <ChangePassword onClose={()=> setShowPopup(false)}/>}
      {showOtpComponent && <LoginWithOtp onClose={()=> setShowOtpComponent(false)}/>}
      {sideBarUser && <SideBarUser sideBarUser={sideBarUser} onClose={()=> setSideBarUser(false)}/>}  
    
   <BrowserRouter>
       <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/signup' element={<NaukriRegister/>}/>
        <Route path='/signup/addEducation' element={<SignupAddEdu/>}/>
        
        
        <Route path='/IamUser/profile' element={<UpdateUser/>}/>
     
       </Routes>
   </BrowserRouter>
    </div>
    </GoogleOAuthProvider>
    
  

  )
}

export default App