import { Spinner } from "@/components/loader"
import axios from "axios"
import { ArrowBigRight, Bookmark, EyeOff, Star } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { timeAgo } from "./IdBasedJob"
import { MdArrowOutward } from "react-icons/md"

export default function SavedJobs(){


    const [savedjobs,setJobs] = useState([])
    const [loading,setLoading] = useState(true)
    async function Getting_SavedJobs(){
        try{
            const Jobs = await axios({
                url:'http://localhost:3000/user/getSavedJobs',
                method:'GET',
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })

            if(Jobs.data && Jobs.data.jobs){
                 setJobs(Jobs.data.jobs)
            }
            setLoading(false)
        }
        catch(err){
            console.log(err)
            setLoading(false)
        }
    }

    useEffect(()=>{
        Getting_SavedJobs()
    },[])

    if(loading){
        return <div className="w-full h-screen flex justify-center items-center">
            <Spinner/>
        </div>
    }
    return <div className="min-h-screen font-aman  p-20  bg-gray-100">

{/* left div */}
        <div className="w-[60%] ml-20">
{/* Jobs saved by you */}
        <div className="flex flex-col gap-2">
           <h1 className="text-2xl font-semibold">Jobs saved by you</h1>
           <div className="bg-white rounded-2xl p-7 shadow-lg">
            <p className="text-slate-500 flex items-end gap-3"><span className="font-semibold text-3xl text-black">{savedjobs.length}</span>Saved Jobs(s)</p>

           </div>
        </div>

     {/* Rendering saved jobs */}
            <div className="flex mt-5 flex-col gap-4">
                {
                    savedjobs.length > 0 &&  savedjobs.map((each:any) => {
                        return <JobCard reloadJobs={Getting_SavedJobs} jobId={each.id} currency={each.currency} company={each.company} jobTitle={each.title} location={each.location} createdAt={each.createdAt} experience={each.experience} skills={each.skills} jobDescription={each.description} salary={each.salary}/>
                          
                    })
                }

                {
                    savedjobs.length===0 && <div className="text-4xl bg-white h-[100px] flex justify-center items-center rounded-2xl font-medium">
                        Not Saved Jobs Yet
                    </div>
                }

              

            </div>

        </div>

        <div className="w-[40%]"></div>

    </div>
}


function JobCard({reloadJobs,jobId,jobTitle,company,experience,salary,location,currency,skills,jobDescription,createdAt}:any) {
  const navigate = useNavigate()
  console.log("This is jobId " + jobId)

  async function Unsave_A_Job(){
    try{
         const UnSaving = await axios(({
            url:'http://localhost:3000/user/unsaveJob',
            data:{
                jobId
            },
            method:'DELETE',
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
         }))

         if(UnSaving.data && UnSaving.data.ok){
             reloadJobs()
         }


    }
    catch(err){
        console.log(err)
    }
  }
  return (
    <div
    
    className="bg-white cursor-pointer rounded-2xl border border-gray-200 p-5 flex justify-between gap-4 hover:shadow-md transition">
      
      {/* LEFT */}
      <div className="flex gap-4">
      

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
            <span className="flex items-center gap-1">🧳 {experience + " yrs" }</span>
            <span className="flex items-center gap-1">💰 {currency + " " + salary }</span>
            <span className="flex items-center gap-1">📍 {location }</span>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-2">
            {jobDescription || `Preferred candidate profile · Any Graduate · Experience in writing
            automation test cases...`}
          </p>

          {/* Skills */}
          <div className="flex flex-wrap gap-3 text-sm text-slate-600">
            {skills.map((skill:string) => (
              <span key={skill} className="hover:underline px-3 py-1 rounded-2xl bg-gray-100 cursor-pointer">
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
         <button onClick={()=> navigate(`/IamUser/recommendedJobs/${jobId}`)}>
            <MdArrowOutward className="text-xl text-black cursor-pointer hover:scale-110" />
         </button>
          <button
          onClick={Unsave_A_Job}
          className="flex items-center gap-1 cursor-pointer  hover:text-gray-800">
            <Bookmark className="text-black" size={16} /> Unsave
          </button>
        </div>
      </div>
    </div>
  );
}