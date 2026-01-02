import { Spinner } from "@/components/loader";
import axios from "axios";
import { Check, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
export default function Application_Page(){
  const [allApplications,setApplications] = useState<any[]>([])
  const [load,setLoad] = useState(false)
    async function GettingApplications(){
      setLoad(true)
        try{

            const Getting_Applied_Jobs = await axios({
                url:"http://localhost:3000/user/getAppliedJob",
                method:'GET',
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })

            if(Getting_Applied_Jobs.data && Getting_Applied_Jobs.data.ok){
                setApplications(Getting_Applied_Jobs.data.jobs)
              
            }
          }
        catch(err){
            console.log(err)
        }
        finally{
          setLoad(false)
        }
    }
    return <div className="pt-20 font-aman">

{/* Application status*/}

        <div className="flex flex-col gap-3 border-b shadow-md">
        <div className="flex mx-30 items-center justify-between">
            <h1 className="font-medium text-xl">Job Application Status</h1>
            <button onClick={GettingApplications} className="px-3 py-1 flex justify-center rounded-2xl bg-black text-white">{load ? <Spinner/>:'Reload'}</button>
            <div className="">
          <div className="flex items-center gap-4">
            {/* Total Applies */}
            <div className="flex  items-center gap-2">
                <div className="font-bold h-full text-5xl">
                    02
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-500">Total</span>
                  <span className="text-slate-500">applies</span>
                </div>
            </div>

            {/* Vertical Line */}

            <div className="h-10 border border-slate-200">

            </div>
            
            {/* Application Updates */}
            <div className="flex items-center gap-2">
                <div className="font-bold text-5xl h-full">
                    02
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-500">Application</span>
                  <span className="text-slate-500">updates</span>
                </div>
            </div>

          </div>
         </div>
        </div> 

         

        </div>


        <AppliedJobUI allApplications={allApplications}/>
    </div>
}




export  function AppliedJobUI({allApplications}:any) {

    const [selectedApplicant,setSelectApplicant] = useState<any>()

   
  return (
    <div className="w-full mt-10 max-w-6xl mx-auto bg-white rounded-xl shadow-sm border flex overflow-hidden">

      {/* LEFT PANEL */}
      <div className="w-[38%] border-r bg-gray-50">

        {/* Tabs */}
        <div className="flex gap-2 p-4">
          <span className="px-3 py-1 text-sm border rounded-full text-gray-500">
            Recruiter Actions (0)
          </span>
          <span className="px-3 py-1 text-sm border rounded-full bg-white font-medium">
            Applies on Naukri ({allApplications.length || "0"})
          </span>
        </div>

        {/* Display Job Cards */}

        <div>
          {
            allApplications.length>0 && allApplications.map((each:any) => {
              return <div className={`${each === selectedApplicant ? 'bg-blue-50':''}`} onClick={()=> setSelectApplicant(each)}>
                <Job_card  jobTitle={each.jobTitle} company={each.company}/>
              </div>
            })
          }
        </div>
      </div>


{selectedApplicant && <DetailsOfEachApplicant status={selectedApplicant.status} appliedOn={selectedApplicant.appliedOn} applicantCount={selectedApplicant.applicantCount} jobTitle={selectedApplicant.jobTitle} company={selectedApplicant.company}/>
      }
      
      
    </div>
  );
}


function Job_card({jobTitle,company}:any){
    return <div className="border hover:bg-blue-50 cursor-pointer mx-4 rounded-lg p-4 mb-4">
          <h3 className="font-semibold text-gray-800">{jobTitle}</h3>
          <p className="text-sm text-gray-600">
            {company} ⭐ 3.6 <span className="text-gray-400">62692 Reviews</span>
          </p>

          <button className="flex items-center px-3 py-1 rounded-2xl bg-gray-200 gap-2 mt-3 text-green-600 text-sm">
            <CheckCircle size={16} />
            Application sent today
          </button>
        </div>
}

function DetailsOfEachApplicant({jobTitle,company,status,applicantCount,appliedOn}:any){
  return <div className="flex-1 p-6">

        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold">{jobTitle}</h2>
            <p className="text-sm text-gray-600">
              {company} ⭐ 3.6 <span className="text-gray-400">62692 Reviews</span>
            </p>
            <a href="#" className="text-blue-600 text-sm mt-1 inline-block">
              View similar jobs
            </a>
          </div>

          <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xl">
            {company[0]}
          </div>
        </div>

        <hr className="my-6" />

        {/* Application Status */}
        <h3 className="font-semibold mb-4">Application status</h3>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 h-[2px] bg-green-500 relative">
            <div className="absolute -top-2 left-0 w-4 h-4 flex justify-center items-center bg-green-500 rounded-full"><Check className="h-3 w-3 text-white "/></div>
            <div className="absolute -top-2 left-1/2 w-4 h-4 flex justify-center items-center bg-green-500 rounded-full"><p className="w-2 h-2 bg-white rounded-full"></p></div>
            <div className={`absolute -top-2 right-0 w-4 h-4 ${status==='Shortlisted' ? 'bg-green-500 flex justify-center items-center':`${status==='Rejected' ? 'bg-red-500':'bg-gray-200'}`} rounded-full`}>{status==='Shortlisted' ? <Check className="h-4 w-4 text-white"/>:''}</div>
          </div>
        </div>

        <div className="flex justify-between text-sm text-gray-600">
          <div>
            <p className="font-medium">Applied</p>
            <p>{new Date(appliedOn).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        })}</p>
          </div>  
          <div className="text-center">
            <p className="font-medium">Application Sent</p>
            <p>{new Date(appliedOn).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        })}</p>
          </div>
          <div className="text-right">
            <p className={`font-medium animate-pulse ${status==='Rejected' ? 'text-red-500':`${status==='Shortlisted' ? 'text-green-500':'text-slate-500'}`}`}>{status}</p>
          </div>
        </div>

        {/* Activity */}
        <div className="mt-8 border rounded-lg p-4 flex gap-8">
          <div>
            <p className="text-2xl font-semibold">{applicantCount}</p>
            <p className="text-sm text-gray-500">Total applications</p>
          </div>
          <div>
            <p className="text-2xl font-semibold">00</p>
            <p className="text-sm text-gray-500">
              Applications viewed by recruiter
            </p>
          </div>
        </div>

        {/* Suggestions */}
        <div className="mt-8">
          <h3 className="font-semibold mb-1">What may work for you?</h3>
          <p className="text-sm text-gray-500 mb-2">
            Following criteria suggests how well you match with the job.
          </p>

          <div className="flex items-center gap-2 text-green-600 text-sm">
            <CheckCircle size={16} />
            Early Applicant
          </div>
        </div>

      </div>
}
