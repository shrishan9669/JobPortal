import { useEffect, useState } from 'react'
import Header from './components/header'
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import NaukriRegister from './components/signup';
import Login, { ChangePassword, LoginWithOtp } from './components/login';
import SignupAddEdu from './components/SinupAddEdu';


import { GoogleOAuthProvider } from "@react-oauth/google";
import Home from './components/Home';

import UpdateUser from './UserComponents/UpdateUser';
import SideBarUser from './UserComponents/SideBarUser';
import axios from 'axios';
import VerifyEmailFail from './UserComponents/VerifyEmailFail';
import Verify_Email from './UserComponents/Verify_Email';
import Employer_login from './Employer/Authentication/employerLogin';
import FindTalent from './Employer/Authentication/employerRegister';
import CompanyRegistration from './Employer/Authentication/employerDetails';
import EmployerDashboard from './Employer/AfterLogin/dashboard';
import SavedJobs from './UserComponents/SavedJobs'

import RecommendedJobs from './UserComponents/recommendedJobs'
import Id_BasedJob from './UserComponents/IdBasedJob'
import Application_Page from './UserComponents/ApplicationPage'
import Notifications from './UserComponents/notificationPage'
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
    },50000)


    return () => clearInterval(Timeout)
     
  },[])

  function Authenticated_Component({children}){
         if(localStorage.getItem('token')){
          return children
         }

         return window.location.href = '/'
  }

  function Employer_Authenticated({children}){
    if(localStorage.getItem('employerToken')){
      return children
    }
    
    return window.location.href = '/recruiter/login'
    
  }
  

  const Where_Show_header = ['/signup','/','/IamUser/profile' , '/signup/addEducation','/verifyEmailFail','/verify-email']
 

  // Dynamic Title Dena hai...
  useEffect(() => {
  const employer = localStorage.getItem('employerToken');
  const user = localStorage.getItem('token');

  if (employer) {
    document.title = 'Employer Dashboard | YuvaJobs';
  } else if (user) {
    document.title = 'Employee Dashboard | YuvaJobs';
  } else {
    document.title = 'YuvaJobs';
  }
});

const shouldShowHeader = Where_Show_header.includes(location.pathname) || 
                        location.pathname.startsWith('/IamUser');


  return (
    <BrowserRouter>
       <GoogleOAuthProvider clientId={clientId}>
      <div className='overflow-x-hidden'>
        {shouldShowHeader && <Header setShowLogin={setShowLogin} setSideBarUser={setSideBarUser}/>}
        
    

      {showLogin && (
        <Login show={showLogin} onShowOtpPopup={()=>setShowOtpComponent(true)} onShowPopup={()=> setShowPopup(true)} onClose={()=> setShowLogin(false)}/>
      )}
      {showPopup && <ChangePassword onClose={()=> setShowPopup(false)}/>}
      {showOtpComponent && <LoginWithOtp onClose={()=> setShowOtpComponent(false)}/>}
      {sideBarUser && <SideBarUser sideBarUser={sideBarUser} onClose={()=> setSideBarUser(false)}/>}  
    
 
       <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/signup' element={<NaukriRegister/>}/>
        <Route path='/signup/addEducation' element={<SignupAddEdu/>}/>
        
        <Route path='/verify-email' element={<Verify_Email/>} />
        <Route path='/IamUser/profile' element={<Authenticated_Component><UpdateUser/></Authenticated_Component>}/>
        <Route path='/verifyEmailFail' element={<VerifyEmailFail/>}/>
        <Route path='/recruiter/login' element={<Employer_login/>}/>
        <Route path='/recruiter/client-register' element={<FindTalent/>}/>
        <Route path='/recruiter/fill-details' element={<CompanyRegistration/>}/>
        <Route path='/recruiter/dashboard' element={<Employer_Authenticated><EmployerDashboard/></Employer_Authenticated>}/>
        
        <Route path='/IamUser/recommendedJobs' element={<Authenticated_Component><RecommendedJobs/></Authenticated_Component>}/>

        <Route path='/IamUser/recommendedJobs/:id' element={<Authenticated_Component><Id_BasedJob/></Authenticated_Component>}/>

        <Route path='/IamUser/savedJobs' element={<Authenticated_Component><SavedJobs/></Authenticated_Component>}/>

         <Route path='/IamUser/applicationStatus' element={<Authenticated_Component><Application_Page/></Authenticated_Component>}/>
         <Route path='/IamUser/notifications' element={<Authenticated_Component><Notifications/></Authenticated_Component>}/>


        
        
     
       </Routes>
   
    </div>
    </GoogleOAuthProvider>
    
    </BrowserRouter>
 
  

  )
}

export default App