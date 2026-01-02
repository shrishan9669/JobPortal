import { useEffect, useState } from "react";
import { Search, Filter, FileText, Download, X } from "lucide-react";

import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { DrawerFooter } from "@/components/ui/drawer";
import { DrawerHeader } from "@/components/ui/drawer";
import { DrawerTitle } from "@/components/ui/drawer";
import { DrawerDescription } from "@/components/ui/drawer"
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectItem, SelectContent, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Spinner } from "@/components/loader";
import { timeAgo } from "@/UserComponents/IdBasedJob";
export default function ApplicantsTab() {
  const [open, setOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<any>(null);

  const showDetails = (applicant: any) => {
    setSelectedApplicant(applicant);
    setOpen(true);
  };


  const [allApplicants,setApplicants] = useState<any>([])
  const [loading,setLoading] = useState(true)
  const [nameOrEmail,setEmail_Name]  = useState('');
  const [status,setStatus]  = useState('');
  const [sort,setSort] = useState('')
  const [jobTitle,setJobTitle] = useState('')
  const[loader,setLoader] = useState(false)
  async function Get_Applicants(){
    try{
          const Applicants = await axios({
            url:'http://localhost:3000/user/getApplicants',
            method:'GET',
            headers:{
              Authorization:`Bearer ${localStorage.getItem('employerToken')}`
            }
          })

          if(Applicants.data && Applicants.data.Applicants){
              setApplicants(Applicants.data.Applicants);
          }
          setLoading(false)
    }
    catch(err){
      console.log(err);
      setLoading(false)

    }
  }


  useEffect(()=>{
     Get_Applicants()
  },[])
 
  let Filtered_Applicants: any[] = [];

  if(allApplicants.length > 0){
      Filtered_Applicants = allApplicants.filter((applicant:any) =>{

        const Name_Email_Valid = nameOrEmail.trim() === "" || applicant.user.name.toLowerCase().includes(nameOrEmail.toLowerCase()) || applicant.user.email.toLowerCase().includes(nameOrEmail.toLowerCase());
        
        const status_Valid = status==='' || status==='All' || status===applicant.status

        const jobTitle_Valid = jobTitle==='' || jobTitle==='All' || jobTitle===applicant.job.title

        return Name_Email_Valid && status_Valid && jobTitle_Valid
      }).sort((a:any,b:any)=>{
           const timeA = new Date(a.appliedOn).getTime();
           const timeB = new Date(b.appliedOn).getTime();

           return sort === "latest" ? timeB - timeA : timeA - timeB;
      })
      console.log(Filtered_Applicants)

   
  }

  const  jobTitles = [
    "All",
  "Software Engineer",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "React Developer",
  "Node.js Developer",
  "Java Developer",
  "Python Developer",
  "Android Developer",
  "iOS Developer",
  "Mobile App Developer",
  "DevOps Engineer",
  "Cloud Engineer",
  "Data Engineer",
  "Data Scientist",
  "AI / ML Engineer",
  "Blockchain Developer",
  "Cybersecurity Analyst",
  "QA Tester",
  "Automation Test Engineer",
  "Game Developer",
  "UI/UX Designer",
  "Product Designer",
  "Graphic Designer",
  "Web Designer",
  "Product Manager",
  "Project Manager",
  "Business Analyst",
  "Scrum Master",
  "Technical Lead",
  "Solutions Architect",
  "Database Administrator",
  "System Administrator",
  "Network Engineer",
  "IT Support Engineer",
  "SDET",
  "Sales Executive",
  "Sales Manager",
  "Business Development Executive",
  "Business Development Manager",
  "Account Executive",
  "Client Relationship Manager",
  "Digital Marketing Executive",
  "Digital Marketing Manager",
  "SEO Specialist",
  "Content Writer",
  "Copywriter",
  "Social Media Manager",
  "HR Executive",
  "HR Manager",
  "Talent Acquisition Specialist",
  "Recruitment Executive",
  "Operations Manager",
  "Finance Executive",
  "Chartered Accountant",
  "Financial Analyst",
  "Accounts Manager",
  "Customer Support Executive",
  "Customer Success Manager",
  "Admin Executive",
  "Office Manager",
  "Teacher / Instructor",
  "Professor",
  "Counselor",
  "Medical Representative",
  "Pharmacist",
  "Nurse",
  "Lab Technician",
  "Mechanical Engineer",
  "Electrical Engineer",
  "Civil Engineer",
  "Architect",
  "Interior Designer",
  "Logistics Manager",
  "Supply Chain Executive",
  "Store Manager",
  "Manufacturing Supervisor",
  "Quality Analyst (Non-Tech)",
   ];


   async function UpdateStatus(status:string){
    setLoader(true)
    try{
       const Update_status = await axios({
        url:'http://localhost:3000/user/updateStatusByEmployer',
        data:{
          applicantId:selectedApplicant.id,
          note:'',
          status:status
        },
        method:'POST',
        headers:{
          Authorization:`Bearer ${localStorage.getItem('employerToken')}`
        }
       })

       if(Update_status.data && Update_status.data.ok){
            setOpen(false)
            Get_Applicants()
       }


    }
    catch(err){
      console.log(err)
    }
    finally{
      setLoader(false)
    }
   }
  




  if(loading){
    return <div className="w-full h-screen flex justify-center items-center">
       <Spinner/>
    </div>
  }


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">Applicants</h1>



{/* Name or Email match Search bar */}
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <Input onChange={(e)=> setEmail_Name(e.target.value)} placeholder="Search by name or email" className="pl-10 w-72" />
          </div>

{/* Status Search Bar */}
          <Select  value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent >
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Under Review">Under Review</SelectItem>
              <SelectItem value="shortlisted">Shortlisted</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>

{/* Job Title or Job role Search Match */}
          <Select  value={jobTitle} onValueChange={setJobTitle}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by job title" />
            </SelectTrigger>
            <SelectContent className="overflow-y-auto h-[300px]">

              {
                jobTitles.map(each => {
                  return <SelectItem value={each} key={each}>{each}</SelectItem>
                })
              }
              
              
            </SelectContent>
          </Select>

          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-34">
              <SelectValue placeholder="Sort"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest First</SelectItem>  
              <SelectItem value="oldest">Oldest First</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border shadow-sm bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Applied On</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {Filtered_Applicants.map((app:any, i:any) => (
              <tr key={i} className="border-t hover:bg-gray-50">
                <td className="p-4 font-medium">{app.user.name}</td>
                <td className="p-4">{app.user.email}</td>
                <td className="p-4">{new Date(app.appliedOn).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        })}</td>
                <td className="p-4">
                  <Badge
                    className={
                      app.status === "Shortlisted"
                        ? "bg-green-500"
                        : app.status === "Rejected"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }
                  >
                    {app.status}
                  </Badge>
                </td>
                <td className="p-4 text-right">
                  <Button size="sm" onClick={() => showDetails(app)}>
                    View Applicant
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Drawer - Applicant Detail */}
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className=" h-[70vh]">
          <DrawerHeader className="sticky top-0 bg-white z-10 border-b">
            <DrawerTitle>Applicant Details</DrawerTitle>
            <DrawerDescription>Review profile + take action</DrawerDescription>
          </DrawerHeader>

          {selectedApplicant && (
  <div className="px-6 space-y-6 overflow-y-auto">

    {/* Header Info Table */}
<div className="border  rounded-lg overflow-hidden">
  <div className="grid grid-cols-3 text-sm">
    
    <div className="bg-gray-50 px-4 py-2 font-medium text-gray-600">
      Name
    </div>
    <div className="col-span-2 px-4 py-2 font-semibold">
      {selectedApplicant.user.name}
    </div>

    <div className="bg-gray-50 px-4 py-2 font-medium text-gray-600">
      Email
    </div>
    <div className="col-span-2 px-4 py-2">
      {selectedApplicant.user.email}
    </div>

    <div className="bg-gray-50 px-4 py-2 font-medium text-gray-600">
      Applied For
    </div>
    <div className="col-span-2 px-4 py-2">
      {selectedApplicant.job.title}
    </div>

    <div className="bg-gray-50 px-4 py-2 font-medium text-gray-600">
      Applied On
    </div>
    <div className="col-span-2 px-4 py-2">
      {new Date(selectedApplicant.appliedOn).toDateString()}
    </div>

  </div>
</div>

         {/* Fit Score Section */}
<div className="space-y-2">
  <div className="flex justify-between items-center">
    <p className="font-medium text-sm">Overall Fit Score</p>
    <span className="text-sm font-semibold">
      {selectedApplicant.fitScore.fitScore}%
    </span>
  </div>

  {/* Progress Bar */}
  <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
    <div
      className={`h-full transition-all duration-500
        ${selectedApplicant.fitScore.fitScore >= 70
          ? "bg-green-600"
          : selectedApplicant.fitScore.fitScore >= 40
          ? "bg-yellow-500"
          : "bg-red-600"
        }`}
      style={{ width: `${selectedApplicant.fitScore.fitScore}%` }}
    />
  </div>

  {/* Label */}
  <p
    className={`text-xs font-medium
      ${selectedApplicant.fitScore.fitScore >= 70
        ? "text-green-700"
        : selectedApplicant.fitScore.fitScore >= 40
        ? "text-yellow-600"
        : "text-red-600"
      }`}
  >
    {selectedApplicant.fitScore.fitScore >= 70
      ? "Good Match"
      : selectedApplicant.fitScore.fitScore >= 40
      ? "Average Match"
      : "Low Match"}
  </p>
</div>


    {/* Quick Stats */}
    <div className="grid grid-cols-2 gap-4 text-sm">
      <div>
        <p className="text-gray-500">Experience</p>
        <p className="font-medium">
          {selectedApplicant.experienceSnapshot} yrs
        </p>
      </div>

      <div>
        <p className="text-gray-500">Location</p>
        <p className="font-medium">
          {selectedApplicant.user.location || "Not specified"}
        </p>
      </div>
    </div>

    {/* Profile Summary */}
    <div>
      <p className="font-medium mb-1">Profile Summary</p>
      <p className="text-sm text-gray-700">
        {selectedApplicant.user.profileSummary || "No summary provided"}
      </p>
    </div>

    {/* Skills */}
    <div>
      <p className="font-medium mb-2">Skills</p>
      <div className="flex flex-wrap gap-2">
        {selectedApplicant.skillsSnapshot.map((s: string, i: number) => (
          <Badge key={i} variant="secondary">
            {s}
          </Badge>
        ))}
      </div>
    </div>

{/* Matched Skills */}
   <div>
      <p className="font-medium mb-2">Matched Skills</p>
      <div className="flex flex-wrap gap-2">
        {selectedApplicant.fitScore.matchedSkills.map((s: string, i: number) => (
          <Badge key={i} variant="secondary">
            {s}
          </Badge>
        ))}
      </div>
    </div>

    {/* Matched Skills */}
   <div>
      <p className="font-medium mb-2">Missing Skills</p>
      <div className="flex flex-wrap gap-2">
        {selectedApplicant.fitScore.missingSkills.map((s: string, i: number) => (
          <Badge key={i} variant="secondary">
            {s}
          </Badge>
        ))}
      </div>
    </div>

    {/* Resume */}
    <div className="flex gap-3">
      <Button variant="outline" className="flex gap-2">
        <Download className="w-4 h-4" />
        Download Resume
      </Button>

      <Button variant="outline">
        View Resume
      </Button>
    </div>

  </div>
         )}





          <DrawerFooter className="sticky bottom-0 z-50 bg-white border-t">
            <div className="flex justify-between gap-2">
              <Button  
              onClick={()=>{
                UpdateStatus('Shortlisted')
              }}
              className="w-full flex justify-center bg-green-600 hover:bg-green-700">
                {loader ? <Spinner/>:'Shortlist'}
              </Button>
              <Button
              onClick={()=>{
                UpdateStatus('Rejected')
              }}
              className="w-full flex justify-center bg-red-600 hover:bg-red-700">
                {loader ? <Spinner/>:'Reject'}
              </Button>
            </div>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
