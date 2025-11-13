import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaCheck } from 'react-icons/fa';
import axios from 'axios';
import BarLoader from './loader';

const NaukriRegister = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    mobile: '',
    workStatus: 'experienced',
    promotions: true
  });
  
  function AllFilled(){
    if(!formData.fullName || !formData.mobile || !formData.password || !formData.email || !formData.workStatus  || !currCity){
      return false
    } else return true;
  }
  const [showPassword, setShowPassword] = useState(false);
  const [loader,setLoader] = useState(false)
  const handleChange = (e:any) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async(e:any) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setLoader(true)

    try{
       const SendingData = await axios({
      url:'http://localhost:3000/user/UserCreate',
      method:"POST",
      data:{
        name:formData.fullName,
        email:formData.email,
        password:formData.password,
        phone:formData.mobile,
        location:currCity,
        experience:formData.workStatus
      }
    })
      console.log(SendingData.data)
      if(SendingData && SendingData.data){
         window.location.href = '/signup/addEducation'
      }
    }
    catch(err){
      console.log("Error while creating User " + err)
    }
    finally{
      setLoader(false)
    }
  
    // Handle form submission here
  };


//  City lists

let cities = [
  "New Delhi",
  "Bengaluru",
  "Mumbai", 
  "Pune",
  "Chennai",
  "Hyderabad",
  "Gurugram",
  "Noida",
  "Ahmedabad",
  "Kolkata"
];



const [currCity,setCurCity] = useState('');
const [cityarr,setCityArr] = useState(['']);

function AddCity(e:any){

  setCityArr([e]);

}

  return (
    <div className="min-h-screen font-aman flex gap-10 justify-center  bg-gray-50 items-start   p-4">

        {/* Left chota div */}

       
        <div className="bg-white sticky border mt-30 flex items-center flex-col border-slate-300 rounded-lg p-6 max-w-md">
            <img src="https://static.naukimg.com/s/0/0/i/role-collection-ot.png" className='translate-x-[110px]' alt="" />

            <div>
                 <h3 className="text-lg font-bold flex justify-center text-gray-800 mb-4">
    On registering, you can
  </h3>
  
  <ul className="space-y-3 text-sm flex flex-col items-center">
    <li className="flex items-start  gap-3">
      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
        <span className="text-white text-xs">●</span>
      </div>
      <span className="text-gray-700 font-medium max-w-60">
        Build your profile and let recruiters find you
      </span>
    </li>
    
    <li className="flex items-start gap-3">
      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
        <span className="text-white text-xs">●</span>
      </div>
      <span className="text-gray-700 font-medium max-w-60">
        Get job postings delivered right to your email
      </span>
    </li>
    
    <li className="flex items-start gap-3">
      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
        <span className="text-white text-xs">●</span>
      </div>
      <span className="text-gray-700 font-medium max-w-60">
        Find a job and grow your career
      </span>
    </li>
  </ul>
 
            </div>
      </div>



      <div className=" w-[60%] bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className=" p-6 ">
          <h1 className="text-2xl font-bold">Create your Naukri profile</h1>
          <p className="text-slate-500 mt-2">Search & apply to jobs from India's No.1 Job Site</p>
        </div>

        {/* Form */}

        <div className='flex items-start pr-4 '>

             <form onSubmit={handleSubmit} className="p-6  space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full name<span className='text-red-500'>*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="What is your name?"
              className="w-[90%] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            />
          </div>

          {/* Email */}
          <div className='w-[90%]'>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email ID<span className='text-red-500'>*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Tell us your Email ID"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              We'll send relevant jobs and updates to this email
            </p>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password<span className='text-red-500'>*</span>
            </label>
            <div className="relative w-[90%] ">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="(Minimum 6 characters)"
                className=" w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition pr-10"
                
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              This helps your account stay protected
            </p>
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mobile number<span className='text-red-500'>*</span>
            </label>
            <div className="flex w-[90%]">
              <div className="flex items-center px-3 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50">
                <span className="text-gray-600">+91</span>
              </div>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter your mobile number"
                className="flex-1 px-4 w-full py-3 border  border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Recruiters will contact you on this number
            </p>
          </div>

          {/* Work Status */}
          <div className=''>
            <label className="block text-sm font-bold mb-3">
              Work status<span className='text-red-500'>*</span>
            </label>
            <div className=" flex items-center gap-5">
              <label className={`flex border ${formData.workStatus==='experienced' ? 'border-black':'border-slate-300   '}  p-4 rounded-2xl items-center space-x-3 cursor-pointer`}>
                <div className="relative">
                  <input
                    type="radio"
                    name="workStatus"
                    value="experienced"
                    checked={formData.workStatus === 'experienced'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
                    formData.workStatus === 'experienced' 
                      ? 'border-blue-600 bg-blue-600' 
                      : 'border-gray-300'
                  }`}>
                    {formData.workStatus === 'experienced' && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                </div>
                <div className='flex flex-col'>
                    <span className="font-bold">
                  I'm experienced
                    </span>
                <span className="text-xs text-gray-500">I have work experience (excluding internships)</span>
                </div>
               
              </label>
              
              <label className={`flex border ${formData.workStatus==='fresher' ? 'border-black':'border-slate-300   '}  p-4 rounded-2xl items-center space-x-3 cursor-pointer`}>
                <div className="relative">
                  <input
                    type="radio"
                    name="workStatus"
                    value="fresher"
                    checked={formData.workStatus === 'fresher'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
                    formData.workStatus === 'fresher' 
                      ? 'border-blue-600 bg-blue-600' 
                      : 'border-gray-300'
                  }`}>
                    {formData.workStatus === 'fresher' && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                </div>
                <div className='flex flex-col'>
                    <span className="font-bold">
                  I'm a fresher
                </span>
                <span className="text-xs text-gray-500">I am a student/ Haven't worked after graduation</span>
                </div>
              </label>
            </div>

            {/* If fresher or experienced selected */}

            <div className='w-[50%] mt-6'>

                <div className='flex flex-col justify-between'>
                    <span className='font-bold'>Current city<span className='text-red-500'>*</span></span>

                    <div className='mb-6 mt-2'>
                      {cityarr[0] &&
                        cityarr.map((e:any)=>{
                          return <span
                          onClick={()=>{
                            AddCity('')
                            setCurCity('');
                          }}
                          className='px-3 py-2 bg-blue-100 font-medium text-sm rounded-full'>{e} <span className='font-bold text-xl cursor-pointer'>x</span></span>
                        })
                      }
                    </div>
                </div>

                <div>
                    <input 
                    onChange={(e)=> setCurCity(e.target.value)}
                    type="text" placeholder='Mention the city you live in' className='w-full p-3 text-sm rounded-2xl border border-slate-300' />
                    <button className={`px-3 py-1 ${currCity  ? 'bg-blue-100 font-medium cursor-pointer':'bg-slate-400'} rounded-full mt-2 text-slate-800`}
                    
                    onClick={(e)=>{
                      e.preventDefault()
                      AddCity(currCity)
                    }}
                    >Add+</button>
                </div>

                <div className='flex flex-col mt-3 gap-3'>
                    <span className='text-slate-500 text-sm'>Suggestions:</span>
                    <div className='flex gap-3 flex-wrap'>
                    {
                        cities.map((each:any)=>{
                            return <button
                            onClick={(e)=>{
                              e.preventDefault()
                              setCurCity(each);
                              AddCity(each);
                            }}
                            className='border cursor-pointer hover:bg-blue-100 hover:text-blue-500 rounded-full border-slate-300 text-slate-500 px-3 py-2'>{each + "+"}</button>
                        })
                    }
                    </div>
                   
                </div>
            </div>
          </div>

          {/* Promotions Checkbox */}
          <label className="flex items-start space-x-3 cursor-pointer">
            <div className="relative mt-1">
              <input
                type="checkbox"
                name="promotions"
                checked={formData.promotions}
                onChange={handleChange}
                className="sr-only"
              />
              <div className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
                formData.promotions 
                  ? 'border-blue-600 bg-blue-600' 
                  : 'border-gray-300'
              }`}>
                {formData.promotions && <FaCheck className="text-white text-xs" />}
              </div>
            </div>
            <span className="text-sm text-gray-700">
              Send me important updates & promotions via SMS, email, and WhatsApp
            </span>
          </label>

          {/* Terms */}
          <div className="text-center text-sm text-gray-600">
            <p>
              By clicking Register, you agree to the{' '}
              <a href="#" className="text-blue-600 hover:underline">Terms and Conditions</a>
              {' '}&{' '}
              <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
              {' '}of Naukri.com
            </p>
          </div>

          {/* Submit Button */}
          <button
            
            type="submit"
            disabled={!AllFilled()}
            className={`w-full  text-white font-semibold py-3 px-4 rounded-lg transition duration-200 transform  ${AllFilled() ? 'bg-green-500 cursor-pointer hover:bg-green-600 hover:scale-[1.02]':'bg-slate-400 text-slate-800 cursor-not-allowed'}`}
          >
           {loader ? <BarLoader/>:'Register Now'}
          </button>
        </form>
            {/* Continue with google stuff */}
           <div className='flex items-center gap-5'>
                 <div className='flex flex-col items-center'>
                   <div className="h-23 w-px bg-slate-300"></div>
                    <span className='text-slate-400'>Or</span>
                    <div className="h-23 w-px bg-slate-300"></div>
                 </div>

                 <div >
                    <span>Continue with</span>
                    <button className='flex border cursor-pointer justify-center  border-blue-500 rounded-full px-5 py-2 gap-2 items-center'>
                        <img src="https://cdn3.iconfinder.com/data/icons/logos-brands-3/24/logo_brand_brands_logos_google-512.png" className='w-4 h-4' alt="" />
                        <span className='text-blue-500 font-medium'>Google</span>
                    </button>
                 </div>
           </div>
        </div>
       
      </div>
    </div>
  );
};

export default NaukriRegister;