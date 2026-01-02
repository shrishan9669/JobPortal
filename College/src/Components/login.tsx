import axios from "axios";
import { useEffect, useRef, useState } from "react";
import BarLoader, { Spinner } from "./loader";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";

import { GoogleLogin } from "@react-oauth/google";

export default function Login({show,onClose,onShowPopup,onShowOtpPopup}:any) {

  const[emailid,setEmail] = useState('');
  const[password,setPassword] = useState('');
  const[loader,setLoader] = useState(false)
  const[msg,setMsg] = useState('')
  const[showPass,setShowpass] = useState(false)
  const[forgetPass,setForgetPass] = useState(false)
  

  function Allfields(){
    if(!emailid || !password){
      return false
    }
    return true;
  }

  async function HandleLogin(){
    try{
      setLoader(true);

      const ResponseLogin = await axios({
        url:`http://localhost:3000/user/Signin?emailid=${emailid}&password=${password}`,
        method:'GET',
        
      })

      if(ResponseLogin && ResponseLogin.data.ok){
          setMsg('User logined Successfully!!')
          localStorage.setItem('email',ResponseLogin.data.email);
          localStorage.setItem('name',ResponseLogin.data.name);
          localStorage.setItem('token',ResponseLogin.data.token);
         
            window.location.href = '/IamUser/profile'
      }
     
    }
    catch(err:any){
      if (err.response && err.response.data && err.response.data.msg) {
        setMsg(err.response.data.msg);   // 👈 YAHI MAIN POINT
      } else {
        setMsg("Something went wrong. Try again later.");
      }
    }
    finally{
      setLoader(false)
    }
  }
   async function HandleGoogleSignin(response: any){
    
      try{
        const token = response.credential;
        console.log("HandleGoogleSignin " + token);
        
        const res = await axios.post(
        "http://localhost:3000/user/google-login",
        { token },
       
      );

      console.log("Login successful:", res.data);
      if(res.data && res.data.ok){
          setMsg(res.data.msg)
          localStorage.setItem('email',res.data.email);
          localStorage.setItem('name',res.data.name);
          localStorage.setItem('token',res.data.token);
          window.location.href = '/IamUser/profile'
      }
     
      onClose(); // close login panel
      }
      catch(err:any){
        if (err.response && err.response.data && err.response.data.msg) {
          alert(err.response.data.msg)
        setMsg(err.response.data.msg);   // 👈 YAHI MAIN POINT
      } else {
        setMsg("Something went wrong. Try again later.");
      }
      }
  }

  async function ForgotPassVerify(){
    if(!emailid){
      alert("Please type Registered Email Id!!");
      return ;
    }
    setLoader(true);
    try{
       const EmailRegistered = await axios({
        url:`http://localhost:3000/user/forgetLogin?email=${emailid}`,
        method:'GET'
       })

       if(EmailRegistered.data && EmailRegistered.data.real){
        // Hit pop up...for changing the password..
        console.log("Yes it is me!!");
        localStorage.setItem('emailId',emailid);
           onClose();
          onShowPopup();
          
       }
    }
    catch(err){
     console.log(err)
    }
    finally{
       setLoader(false)
    }
  }
  


 

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
    if (show) {
      setIsClosing(false);
    }
  }, [show]);

  return (
    <div className="fixed inset-0 flex font-aman items-center justify-end bg-black/40 backdrop-blur-sm z-50">

      
        <div className={`bg-white ${show && !isClosing ? 'slide-in':'slide-out'} rounded-l-2xl w-[400px] font-aman h-screen z-50 shadow-xl p-8`}>
          
          {/* Close button */}
      <button
        onClick={handleClose}
        className=" text-gray-500 flex justify-center w-full hover:text-gray-700 text-3xl cursor-pointer"
      >
        ×
      </button>
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Login</h1>
            <button
             onClick={()=>{
              onClose();
              window.location.href = '/signup'
             }}
            className="text-blue-600 cursor-pointer hover:text-blue-700 font-medium transition-colors duration-200">
              Register for free
            </button>
          </div>

          {/* Form */}
          <div className="space-y-6">
            
            {/* Email/Username */}
            <div className="space-y-2">
              <label htmlFor="emailid" className="block text-sm font-medium text-gray-700">
                Email ID / Username
              </label>
              <input
                type="text"
                id="emailid"
                onChange={(e)=> setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
                placeholder="Enter your email or username"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="flex justify-between items-center pr-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none">
                 <input
                type={showPass ? 'text':'password'}
                id="password"
                onChange={(e)=> setPassword(e.target.value)}
                className="w-full px-4 py-3 outline-0 "
                placeholder="Enter your password"
              />
              {showPass ? <FaEyeSlash onClick={()=>setShowpass(false)} />:<FaEye onClick={()=>setShowpass(true)}/>}  
              </div>
             
              <div className="flex flex-col justify-end">
                <button
                onClick={()=>{
                  setForgetPass((prev:any)=> !prev);
                }}
                className="text-blue-600 hover:text-blue-700 cursor-pointer hover:underline text-sm font-medium transition-colors duration-200">
                  Forgot Password?
                </button>

               {forgetPass ? <div className="flex flex-col gap-2 items-center">
                <input type="text" className="w-full px-4 py-3 outline-0 border border-blue-400 rounded-lg mt-3" placeholder="Enter registered Email..." onChange={(e)=> setEmail(e.target.value)} />

                <button
                onClick={ForgotPassVerify}
                className="px-3 py-1 bg-blue-400 rounded-full outline-0 text-white font-medium hover:bg-blue-500 cursor-pointer">{loader ? <Spinner/>:'Verify'}</button>
               </div>:''}
               
                
              </div>
            </div>

            {/* Login Button */}
            <button
            onClick={HandleLogin}
            disabled={!Allfields()}
            className={`w-full  flex justify-center text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 transform outline-0  active:scale-[0.98] shadow-lg hover:shadow-xl ${Allfields() ? 'bg-blue-600 hover:bg-blue-700 hover:scale-[1.02]':'bg-slate-400 text-slate-500 cursor-not-allowed'}`}>
              {loader ? <Spinner />:'Login'}
            </button>

            <span className="flex justify-center text-green-400">{msg}</span>

            {/* OTP Login */}
            <div className="flex justify-center">
              <button
              onClick={()=>{
                // Closing login first 
                onClose()
                // then show OTP popup
                onShowOtpPopup()
              }}
              className="text-blue-600 cursor-pointer hover:scale-[1.1] transition-all hover:text-blue-700 font-medium  duration-500">
                Use OTP to Login
              </button>
            </div>
 
           
           

            {/* Divider */}
            <div className="relative flex items-center my-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-400 text-sm">Or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            

            {/* Google Sign In */}
            {/* <button
            onClick={HandleGoogleSignin}
            
            className="w-full border border-gray-300 cursor-pointer hover:border-gray-400 text-gray-700 hover:text-gray-900 py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-3 hover:shadow-md">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </button> */}

            <GoogleLogin onSuccess={HandleGoogleSignin} onError={()=>alert("Google login failed!!")}/>
          </div>
    </div>

    </div>
    
  );
}




export function ChangePassword({ onClose }: any) {
  const [newpass, setNewpass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");
  const [endMsg,setEndmsg] = useState('')
  const [showNewpass,setShownewPass] = useState(false)
  const [showConfirmpass,setShowConfirmPass] = useState(false)
  const [isLoading, setIsLoading] = useState(false);

  function handleConfirmChange(e: any) {
    const value = e.target.value;
    setConfirm(value);
    if (newpass !== value) {
      setMsg("Passwords don't match");
    } else {
      setMsg("");
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!allFields) return;
    
    setIsLoading(true);
    // Simulate API call
    try{
      const SendingUpdate = await axios({
        url:'http://localhost:3000/user/changePassword',
        method:'PUT',
        data:{
          email:localStorage.getItem('emailId'),
          newpass:confirm
        }
      })

      if(SendingUpdate.data){
           setEndmsg(SendingUpdate.data.msg);
      }
    }
    catch(err){
      console.log(err)
    }
    finally{
      setIsLoading(false)
    }
    
  };

  const allFields = newpass && confirm && newpass === confirm;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-lg z-50 animate-fadeIn">
      <div className="bg-gradient-to-br font-aman from-white to-gray-50/80 p-8 rounded-3xl w-full max-w-md mx-4 shadow-2xl border border-white/20 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 hover:text-gray-700 transition-all duration-200 group"
        >
          <span className="text-lg group-hover:scale-110 transition-transform">×</span>
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Change Password
          </h1>
          <p className="text-gray-500 text-sm mt-2">Create a strong new password</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* New Password Field */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <span>New Password</span>
              {newpass && (
                <span className={`text-xs px-2 py-1 rounded-full ${
                  newpass.length >= 8 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {newpass.length >= 8 ? 'Strong' : 'Weak'}
                </span>
              )}
            </label>
            <div className="relative">
              <input
                value={newpass}
                onChange={(e) => setNewpass(e.target.value)}
                type={showNewpass ? 'text':'password'}
                placeholder="Enter new password"
                className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-200 shadow-sm hover:shadow-md"
              />
             
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {showNewpass ? <FaEyeSlash onClick={()=>setShownewPass(false)}/>:<FaEye onClick={()=>setShownewPass(true)}/>}
                </div>
              
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Confirm Password</label>
            <div className="relative">
                <input
              value={confirm}
              onChange={handleConfirmChange}
              type={showConfirmpass ? 'text':'password'}
              placeholder="Confirm your password"
              className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-200 shadow-sm hover:shadow-md"
            />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {showConfirmpass ? <FaEyeSlash onClick={()=>setShowConfirmPass(false)}/>:<FaEye onClick={()=>setShowConfirmPass(true)}/>}
                </div>
            </div>
           
            {msg && (
              <div className="flex items-center gap-2 text-red-500 text-sm animate-pulse">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {msg}
              </div>
            )}
            {!msg && confirm && newpass === confirm && (
              <div className="flex items-center gap-2 text-green-500 text-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Passwords match!
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!allFields || isLoading}
            className={`w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-300 transform ${
              allFields && !isLoading
                ? "bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] shadow-md"
                : "bg-gray-400 text-gray-500 cursor-not-allowed"
            } ${isLoading ? 'cursor-wait' : ''}`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
               
                <Spinner/>
              </div>
            ) : (
              "Change Password"
            )}
          </button>
        </form>

        <div className="flex text-green-400 font-medium justify-center">
            {endMsg}
        </div>

        {/* Password Tips */}
        <div className="mt-6 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
          <p className="text-xs text-gray-600 text-center">
            💡 <strong>Tip:</strong> Use at least 8 characters with mix of letters, numbers & symbols
          </p>
        </div>
      </div>
    </div>
  );
}

export function LoginWithOtp({onClose}:any){
  const[email,setEmail] = useState('');
  const[showOtpInput,setShowOtpInput] = useState(false)
  const[loading,setLoading] = useState(false);
  const[otp,setOtp] = useState('')
  const[msg,setMsg] = useState('');

  async function CheckEmail(){
    setLoading(true);
    try{
      const Check_Email = await axios({
      url:`http://localhost:3000/user/sendOtp?email=${email}`,
      method:"GET"
    }) 

    if(Check_Email.data && Check_Email.data.real){
          localStorage.setItem('otp',Check_Email.data.otp)
          localStorage.setItem('token',Check_Email.data.token);
          localStorage.setItem('email',email)
          setShowOtpInput(true);
          
    }
    }
    catch(err){
      console.log(err)
    }
    finally{
      setLoading(false)
    }
    
  }

  function CheckOtp(){
    if(localStorage.getItem('otp')===otp){
       setMsg("Your otp is correct");
       window.location.href = '/IamUser/profile'
       return ;
    }
    setMsg("Check otp again..!!")
  }

  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-lg z-50 animate-fadeIn">
      <div className="bg-gradient-to-br font-aman from-white to-gray-50/80 p-8 rounded-3xl w-full max-w-md mx-4 shadow-2xl border border-white/20 relative">
   <div className="flex justify-between mb-5 font-roboto">
        <h1 className="text-2xl">Login with OTP.</h1>
        <span onClick={onClose} className="text-xl font-bold cursor-pointer">X</span>
      </div>

      <div className="flex gap-2 flex-col">
        <span className="font-medium">Enter email:</span>
        <input onChange={(e)=> setEmail(e.target.value)} type="text" placeholder="Enter registered email..." className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none" />

        <button
        onClick={CheckEmail}
        disabled={!email} className={`w-full mt-3 border border-slate-400 p-2 rounded-full   ${!email ? 'cursor-not-allowed text-slate-400':'cursor-pointer hover:bg-slate-300 text-slate-800'}`}>

          {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <Spinner/>
              </div>
            ) : (
              "Verify"
            )}
        </button>
      </div>  

      <div className="mt-5">
      {showOtpInput && (
        <div className="flex gap-3 items-center flex-col">
            <span className="text-green-400">OTP has sent to your Email.</span>
            <input  onChange={(e)=> setOtp(e.target.value)} type="text" placeholder="Enter otp.." className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none" />

            <button
            onClick={CheckOtp}
            disabled={!otp} className={`px-5 py-2 rounded-full  text-white font-medium mt-3 ${!otp ? 'cursor-not-allowed bg-slate-500':'bg-blue-600 cursor-pointer hover:bg-blue-400'}`}>Login</button>

            {msg}
        </div>
      )}
      </div>
      
      </div>
   
    </div>
  )
}



