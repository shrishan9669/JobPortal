
import axios from "axios";
import { Bookmark, ChevronDown, EyeOff, Star, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";

import { Spinner } from "@/components/loader";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
export default function RecommendedJobs(){

    const [jobType,setJobType] = useState('profile');
    const [recommendedJobs,setJobs] = useState([])
    const [loading,setLoading] = useState(true)
    const [extrajobs,setExtraJobs] = useState([])
    const [loadingExtra,setLoadingExtra] = useState(true)
    const [showPopup,setPopUp] = useState(false)
    
    const[prefRole,setPrefRole] = useState([]);
    const[prefLocation,setPrefLocation] = useState([]);
    const[prefSalary,setPrefSalary] = useState('')

    const apiKey = import.meta.env.VITE_JSEARCH_KEY


    async function FetchJobs(){
        
        try{
           const responseJobs = await axios({
            url:'https://jsearch.p.rapidapi.com/search',
            params:{
                query: "software engineer OR data analyst",
                country:'in',
                page: 1,
                num_pages: 5,
            },
            headers:{
                "X-RapidAPI-Key": apiKey,
                "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
            }
           })

           setExtraJobs(responseJobs.data.data || [])
           setLoadingExtra(false)
        }
        catch(err){
            console.log(err)
            setLoadingExtra(false)
        }
        
    }


    async function GettingJobs(){
        try{
            const Jobs = await axios({
                url:'http://localhost:3000/user/recommendedJobs',
                method:'GET',
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })

            if(Jobs.data && Jobs.data.ok){
                setJobs(Jobs.data.matchedJobs)
            }
            setLoading(false)

        }
        catch(err){
             console.log(err)
        }
    }

    useEffect(()=>{
       GettingJobs()
     
    },[])

    if(loading){
        return <div className="font-bold h-screen w-screen flex justify-center items-center text-blue-600">
            <Spinner
            />
        </div>
    }
       return  <div className="pt-20 font-aman">

        {/* Recommended for you Jobs */}

        <div className="flex flex-col gap-3 border-b ">
        <div className="flex mx-30 items-center justify-between">
            <h1 className="font-medium text-xl">Recommended jobs for you</h1>
            <button className="px-3 py-1 rounded-2xl bg-black text-white" onClick={GettingJobs}>Reload Jobs</button>
            <div className="flex items-center gap-3">
                <h1 className="font-medium">You can select upto 5 jobs to apply</h1>
                <span className="bg-blue-500 px-4 py-1 rounded-2xl text-white font-medium">Apply</span>
            </div>
        </div> 

         <div className="mx-30">
            <div className="flex gap-7 items-center">
                <span onClick={()=> setJobType('profile')} className={`${jobType==='profile' ? 'text-black  border-b-3 border-black':'text-slate-500'} font-medium py-3 cursor-pointer`}>Profile {"("+recommendedJobs.length + ")"}</span>
                <span onClick={()=> setJobType('extra')} className={`${jobType!=='profile' ? 'text-black  border-b-3  border-black':'text-slate-500'} font-medium py-3  cursor-pointer`}>Preferences {"("+extrajobs.length + ")"}</span>
            </div>
         </div>

        </div>


        {/* Jobs Div */}

        {jobType==='profile' ?  <div className="w-full px-30 py-18  justify-center flex gap-5 bg-gray-50">
            {/* Left div Jismein Jobs dikhengi */}
            <div className="flex flex-col gap-4">
                {
                    recommendedJobs.length > 0 &&  recommendedJobs.map((each:any) => {
                        return <JobCard saved={each.saved} reloadJob={GettingJobs} jobId={each.id} currency={each.currency} company={each.company} jobTitle={each.title} location={each.location} createdAt={each.createdAt} experience={each.experience} skills={each.skills} jobDescription={each.description} salary={each.salary}/>
                          
                    })
                }

              

            </div>

            {/* Right div preferences dalne ke liye */}
            <div>
               <PreferencesCard setPopup={setPopUp}/>
            </div>
        </div>:<ExtraJobsApi loading={loadingExtra} extraJobs={extrajobs}/>}
       
        

        {showPopup && <PreferencesDiv setPrefLocation={setPrefLocation} setPrefRole={setPrefRole} setPrefSalary={setPrefSalary} prefLocation={prefLocation} prefRole={prefRole} prefSalary={prefSalary} onClose={()=> setPopUp(false)}/>}
       </div>
}



import {timeAgo} from './IdBasedJob'

function JobCard({reloadJob,jobId,jobTitle,company,experience,salary,location,currency,skills,jobDescription,saved,createdAt}:any) {
  const navigate = useNavigate()
  console.log("This is jobId " + jobId)

  async function Save_A_Job(){
    try{
      const Saving = await axios({
        url:'http://localhost:3000/user/savingAJob',
        method:'POST',
        data:{
          employeeEmail:localStorage.getItem('email'),
          jobId:jobId
        },
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })

      if(Saving.data && Saving.data.ok){
         reloadJob()
      }
    }
    catch(err){
      console.log(err)
    }
  }
  return (
    <div
    onClick={()=> navigate(`/IamUser/recommendedJobs/${jobId}`)}
    className="bg-white cursor-pointer rounded-2xl border border-gray-200 p-5 flex justify-between gap-4 hover:shadow-md transition">
      
      {/* LEFT */}
      <div className="flex gap-4">
        {/* Checkbox */}
        <input type="checkbox" className="mt-1 accent-blue-600" />

        <div className="space-y-2">
          {/* Job Title */}
          <h2 className="text-lg font-semibold text-gray-900">
            {jobTitle || "Mumbai - QA - Software Testers" }
          </h2>

          {/* Company + Rating */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-medium">{company || "Jforce Solutions"}</span>
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span>2.7</span>
            <span className="text-gray-400">| 26 Reviews</span>
          </div>

          {/* Job Meta */}
          <div className="flex flex-wrap gap-6 text-sm text-gray-600 mt-2">
            <span className="flex items-center gap-1">🧳 {experience || "0–2 Yrs"}</span>
            <span className="flex items-center gap-1">💰 {currency + " " + salary || "₹ 2.5–5 Lacs PA"}</span>
            <span className="flex items-center gap-1">📍 {location || "Mumbai"}</span>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-2">
            {jobDescription || `Preferred candidate profile · Any Graduate · Experience in writing
            automation test cases...`}
          </p>

          {/* Skills */}
          <div className="flex flex-wrap gap-3 text-sm text-blue-600">
            {skills.map((skill:string) => (
              <span key={skill} className="hover:underline cursor-pointer">
                {skill}
              </span>
            ))}
          </div>

          {/* Posted Time */}
          <p className="text-xs text-gray-400">{timeAgo(createdAt) || "2 Days Ago"}</p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col items-end justify-between">
        {/* Company Logo */}
        <img
          src="/vite.svg"
          alt="company"
          className="w-12 h-12 rounded-xl object-contain border"
        />

        {/* Actions */}
        <div className="flex gap-4 text-sm text-gray-500">
          <button className="flex items-center gap-1 hover:text-gray-800">
            <EyeOff size={16} /> Hide
          </button>
          <button
          onClick={()=>{
            if(!saved){
              Save_A_Job()
            }
          }}
          className="flex items-center gap-1 hover:text-gray-800">
            <Bookmark className={`${saved ? 'text-black ':''}`} size={16} /> {saved ? 'saved':'save'}
          </button>
        </div>
      </div>
    </div>
  );
}


 function PreferencesCard({setPopup}:any) {
    
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 w-full max-w-md">
      
      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Add preferences to get matching jobs
      </h2>

      {/* Preferred Job Role */}
      <div className="mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <span>Preferred job role</span>
          <Pencil onClick={()=> setPopup(true)} className="w-4 h-4 text-blue-600 cursor-pointer" />
        </div>
        <button onClick={()=> setPopup(true)} className="px-5 py-1.5 rounded-full border border-blue-600 text-blue-600 text-sm font-medium hover:bg-blue-50 transition">
            Add
        </button>
       
      </div>

      {/* Preferred Work Location */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">
          Preferred work location
        </p>

        <button onClick={()=> setPopup(true)} className="px-5 py-1.5 rounded-full border border-blue-600 text-blue-600 text-sm font-medium hover:bg-blue-50 transition">
          Add
        </button>

        
      </div>

      {/* Preferred Salary */}
      <div>
        <p className="text-sm text-gray-600 mb-2">
          Preferred salary
        </p>

       
        <button onClick={()=> setPopup(true)} className="px-5 py-1.5 rounded-full border border-blue-600 text-blue-600 text-sm font-medium hover:bg-blue-50 transition">
          Add
        </button>

        
      </div>


       
    </div>
  );
}

function PreferencesDiv({onClose,setPrefRole,setPrefSalary,setPrefLocation,prefSalary,prefLocation,prefRole}:any){

      const jobRoles = [
  "Software Engineer",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Web Developer",
  "React Developer",
  "Node.js Developer",
  "Java Developer",
  "Python Developer",
  "PHP Developer",
  ".NET Developer",
  "Android Developer",
  "iOS Developer",
  "Flutter Developer",
  "Mobile App Developer",
  "Game Developer",
  "AI Engineer",
  "Machine Learning Engineer",
  "Data Scientist",
  "Data Analyst",
  "Business Intelligence Analyst",
  "DevOps Engineer",
  "Cloud Engineer",
  "AWS Engineer",
  "Azure Engineer",
  "Cyber Security Engineer",
  "Blockchain Developer",
  "QA Engineer",
  "Software Tester",
  "Automation Tester",
  "SDET",
  "Software Architect",
  "Technical Lead",
  "CTO",
  "Product Manager",
  "Associate Product Manager",
  "Project Manager",
  "Program Manager",
  "Scrum Master",
  "Business Analyst",
  "Product Owner",
  "UI Designer",
  "UX Designer",
  "UI/UX Designer",
  "Graphic Designer",
  "Motion Graphics Designer",
  "Video Editor",
  "Animator",
  "3D Artist",
  "VFX Artist",
  "Content Creator",
  "Creative Director",
  "Sales Executive",
  "Sales Manager",
  "Business Development Executive",
  "Business Development Manager",
  "Inside Sales Specialist",
  "Pre-Sales Consultant",
  "Marketing Executive",
  "Marketing Manager",
  "Digital Marketing Executive",
  "Digital Marketing Manager",
  "SEO Specialist",
  "SEM Specialist",
  "SMM Specialist",
  "Email Marketing Specialist",
  "Affiliate Marketing Specialist",
  "Growth Hacker",
  "Content Writer",
  "Copywriter",
  "Social Media Manager",
  "Brand Manager",
  "HR Executive",
  "HR Manager",
  "Talent Acquisition Specialist",
  "Recruiter",
  "IT Recruiter",
  "Payroll Specialist",
  "Training and Development Manager",
  "Accountant",
  "Chartered Accountant",
  "Finance Manager",
  "Financial Analyst",
  "Investment Analyst",
  "Audit Executive",
  "Operations Executive",
  "Operations Manager",
  "Customer Support Executive",
  "Customer Success Manager",
  "Technical Support Engineer",
  "MIS Executive",
  "Data Entry Specialist",
  "Office Administrator",
  "Mechanical Engineer",
  "Civil Engineer",
  "Electrical Engineer",
  "Electronics Engineer",
  "Chemical Engineer",
  "Automobile Engineer",
  "Aerospace Engineer",
  "Structural Engineer",
  "Quality Control Engineer",
  "R&D Engineer",
  "Plant Engineer",
  "Teacher",
  "Professor",
  "Lecturer",
  "Trainer",
  "Counselor",
  "Instructional Designer",
  "Logistics Executive",
  "Supply Chain Manager",
  "Warehouse Manager",
  "Procurement Executive",
  "Purchase Manager",
  "Export Import Specialist"
      ];
       const topITLocationsIndia = [
  "Bangalore",
  "Hyderabad",
  "Pune",
  "Chennai",
  "Gurgaon",
  "Noida",
  "Delhi",
  "Mumbai",
  "Navi Mumbai",
  "Thane",
  "Kolkata",
  "Ahmedabad",
  "Vadodara",
  "Indore",
  "Jaipur",
  "Chandigarh",
  "Mohali",
  "Trivandrum",
  "Kochi",
  "Coimbatore",
  "Madurai",
  "Salem",
  "Vijayawada",
  "Visakhapatnam",
  "Bhubaneswar",
  "Bhopal",
  "Nagpur",
  "Nashik",
  "Aurangabad",
  "Mysore",
  "Hubli",
  "Belgaum",
  "Mangalore",
  "Udupi",
  "Udaipur",
  "Jodhpur",
  "Ujjain",
  "Gwalior",
  "Raipur",
  "Ranchi",
  "Patna",
  "Lucknow",
  "Kanpur",
  "Prayagraj",
  "Varanasi",
  "Dehradun",
  "Haridwar",
  "Shimla",
  "Una",
  "Solan"
      ];

    return <div className="fixed   inset-0 flex font-aman items-center justify-center bg-black/80  z-50">
        <div className="bg-white no-scrollbar zoom-in max-h-[600px] overflow-y-auto rounded-4xl flex flex-col gap-10 shadow-md p-8 w-xl mx-auto">

                       <div className="flex justify-end items-center">
                                       <IoMdClose onClick={onClose} className="text-xl cursor-pointer hover:text-slate-500"/>
                        </div>

                        {/* Preferred Job Role */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Preferred Job Role <span className="text-gray-500">(Max 3)</span>
          </label>

          {
            prefRole.map((each:any)=> {
                return <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 text-sm font-medium">{each}   <X
                onClick={()=> setPrefRole((prev:[]) => (prev.filter(eachI => eachI!==each)))}
                className="w-4 h-4 cursor-pointer text-gray-600" /></span>
            })
          }

           <select 
           onChange={(e)=> {
            if(prefRole.length<3){
                const exist = prefRole.some((each:string) => each===e.target.value)
                if(!exist){
                    setPrefRole((prev:[]) => ([...prev,e.target.value]))
                }
            }
                
           

           }}
           name="" id="" className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
            <option value="" hidden>Select Role</option>

            {
                jobRoles.map(each => {
                    return <option value={each}>{each}</option>
                })
            }
           </select>
         

          
        </div>

        {/* Preferred Salary */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Preferred Salary
          </label>

          <div className="flex gap-2">
            <div className="flex items-center gap-1 border border-gray-300 rounded-full px-4 py-2">
              <span className="text-sm">₹</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>

            <input
            onChange={(e)=> setPrefSalary(e.target.value)}
              type="text"
              defaultValue="4,50,000"
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Preferred Work Location */}
        <div className="mb-20">
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Preferred Work Locations <span className="text-gray-500">(Max 10)</span>
          </label>


        {
            prefLocation.map((each:any)=> {
                return <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 text-sm font-medium">{each}   <X
                onClick={()=> setPrefLocation((prev:[]) => (prev.filter(eachI => eachI!==each)))}
                className="w-4 h-4 cursor-pointer text-gray-600" /></span>
            })
          }

           <select 
           onChange={(e)=> {
            if(prefRole.length<10){
                const exist = prefLocation.some((each:string) => each===e.target.value)
                if(!exist){
                    setPrefLocation((prev:[]) => ([...prev,e.target.value]))
                }
              
            }
           

           }}
           name="" id="" className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
            <option value="" hidden>Select Location</option>

            {
                topITLocationsIndia.map(each => {
                    return <option value={each}>{each}</option>
                })
            }
           </select>

        </div>

        {/* Footer buttons */}
        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t flex gap-3 justify-center">
          <button className="bg-blue-600 text-white px-10 py-2 rounded-full font-medium hover:bg-blue-700 transition">
            Save
          </button>
          <button className="border border-blue-600 text-blue-600 px-10 py-2 rounded-full font-medium hover:bg-blue-50 transition">
            Cancel
          </button>
        </div>


        </div>
    </div>
}

function ExtraJobsApi({loading,extraJobs}:any){

    
    

    if(loading){
         return <div className="p-4"><Spinner/></div>;
    }

    return <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Recommended Jobs</h1>

      {extraJobs.map((job: any,ind:any) => (
        <div
          key={job.job_id}
          className="bg-white p-4 rounded-xl shadow-md space-y-2"
        >
            <img
            src={job.employer_logo || '/vite.svg'}
            alt="Logo"
            className="w-14 h-14 rounded-xl object-cover bg-gray-100"
            />
            <h1>No:{ind+1}</h1>
          <h2 className="font-semibold text-lg">{job.job_title}</h2>
          <p className="text-gray-600">{job.employer_name}</p>

          <p className="text-sm text-gray-500">
            {job.job_city}, {job.job_state}, {job.job_country}
          </p>

          <p className="text-sm text-gray-600 line-clamp-3">
            {job.job_description}
          </p>

          <a
            href={job.job_apply_link}
            target="_blank"
            className="mt-3 inline-block text-blue-600 hover:underline"
          >
            Apply Now →
          </a>
        </div>
      ))}
    </div>
}

