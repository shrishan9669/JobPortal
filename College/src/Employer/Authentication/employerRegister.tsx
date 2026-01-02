import axios from 'axios';
import React, { useState } from 'react';
import { Spinner } from '../../components/loader';
import { GiTireIronCross } from 'react-icons/gi';

const FindTalent = () => {

    const [email,setEmail] = useState('')
    const [loading,setLoading] = useState(false)
    const [showOtpDiv,setOtpDiv] = useState(false)

    async function Send_OTP_Email(e:any){
        e.preventDefault();

        if(email.trim()===''){
            alert("email field can't be empty");
            return ;
        }

        setLoading(true)

        try{
            const Getting = await axios({
                url:'http://localhost:3000/user/sendMailOtp',
                method:'POST',
                data:{
                    email:email
                }
            })

            if(Getting.data && Getting.data.otp){
                localStorage.setItem('mailotp',Getting.data.otp);
                setOtpDiv(true)
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
    <div className="min-h-screen font-roboto gap-10 bg-gray-50 flex items-center justify-center p-4">
         <div className=" p-8 text-center">
          <h1 className="text-5xl w-xl text-left font-bold text-gray-900 mb-4">
            Find & hire the right talent with us
          </h1>
          <div className="flex items-center justify-left space-x-2 text-gray-600 mb-8">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              Trusted by 9 Cr+ candidates
            </span>
            <span className="text-gray-400">|</span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              5 Lakh+ employers
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            Continue with Email
          </h2>
          
          <form onSubmit={Send_OTP_Email} className="space-y-6">
            {/* Mobile Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="flex rounded-lg shadow-sm border border-gray-300 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-200 transition">
               
                <input
                required
                onChange={(e)=> setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 min-w-0 block w-full px-3 py-3 rounded-r-lg border-0 focus:ring-0 outline-none"
                />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-4">
           
              <div className="flex items-start space-x-3">
                <div className="flex items-center h-5 mt-0.5">
                  <input
                    id="privacy-policy"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>
                <label htmlFor="privacy-policy" className="text-sm text-gray-700">
                  I agree to the{' '}
                  <span className="text-blue-600 font-medium">Privacy Policy</span>
                  {' '}and{' '}
                  <span className="text-blue-600 font-medium">Terms & Conditions</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 flex justify-center text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition shadow-md"
            >
              {loading ? <Spinner/>:'Send OTP'}
            </button>
          </form>

        </div>

        {showOtpDiv && <OTP_Popup email={email} onClose={()=> setOtpDiv(false)}/>}
     
    </div>
  );
};

const OTP_Popup = ({ onClose,email}:any) => {

    const [otp,setOtp] = useState(['','','','','','']);
 

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
    if(TextualOtp===localStorage.getItem('mailotp')){
       localStorage.setItem('Employeremail',email)
       localStorage.removeItem('mailotp');
       window.location.href = '/recruiter/fill-details'
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


       
      </div>
    </div>
  );
};



export default FindTalent;