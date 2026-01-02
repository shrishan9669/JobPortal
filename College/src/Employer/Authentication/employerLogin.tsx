import axios from "axios";
import { use, useState } from "react";
import { Spinner } from "../../Components/loader";


const TalentDecoded = () => {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [showExtraOtp,setExtraOtp] = useState(false);
  const [storeOtp,setOtp] = useState('');
  const [token,setToken] = useState('')
  const [loading,setLoading] = useState(false)

  async function LoginEmployer(){
    if(!email.trim() || !password.trim()){
      alert("Fields can't be empty spaces!!");
      return ;
    }

    setLoading(true)
    try{
      const Logging = await axios({
        url:'http://localhost:3000/user/employerLogin',
        method:'POST',
        data:{
          email,password
        }
      })

      if(Logging.data && Logging.data.login){
         setOtp(Logging.data.otp);
         setToken(Logging.data.token);
         setExtraOtp(true);
         
      }
    }
    catch(err){
      console.log(err)
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">TD</span>
            </div>
            <h1 className="text-xl font-bold text-gray-800">TALENT DECODED</h1>
          </div>
          <div className="flex space-x-4">
            <button className="px-4 py-2 text-blue-600 font-medium hover:bg-blue-50 rounded-md transition">
              Sales enquiry
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition">
              Register/Login
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container flex items-center mx-auto px-4 py-4">
        <div className="max-w-4xl flex flex-col items-start mx-auto text-center">
          <h1 className="text-4xl text-left md:text-5xl font-bold text-gray-900 mb-6">
            Decode India's largest talent pool with the power of <span className="text-blue-600">AI</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Access 10 crore+ registered jobseekers for all your talent needs
          </p>
          
          <div className="flex flex-col items-start space-y-4 md:space-y-0 md:space-x-6 mb-16">
            <div className="flex items-center  p-4 rounded-lg shadow-sm ">
              <div className="w-6 h-6 rounded-full border-2 border-blue-600 bg-blue-600 mr-3 flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <span className="text-gray-700">10 crore+ registered jobseekers for all your talent needs</span>
            </div>
            <div className="flex items-center  p-4 rounded-lg shadow-sm ">
              <div className="w-6 h-6 rounded-full border-2 border-blue-600 bg-blue-600 mr-3 flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <span className="text-gray-700">Most advanced recruitment AI</span>
            </div>
          </div>

          <button className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-md">
            Explore our products
          </button>
        </div>

           {/* Login Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Login to your account</h2>
            
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <input
                  onChange={(e)=> setEmail(e.target.value)}
                  id="email"
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Enter your email"
                  
                  
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
                Password
              </label>
              <input
                onChange={(e)=> setPassword(e.target.value)}
                id="password"
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Enter your password"
              />
            </div>
            
            <div className="flex flex-col space-y-4">
              <button onClick={LoginEmployer} className="w-full flex justify-center bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition">
                {loading ? <Spinner/>:'Login'}
              </button>
             
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-gray-600 mb-4">Don't have a registered email ID? 😊</p>
              <button onClick={()=> window.location.href = '/recruiter/client-register'} className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition">
                Create account
              </button>
            </div>
          </div>
        </div>
      </section>
      </section>

   

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">© 2023 Talent Decoded. All rights reserved.</p>
        </div>
      </footer>


      {showExtraOtp && <OTP_Popup email={email} setOTP={setOtp} onClose={()=> setExtraOtp(false)} OTP={storeOtp} token={token}/>}
    </div>
  );
};


const OTP_Popup = ({onClose,OTP,setOTP,token,email}:any) => {

    const [otp,setOtp] = useState(['','','','','','']);
    const [msg,setMsg] = useState({id:"",msg:""});

    const handleOtpChange = (index:any, value:any) => {
    // Allow only numbers and empty string
    if (!/^\d?$/.test(value)) return;

     const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    
    };

  function VerifyOtp(){
    const TextualOtp = otp.join('');
    console.log(TextualOtp)
    console.log(OTP)
    if(TextualOtp===OTP.toString()){
         localStorage.setItem('employerToken',token);
         onClose();
         window.location.href = '/recruiter/dashboard'
    }
    else{
      setMsg({id:"WrongOtp",msg:"Check OTP again."})
    }
  }

  async function ResendOtp(){
    try{
       const Resend = await axios({
        url:`http://localhost:3000/user/ResendOTP?email=${email}`,
        method:'GET'
       })

       if(Resend.data && Resend.data.otp){
            setOTP(Resend.data.otp)
            setMsg({id:'ResendOtp',msg:"Otp has been sent."})
       }
    }
    catch(err){
      console.log(err);
    }
  }
  return (
    <div className='fixed inset-0 flex font-aman items-center justify-center bg-black/80 z-50'>
      <div className='bg-white no-scrollbar zoom-in max-h-[600px] overflow-y-auto rounded-4xl flex flex-col gap-5 shadow-md p-8 max-w-md w-full mx-4'>
        
        {/* Close Button */}
        <div className="flex items-center justify-end">
          <button 
            onClick={onClose} 
            className="text-slate-500 cursor-pointer text-xl hover:text-slate-700 transition"
          >
            ✕
          </button>
        </div>

        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Enter OTP
          </h2>
          <p className="text-gray-600 mb-1">
            We've sent a 6-digit OTP to your mobile
          </p>
          <p className="text-gray-800 font-medium">
            {''}
          </p>
        </div>

        {/* OTP Input Fields */}
        <div className="flex justify-center gap-3 mb-6">
          {otp.map((_, index) => (
            <input
              key={index}
              type="number"
              max={9}
              min={0}

              onChange={(e)=> handleOtpChange(index,e.target.value)}
              maxLength={1}
              className="w-12 no-spinner h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              placeholder="•"
            />
          ))}
        </div>

        {/* Timer & Resend */}
        

        {/* Verify Button */}
        <button onClick={VerifyOtp} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md">
          Verify & Continue
        </button>

        {msg.id==='WrongOtp' && <p className="flex justify-center animate-pulse text-sm text-slate-500">{msg.msg}</p>}


        <p className="hover:underline text-blue-500 font-medium cursor-pointer"  onClick={ResendOtp}>Resend OTP</p>
        {msg.id==='ResendOtp' && <p className="flex justify-center animate-pulse text-sm text-slate-500">{msg.msg}</p>}

       
      </div>
    </div>
  );
};
export default TalentDecoded;