import { Spinner } from "@/components/loader";
import axios from "axios";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

import {  Calendar, Clock, Link2, FileText } from "lucide-react";

interface SendObj{
  applicantId:string,
  show:Boolean,
  jobTitle:string,
  company:string
}
const ShortlistedCandidates = () => {
    const [loading,setLoading] = useState(true)
    const [candidates,setCandidates] = useState([])
    const [showSchedule,setShow] = useState<SendObj>({
          applicantId:'',
          show:false,
          jobTitle:"",
          company:''
    }); 
    
    async function Get_Shortlisted(){
        try{
           const Shortlisted = await axios({
            url:'http://localhost:3000/user/getShortlistedCandidates',
            headers:{
                Authorization:`Bearer ${localStorage.getItem('employerToken')}`
            },
            method:'GET'
           }) 

           if(Shortlisted.data && Shortlisted.data.candidates){
             setCandidates(Shortlisted.data.candidates)
             setLoading(false)
           }
        }
        catch(err){
           console.log(err)
           setLoading(false)
        }
    }

    useEffect(()=>{
       Get_Shortlisted()
    },[])


    if(loading){
        return <div className="flex justify-center items-center min-h-screen w-full">
             <Spinner/>
        </div>
    }


  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm p-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-slate-800">
            Shortlisted Candidates
          </h1>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b">
                <th className="text-left p-4 text-sm font-semibold text-slate-600">
                  Candidate
                </th>
                <th className="text-left p-4 text-sm font-semibold text-slate-600">
                  Email
                </th>
                <th className="text-left p-4 text-sm font-semibold text-slate-600">
                  Job Role
                </th>
                <th className="text-left p-4 text-sm font-semibold text-slate-600">
                  Company
                </th>
                <th className="text-left p-4 text-sm font-semibold text-slate-600">
                  Shortlisted On
                </th>
                <th className="text-right p-4 text-sm font-semibold text-slate-600">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>

                {
                    candidates.length > 0 && candidates.map((each:any) => {
                        return <tr className="border-b hover:bg-slate-50">
                <td className="p-4 font-medium text-slate-800">
                  {each.applicantName}
                </td>
                <td className="p-4 text-slate-600">
                 {each.applicantEmail}
                </td>
                <td className="p-4 text-slate-600">
                  {each.jobTitle}
                </td>
                <td className="p-4 text-slate-600">
                  {each.companyName}
                </td>
                <td className="p-4 text-slate-600">
                  {new Date(each.shortlistedAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        })}
                </td>
                <td className="p-4 text-right">
                  <button
                  onClick={()=> {
                    
                    setShow({show:true,applicantId:String(each.applicantId),jobTitle:each.jobTitle,company:each.companyName})
                    
                  }}
                  className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
                    Schedule Interview
                  </button>
                </td>
              </tr>
                    })
                }
              
            </tbody>
          </table>
        </div>

      </div>

    {showSchedule.show && <InterView_PopUp reloadShortlisted={Get_Shortlisted} jobTitle={showSchedule.jobTitle} company={showSchedule.company} applicantId={showSchedule.applicantId} onClose={()=> setShow(prev => ({...prev,show:false}))}/>}  
    </div>
  );
};


interface InterViewObj{
   interViewAt:Date,
   interLink:string,
   note:string
}
function InterView_PopUp({ reloadShortlisted,onClose,applicantId,jobTitle,company}: any) {
  console.log("Applicant id" + applicantId)
  const [date,setDate] = useState('');
  const [time,setTime] = useState('')
  const [interVar,setInterVar] = useState<InterViewObj>({
    interViewAt:new Date(),
    note:'',
    interLink:''
  })

  function mergeDateAndTime(date:string,time:string):Date{
    return new Date(`${date}T${time}`)
  }

 
  useEffect(()=>{
    if(!date || !time) return ;

     const interViewAt = mergeDateAndTime(date,time)
     setInterVar(prev => ({...prev,interViewAt:interViewAt}))

  },[date,time])


  const [loading,setLoading]  = useState(false)
  async function Schedule_InterView_Req(){
    if(!interVar.interLink || !interVar.interViewAt){
      alert('Fill all fields first!!')
      return ;
    }

    setLoading(true)
    try{
       const Set_Interview = await axios({
        url:'http://localhost:3000/user/setInterview',
        data:{
          applicantId,
          interVar,
          jobTitle,
          company
        },
        method:'POST',
        headers:{
          Authorization:`Bearer ${localStorage.getItem('employerToken')}`
        }
       })


       if(Set_Interview.data && Set_Interview.data.ok){
           onClose()
           reloadShortlisted()
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
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-xl p-6 relative">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-slate-800">
            Schedule Interview
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Provide interview details for the shortlisted candidate
          </p>
        </div>

        {/* Form */}
        <div className="space-y-5">

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Interview Date
            </label>
            <div className="relative">
              <Calendar
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
              onChange={(e)=> setDate(e.target.value) }
                type="date"
                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Interview Time
            </label>
            <div className="relative">
              <Clock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
              onChange={(e)=> setTime(e.target.value) }
                type="time"
                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Meeting Link */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Meeting Link (Google Meet / Zoom)
            </label>
            <div className="relative">
              <Link2
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
              onChange={(e)=> setInterVar(prev=> ({...prev,interLink:e.target.value}))}
                type="text"
                placeholder="https://meet.google.com/xxx-xxxx-xxx"
                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Note */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Note for Candidate (Optional)
            </label>
            <div className="relative">
              <FileText
                size={18}
                className="absolute left-3 top-3 text-slate-400"
              />
              <textarea
              onChange={(e)=> setInterVar(prev=> ({...prev,note:e.target.value}))}
                rows={4}
                placeholder="Example: Please join the meeting 10 minutes early. Keep your resume ready."
                className="w-full pl-10 pr-3 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border text-slate-700 hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
          onClick={Schedule_InterView_Req}
            className="px-5 py-2 rounded-md flex justify-center items-center bg-blue-600 text-white hover:bg-blue-700"
          >
            {!loading ? "Schedule interview":<Spinner/>}
          </button>
        </div>

      </div>
    </div>
  );
}



export default ShortlistedCandidates;
