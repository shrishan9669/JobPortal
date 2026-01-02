import { useParams } from "react-router-dom";
import { Star, Briefcase, IndianRupee, MapPin, Clock, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "@/components/loader";
import {Calendar,Bookmark,ThumbsUp,Check,GraduationCap,User} from 'lucide-react';
interface Job {
  id: number;
  title: string;
  company: string;
  experience: string;
  salary: string;
  location: string;
  createdAt: string;
  openings: number;
  applicationDeadline: Date;
  responsibilities:string[];
  requirements:string[];
  education:string[];
  name:string;
  role:string;
  employmentType:string;
  skills:string[],
  saved:boolean,
  applied:boolean
}

export default function Id_BasedJob(){
    const {id} = useParams();
    const [loading,setLoading] = useState(true)
    const [job,setJob] = useState<Job | null>(null)
    async function GetJobDetail(){
       try{
          const Detail = await axios({
            url:`http://localhost:3000/user/getSpecificJob/${id}`,
           
            method:'GET',
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
          })

          if(Detail.data && Detail.data.ok){
                setJob(Detail.data.newJob)
          }
          setLoading(false)
       }
       catch(err){
          console.log(err);
          setLoading(false)

       }
    }
    useEffect(()=>{
       GetJobDetail()
    },[])

    if(loading){
        return <div className="flex justify-center items-center w-screen h-screen">
              <Spinner/>
        </div>
    }

    
    
    return <div className="bg-gray-100 p-10 flex-col min-h-screen overflow-y-hidden flex justify-center items-center">

         <JobHeaderCard jobApplied={job?.applied} reloadJob={GetJobDetail} jobSaved={job?.saved} jobId={job?.id} skills={job?.skills} jobRole={job?.role} employmentType={job?.employmentType} responsibililities={job?.responsibilities} requirements={job?.requirements} education={job?.education} name={job?.name} jobTitle={job?.title} company={job?.company} experience={job?.experience} salary={job?.salary} location={job?.location} createdAt={job?.createdAt} openings={job?.openings}/>

    </div>

}


// Convert date to example:6 days ago
 export function timeAgo(dateString: string | Date) {
  const now = new Date();
  const past = new Date(dateString);

  const diffMs = now.getTime() - past.getTime();

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  return "Just now";
}

export function JobHeaderCard({
  jobId,
  skills,
  employmentType,
  jobRole,
  name,
  jobTitle,
  company,
  experience,
  salary,
  location,
  createdAt,
  openings,
  responsibililities,
  requirements,
  education,
  jobSaved,
  jobApplied,
  reloadJob
}: any) {

  const [showCover,setShowCover] = useState(false)
  
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

  async function Apply_A_Job(){
    try{

      const Applying = await axios({
        url:'http://localhost:3000/user/createApplicant',
        method:'POST',
        data:{
           jobId,
        },
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })

      if(Applying.data && Applying.data.ok){
        reloadJob()
      }

    }
    catch(err){
      console.log(err)
    }
  }
  return (
    <div className="max-w-4xl mx-auto">
      {/* Main Job Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
        {/* Top Section */}
        <div className="flex justify-between items-start gap-6 mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-gray-900">{jobTitle}</h1>
              <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-md">
                {employmentType}
              </span>
            </div>
            
            <div className="flex items-center gap-3 text-sm text-gray-600 mb-4">
              <span className="font-medium text-gray-700">{company}</span>
              <div className="flex items-center gap-1">
                <Star size={16} className="text-yellow-500 fill-yellow-500" />
                <span>3.6</span>
                <span className="text-blue-600 ml-1">• 62,574 Reviews</span>
              </div>
            </div>

            {/* Job Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="flex items-center gap-2 text-gray-700">
                <Briefcase size={18} className="text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500">Experience</p>
                  <p className="font-medium">{experience} years</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <IndianRupee size={18} className="text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500">Salary</p>
                  <p className="font-medium">{salary}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <MapPin size={18} className="text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="font-medium">{location}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <User size={18} className="text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500">Role</p>
                  <p className="font-medium">{jobRole}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Company Logo */}
          <div className="w-20 h-20 rounded-xl border-2 border-gray-100 bg-gray-50 flex items-center justify-center shadow-sm">
            <img
              src="/vite.svg"
              alt={company}
              className="w-12 h-12 object-contain"
            />
          </div>
        </div>

        {/* Time & Venue Section */}
        <div className="bg-blue-50 rounded-xl p-5 mb-6 border border-blue-100">
          <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar size={20} />
            Interview Time and Venue
          </h2>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 text-gray-700">
              <Clock size={18} className="text-gray-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Schedule</p>
                <p className="text-sm">16th December - 18th December, 9.30 AM - 11.30 AM</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 text-gray-700">
              <MapPin size={18} className="text-gray-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Venue</p>
                <p className="text-sm">SJP2, Mori gate bus stop, Sarjapur Road, Wipro.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 text-gray-700">
              <Phone size={18} className="text-gray-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Contact Person</p>
                <p className="text-sm">{name}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar size={16} className="text-gray-500" />
              <span>Posted: <span className="font-medium text-gray-800">{timeAgo(createdAt)}</span></span>
            </div>
            <div className="w-px h-4 bg-gray-300"></div>
            <div>
              <span>Openings: <span className="font-medium text-gray-800">{openings}</span></span>
            </div>
            <div className="w-px h-4 bg-gray-300"></div>
            <div>
              <span>Applicants: <span className="font-medium text-gray-800">100+</span></span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
            onClick={()=>{
              if(!jobSaved){
                Save_A_Job()
              }
            }}
            className={`px-5 ${jobSaved ? 'border-gray-400 text-slate-500':'border-blue-600 cursor-pointer text-blue-600 hover:bg-blue-50'} py-2.5 rounded-full border  font-medium  transition-colors duration-200 flex items-center gap-2`}>
              <Bookmark size={18} />
              {!jobSaved ? 'Save Job':'Saved'}
            </button>
            <button
            onClick={()=>{
              if(!jobApplied){
                Apply_A_Job()
              }
            }}
           className={`px-5 ${jobApplied ? 'border-gray-400 text-slate-500':'border-blue-600 cursor-pointer text-blue-600 hover:bg-blue-50'} py-2.5 rounded-full border  font-medium  transition-colors duration-200 flex items-center gap-2`}>
              <ThumbsUp size={18} />
              {!jobApplied ? 'Apply Now':'Applied'}
            </button>
          </div>
        </div>
      </div>

      {/* Job Details Section */}
      <div className="space-y-8">
        {/* Job Description */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-8 bg-blue-600 rounded-full"></div>
            <h2 className="text-xl font-bold text-gray-900">Job Description</h2>
          </div>
          
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Role</p>
                <p className="font-medium">{jobRole}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Shift</p>
                <p className="font-medium">Rotational (5 days WFO)</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Location</p>
              <p className="font-medium">{location}</p>
            </div>
          </div>
        </div>

        {/* Responsibilities Section */}
        {responsibililities.length > 0 && 
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-8 bg-green-600 rounded-full"></div>
            <h2 className="text-xl font-bold text-gray-900">Key Responsibilities</h2>
          </div>
          
          <div className="space-y-3">
            {responsibililities.map((each: string, index: number) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600 text-sm font-medium">{index + 1}</span>
                </div>
                <p className="text-gray-700">{each}</p>
              </div>
            ))}
          </div>
        </div>
        }
        

        {/* Requirements Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-8 bg-amber-600 rounded-full"></div>
            <h2 className="text-xl font-bold text-gray-900">Requirements</h2>
          </div>
          
          <div className="space-y-3">
            {requirements.map((each: string, index: number) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check size={14} className="text-amber-600" />
                </div>
                <p className="text-gray-700">{each}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-8 bg-purple-600 rounded-full"></div>
            <h2 className="text-xl font-bold text-gray-900">Education & Qualifications</h2>
          </div>
          
          <div className="space-y-3">
            {education.map((each: string, index: number) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <GraduationCap size={14} className="text-purple-600" />
                </div>
                <p className="text-gray-700">{each}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-8 bg-blue-600 rounded-full"></div>
            <h2 className="text-xl font-bold text-gray-900">Required Skills</h2>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {skills.map((each: string, index: number) => (
              <span
                key={index}
                className="px-4 py-2 bg-blue-50 text-blue-700 font-medium rounded-full border border-blue-100 hover:bg-blue-100 transition-colors duration-200"
              >
                {each}
              </span>
            ))}
          </div>
        </div>

        {/* Employment Details */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Employment Type</p>
              <p className="font-medium text-lg">{employmentType}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Job Role</p>
              <p className="font-medium text-lg">{jobRole}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}







// You'll need to import these additional Lucide icons

