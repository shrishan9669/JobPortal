
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
export default function Verify_Email(){
 const [searchParams] = useSearchParams();

 const [status,setStatus] = useState('loading');

    async function Send_Verification_Req(){
        const token = searchParams.get('token');
        const email = searchParams.get('email');
        try{
              const  Sending  = await axios({
                url:`http://localhost:3000/user/verify-email?token=${token}&email=${email}`,
                method:'GET',
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
              }) 

              if(Sending.data && Sending.data.ok){
                setStatus('success')
              }
              else{
                setStatus('error')
              }
        }
        catch(err){
             console.error('Verification error:', err);
             setStatus('error');
        }
    }

    useEffect(()=>{
        Send_Verification_Req()
    },[searchParams])


    if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h1 className="text-xl font-bold text-gray-800">Verifying your email...</h1>
        </div>
      </div>
    );
  }

    if(status==='success'){
         return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Email Verified Successfully!</h1>
          <p className="text-gray-600 mb-6">Your email has been verified. You can now access all features.</p>
          
          <a 
            href="/IamUser/profile" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg inline-block"
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    );
    }

    return  (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Verification Failed</h1>
        <p className="text-gray-600 mb-6">This verification link is invalid or has expired.</p>
        
        <a 
          href="/IamUser/profile" 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg inline-block"
        >
          Request New Verification
        </a>
      </div>
    </div>
  );
}