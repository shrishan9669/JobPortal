import { useEffect, useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { Spinner } from "../../components/loader";
import axios from "axios";


const CompanyRegistration = () => {

  const [createAs,setCreateAs] = useState('Company/business');
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState(''); 


  const [type,setType] = useState('password')
  const [loading,setLoading] = useState(false)


  const [otp,setOtp] = useState('');
  const [showOtp,setShowOtp] = useState(false);

  async function EmailVerfiy(e:any){
    e.preventDefault();
    setLoading(true)
    try{
          const Getting = await axios({
            url:'http://localhost:3000/user/employPreDetails',
            method:'POST',
            data:{
                email,
                name,
                password
            },
            
          })
          if(Getting.data && Getting.data.otp){
               setOtp(Getting.data.otp)
               setShowOtp(true)
          }
    }
    catch(err){
       console.log(err)
    }
    finally{
      setLoading(false)
    }
  }

  


  const [showNext,setShowNext] = useState(false);
  const [showSuccessPage,setSuccessPage] = useState(false)

  async function CheckVerify(){
    try{
       const Checking = await axios({
          url:`http://localhost:3000/user/checkVerify?email=${localStorage.getItem('Employeremail')}`,
          method:'GET'
       })

       if(Checking.data){
           if(Checking.data.verify){
            setShowNext(true)
           }
       }
    }
    catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
     CheckVerify()
  },[])
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col">
        {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">TD</span>
            </div>
            <h1 className="text-xl font-bold text-gray-800">TALENT DECODED</h1>
          </div>
          
        </div>
      </header>

      <StepIndicator showNext={showNext}/>

      {showNext && !showSuccessPage  && <HiringCompanyForm setSuccessPage={setSuccessPage} email={email}/>}

      {showSuccessPage && <SuccessScreen/>}

      {!showNext && !showSuccessPage && <div className='flex justify-center items-center '>
<div className="max-w-lg w-full h-[600px] mt-10 bg-white rounded-2xl shadow-lg overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-white p-8 border-b border-gray-200">
         
          <p className="text-gray-600 mb-2">
            We need these details to identify you and create your account:
          </p>
          <div className="rounded-lg">
            <p className="text-blue-800 font-medium">
              <span className="text-gray-600">Email -</span> {localStorage.getItem('Employeremail')}
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="px-8 py-4">
          {/* Account Type Selection */}
          <div className="mb-5">
            <p className="text-gray-700 font-medium text-sm mb-4">
              You're creating account as
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button onClick={()=> setCreateAs('Company/business')} className={`border hover:bg-blue-100 rounded-lg text-sm p-2 text-center  ${createAs==='Company/business' ? 'bg-blue-50 border-blue-500':''}  transition`}>
                <span className="text-gray-800 font-medium">Company/business</span>
              </button>
              <button onClick={()=> setCreateAs('Proprietor')} className={`border hover:bg-blue-100 rounded-lg text-sm p-2 text-center  ${createAs==='Proprietor' ? 'bg-blue-50 border-blue-500':''}  transition`}>
                <span className="text-gray-800 font-medium">Proprietor</span>
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <form onSubmit={EmailVerfiy} className="space-y-4">
           

            {/* Name as per PAN */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name as per PAN
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                required
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Enter name as per PAN card"
              />
            </div>

            {/* Official Email ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Email Id:
              </label>
              <input
              onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Enter email ID"
              />
            </div>

            {/* Create Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Create password
              </label>
              <div className="border flex  items-center pr-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <input
              onChange={(e) => setPassword(e.target.value)}
                required
                type={type}
                className="w-full px-4 py-2  outline-none transition"
                placeholder="Enter new password"
              />

              {type==="password" ? <IoEyeOutline onClick={()=> setType('text')} />:<FaRegEyeSlash onClick={()=> setType('password')} />}
              
              </div>
             
            </div>

            {/* Continue Button */}
            <button type="submit" className="w-full mt-8 flex justify-center bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md">
              {loading ? <Spinner/>:'Continue'}
            </button>
          </form>

          
        </div>
      </div>
      </div>}
     

      {showOtp && <OTP_Popup setShowNext={setShowNext} email={email} setOTP={setOtp} OTP={otp} onClose={()=> setShowOtp(false)}/>}
      
    </div>
  );
};

const HiringCompanyForm = ({email,setSuccessPage}:any) => {

  const [hiringfor,setHiringFor] = useState('your company')
  const [company,setCompany] = useState('');
  const [industry,setIndustry] = useState('');
  const [employees,setEmployees] = useState('');
  const [designation,setDesignation] = useState('');
  const [pincode,setPincode]  = useState('');
  const [address,setAddress] = useState('')
  const [phone,setPhone] = useState('')

  const [loading,setLoading] = useState(false)

  const isDisabled = !company || !industry || !employees || !designation || !pincode || !address || !phone ;

  async function UpdateAllDetails(e:any){
    e.preventDefault()
    setLoading(true)
    try{
      const Updating = await axios({
        url:'http://localhost:3000/user/employPostDetails',
        method:'POST',
        data:{
          email,
          designation,
          hiringfor,
          industry,
          phone,
          pincode,
          address,
          employees,
          company
        }
      })

      if(Updating.data && Updating.data.ok){
          setSuccessPage(true)
      }
    }
    catch(err){
      console.log(err);
    }
    finally{
      setLoading(false)
    }
  }
  return (
    <div className="w-full my-15 max-w-lg mx-auto bg-white shadow-md rounded-2xl p-8">
      {/* Icon */}
      <div className="flex justify-center mb-4">
        <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
          {/* Replace with your image if needed */}
          <span className="text-3xl">🏢</span>
        </div>
      </div>

      <p className="text-center text-gray-600 mb-6 font-thin text-sm">
        We use this information to know about the company you're hiring for and to generate an invoice
      </p>

      {/* Radio buttons */}
      <div className="flex flex-col gap-1 mb-6 justify-center">
         <h1 className="text-sm font-medium text-gray-700">Hiring for</h1>
         <div className="flex gap-6 items-center">
        <label onClick={()=> setHiringFor('your company')} className="flex items-center gap-2">
          <input type="radio" name="hiringFor" className="accent-blue-500 h-4 w-4" checked={hiringfor==='your company'} />
          <span className="text-gray-700">your company</span>
        </label>
        <label  onClick={()=> setHiringFor('a consultancy')} className="flex items-center gap-2">
          <input type="radio" name="hiringFor" checked={hiringfor==='a consultancy'}  className="accent-blue-500 h-4 w-4" />
          <span className="text-gray-700">a consultancy</span>
        </label>
         </div>
       
      </div>

      {/* Form */}
      <form onSubmit={UpdateAllDetails}  className="space-y-7">
        {/* Enter company name */}
        <div>
          <label className="text-gray-700 text-sm mb-1 block font-medium">Company</label>
          <input   required onChange={(e)=> setCompany(e.target.value)} type="text" className="w-full border rounded-lg p-3 outline-none focus:ring focus:ring-blue-200" placeholder="Enter company name" />
        </div>

        {/* Enter phone no */}

        <div>
          <label className="text-gray-700 text-sm mb-1 block font-medium">Phone</label>
          <input required onChange={(e)=> setPhone(e.target.value)} type="text" className="w-full border rounded-lg p-3 outline-none focus:ring focus:ring-blue-200" placeholder="Enter mobile no." />
        </div>

         {/* Enter industry */}
        <div>
          <label className="text-gray-700 text-sm mb-1 block  font-medium">Select industry</label>
          <select   required  onChange={(e)=> setIndustry(e.target.value)} className="w-full border rounded-lg p-3 outline-none focus:ring focus:ring-blue-200">
            <option hidden value="">Select industry</option>
            <option value="aman">aman</option>
          </select>
        </div>

        {/* Enter select employees */}
        <div>
          <label className="text-gray-700 text-sm mb-1 block  font-medium">Number of employees</label>
          <select   required onChange={(e)=> setEmployees(e.target.value)} className="w-full border rounded-lg p-3 outline-none focus:ring focus:ring-blue-200">
            <option hidden value="">Select range</option>
            <option value="ishan">ishan</option>
          </select>
        </div>

        {/* Enter designation */}

        <div>
          <label className="text-gray-700 text-sm mb-1 block  font-medium">Your designation</label>
          <input    required onChange={(e)=> setDesignation(e.target.value)} type="text" className="w-full border rounded-lg p-3 outline-none focus:ring focus:ring-blue-200" placeholder="Enter designation" />
        </div>

        {/* Enter pincode */}

        <div>
          <label className="text-gray-700 text-sm mb-1 block  font-medium">Pin code</label>
          <input  required onChange={(e)=> setPincode(e.target.value)} type="text" className="w-full border rounded-lg p-3 outline-none focus:ring focus:ring-blue-200" placeholder="Enter company pincode" />
        </div>

        {/* Enter company address */}

        <div>
          <label className="text-gray-700 text-sm mb-1 block  font-medium">Company address</label>
          <textarea  onChange={(e)=> setAddress(e.target.value)} className="w-full border rounded-lg p-3 outline-none focus:ring focus:ring-blue-200" placeholder="Enter company address" ></textarea>
        </div>

        {/* Button */}
        <button
          disabled={isDisabled}
          type="submit"
          className={`w-full  ${!isDisabled ? 'text-white hover:bg-blue-700 cursor-pointer bg-blue-500':'cursor-not-allowed bg-gray-400 text-slate-500'} font-medium py-3 rounded-lg`}
        >
          {loading ? <Spinner/>:"Continue"}
        </button>
      </form>
    </div>
  );
};

// Progress bar..

const StepIndicator = ({showNext}:any) => {
  return (
    <div className="flex items-center gap-6 w-full justify-center py-4">
      
      {/* Step 1 - Completed */}
      <div className="flex items-center gap-2">
        <div className={`w-5 h-5 rounded-full  ${showNext ? 'bg-green-500':''} flex items-center justify-center`}>
          {!showNext && <div className="w-5 h-5 rounded-full border-4 border-blue-500 flex items-center justify-center">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
        </div>}
          {showNext && <span className="text-white text-xs">✓</span>
          }
        </div>
        <span className="text-gray-700 font-medium">Basic details</span>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-300 w-24"></div>

      {/* Step 2 - Current */}
      <div className="flex items-center gap-2">
        {!showNext && <div className="w-5 h-5 rounded-full bg-gray-400 flex items-center justify-center">
        
        </div>}

        {showNext && <div className="w-5 h-5 rounded-full border-4 border-blue-500 flex items-center justify-center">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
        </div>}
        
        <span className={`${showNext ? "text-blue-500":"text-slate-500"} font-medium`}>Company details</span>
      </div>

    </div>
  );
};


// After employer created


const SuccessScreen = () => {
  const [showTick, setShowTick] = useState(false);

  useEffect(() => {
    // Tick delay for animation feel
    setTimeout(() => setShowTick(true), 600);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 text-center">
      
      {/* Celebration circle animation */}
      <div
        className={`w-32 h-32 rounded-full bg-green-500 flex items-center justify-center shadow-xl transition-all duration-500 ${
          showTick ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
      >
        {/* Tick icon */}
        <span
          className={`text-white text-5xl transition-all duration-500 ${
            showTick ? "scale-100 opacity-100" : "scale-0 opacity-0"
          }`}
        >
          ✓
        </span>
      </div>

      <h1 className="text-3xl font-semibold mt-6">Congratulations</h1>
      <p className="text-gray-600 mt-2">
        Your Naukri recruiter account is created!
        <br />
        Go ahead & explore our range of hiring plans.
      </p>

      <button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg shadow-md transition-all">
        Explore plans
      </button>
    </div>
  );
};







const OTP_Popup = ({onClose,OTP,setOTP,email,setShowNext}:any) => {
    
  
    const [otp,setOtp] = useState(['','','','','','']);
    const [msg,setMsg] = useState('');
 

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
        SendVerifyEmail();
        onClose();
        setShowNext(true);
       
       
    }
  }

  async function SendVerifyEmail(){
    try{
         const Sending =  await axios({
            url:`http://localhost:3000/user/emailVerify?email=${email}`,
             method:'GET'
          })

        

    }
    catch(err){
      console.log(err)
    }
  }

  const [time,setTime] = useState(60);
  useEffect(()=>{
     if(time<=0){
        setOTP('Nootp');
        return ;
     } 

     const Interval = setInterval(()=>{
      setTime(prev => prev-1);
     },1000)

     return ()=> clearInterval(Interval)
  },[time])

  async function ResendOTP(){
         try{
          const Getting = await axios({
            url:'http://localhost:3000/user/employEmailVerify',
            method:'POST',
            data:{
                email
            },
            
          })
          if(Getting.data && Getting.data.otp){
               setOTP(Getting.data.otp)
               setTime(60)
               
          }
    }
    catch(err){
       console.log(err)
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

        <div className="flex justify-center text-blue-500 font-medium text-lg">
         {time>0 ? `Resend in :- ${time} secs`:<span onClick={ResendOTP} className="hover:underline cursor-pointer">Resend OTP</span>}
        </div>
        

        {/* Verify Button */}
        <button onClick={VerifyOtp} disabled={otp.includes('')} className={`w-full   py-3 rounded-lg font-semibold  transition ${otp.includes('') ? 'cursor-not-allowed bg-gray-20 text-slate-500':'text-white bg-blue-600 hover:bg-blue-700'} shadow-md`}>
          Verify & Continue
        </button>

        <div className="flex justify-center text-green-400">
          {msg}
        </div>


       
      </div>
    </div>
  );
};

export default CompanyRegistration;