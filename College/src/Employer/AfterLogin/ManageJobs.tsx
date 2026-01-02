import axios from "axios";
import { useEffect, useState } from "react";
import { Spinner } from "../../components/loader";
import { ErrorPopup } from "./jobPost";

const ManageJobs = ({setCurPage}:any) => {
    const [jobs,setJobs] = useState([]);
    const [keywordSearch,setKeywordSearch] = useState('');
    const [statusSearch,setStatusSearch] = useState('All Status');
    let filteredJobs : Object[] = [];

    if(jobs.length > 0){
        filteredJobs = jobs.filter((job:any) => {
        const matchesText =
            keywordSearch.trim() === "" ||
            CheckMathKeyword(job.title) ||
            CheckMathKeyword(job.role);

            const matchesStatus = statusSearch === "All Status" || job.status === statusSearch;

            return matchesText && matchesStatus;
     });
    }

    async function GettingJobs(){
        try{
            const AllJobs = await axios({
                url:"http://localhost:3000/user/getAllJobs",
                method:'GET',
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('employerToken')}`
                }
            })

            if(AllJobs.data && AllJobs.data.jobs){
                 setJobs(AllJobs.data.jobs)
            }
        }
        catch(err){
             console.log(err)
        }
    }

    const [deleteObj,setDeleteObj] = useState< { [key:string] : Boolean } >({})

    async function DeleteJob(id:any){
      setDeleteObj(prev => ({ ...prev, [id]: true })); // turn spinner ON

      try{
            const Deleted = await axios({
              url:`http://localhost:3000/user/deleteAJob?rowId=${id}`,
              method:'DELETE',
              headers:{
                Authorization:`Bearer ${localStorage.getItem("employerToken")}`
              }
            })

            if(Deleted.data && Deleted.data.ok){
              GettingJobs()
            }
      }
      catch(err){
        console.log(err)
         alert("Failed to delete job");
      }
      finally{
          setDeleteObj(prev => ({...prev,[id]:false}))
      }
    }


    useEffect(()=>{
        GettingJobs()
    },[])


    const [showView,setShowView] = useState(false)
    const [editView,setEditView] = useState(false)
    const [viewJob,setViewJob] = useState({})
    
  


    // title search algorithm
   function CheckMathKeyword(jobtitle:string){
         let str = ""
        for(let i=0;i<jobtitle.length;i++){
             str+=jobtitle[i];
             if(str===keywordSearch.trim()){
                return true;
             }
        }
        return false;
    }
    
  return (
    <div className="w-full p-7">

      {/* Heading */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-700">Manage Jobs</h1>
        <button onClick={()=> setCurPage('Post')} className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow">
          + Post New Job
        </button>
      </div>

      {/* Search / Filter */}
      <div className="flex gap-4 mb-6">
        <input
          onChange={(e)=> setKeywordSearch(e.target.value)}
          type="text"
          placeholder="Search by title or role..."
          className="flex-1 border rounded-lg px-4 py-2 focus:outline-blue-500 text-gray-600"
        />
        <select onChange={(e)=> setStatusSearch(e.target.value)} className="border rounded-lg px-4 py-2 focus:outline-blue-500 text-gray-600">
          <option>All Status</option>
          <option>Active</option>
          <option>Closed</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Job Title</th>
              <th className="py-3 px-4 text-left">Applicants</th>
              <th className="py-3 px-4 text-left">Posted On</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="text-gray-700">

            {filteredJobs.length > 0 && filteredJobs.map((each:any) => {
                return  <tr className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{each.title}</td>
                    <td className="py-3 px-4">0</td>
                    <td className="py-3 px-4">
                        {new Date(each.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        })}
                    </td>
                    <td className="py-3 px-4">
                        <span className="bg-green-100 text-green-700 px-3 py-1 text-sm rounded-full">
                          {each.status}
                        </span>
                    </td>
                    <td className="py-3 px-4 flex justify-center gap-3">
                      {/* View */}
                        <button
                         onClick={()=>{
                          setViewJob(each)
                          setShowView(true)
                         }}
                        className="text-blue-600 cursor-pointer hover:underline font-medium">View</button>

                        {/* Edit */}
                        <button
                        onClick={()=>{
                          setViewJob(each)
                          setEditView(true)
                        }}
                        className="text-yellow-600 cursor-pointer hover:underline font-medium">Edit</button>

                        {/* Delete */}
                        <button
                        onClick={()=>{
                          DeleteJob(each.id)
                        }}

                        
                        className="text-red-600 cursor-pointer flex justify-center hover:underline font-medium">{deleteObj[each.id] ? <Spinner/>:"Delete"}</button>
                    </td>
                </tr> 
            })}

          </tbody>
        </table>
      </div>

      {showView && <JobDetailsModal job={viewJob} onClose={()=> setShowView(false)}/>}
      
      {editView && <Edit_A_Job job={viewJob} onClose={()=> setEditView(false)}/>}
    </div>
  );
};


 function JobDetailsModal({ job, onClose }:any) {
  

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-[90%] max-w-2xl rounded-xl shadow-lg overflow-hidden animate-scale">
        
        {/* Header */}
        <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-100">
          <h2 className="text-xl font-semibold text-gray-800">
            {job.title} — {job.company}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 cursor-pointer hover:text-red-600 text-lg"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 text-gray-700">

          <p>
            <span className="font-semibold">Role:</span> {job.role}
          </p>

          <p>
            <span className="font-semibold">Description:</span><br />
            {job.description || "No description"}
          </p>

          <div className="grid grid-cols-2 gap-3 mt-2">
            <p><span className="font-semibold">Employment:</span> {job.employmentType}</p>
            <p><span className="font-semibold">Work Mode:</span> {job.workMode}</p>
            <p><span className="font-semibold">Experience:</span> {job.experience}</p>
            <p><span className="font-semibold">Location:</span> {job.location}</p>
            <p><span className="font-semibold">Salary:</span> {job.currency} {job.salary.toLocaleString()}</p>
            <p><span className="font-semibold">Openings:</span> {job.openings}</p>
            <p><span className="font-semibold">Status:</span> {job.status}</p>
            <p><span className="font-semibold">Deadline:</span> {new Date(job.applicationDeadline).toLocaleDateString()}</p>
          </div>

          {/* Skills */}
          <div>
            <span className="font-semibold">Skills Required:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {job.skills?.map((s:any, i:any) => (
                <span
                  key={i}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}


interface JobProfile{
  title:string,
  company:string,
  experience:string,
  workMode:string,
  employmentType:string,
  location:string,
  jobtype:string,
  role:string,
  openings:string,
  currency:string,
  salary:string,
  skills:string[],
  deadline:Date,
  description:string,
  status:string
}

function Edit_A_Job({onClose,job}:any){

  const [loading,setLoading] = useState(false)
  const [newJob,setNewJob] = useState<JobProfile>({
        title: job.title,
        company: job.company,
        experience: job.experience,
        workMode: job.workMode,
        employmentType: job.employmentType,
        location:job.location,
        jobtype: job.jobType,
        role: job.role,
        openings: job.openings,
        currency: job.currency,
        salary: job.salary,
        skills: job.skills,
        deadline: job.deadline,
        description:job.description,
        status:job.status
  }) 

   const  jobTitles = [
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
   const companyNames = [
  "Google",
  "Microsoft",
  "Amazon",
  "Meta",
  "Apple",
  "Netflix",
  "Adobe",
  "Intel",
  "Cisco",
  "IBM",
  "Oracle",
  "Salesforce",
  "SAP",
  "Dell Technologies",
  "HP",
  "NVIDIA",
  "Samsung",
  "Qualcomm",
  "Infosys",
  "TCS",
  "Wipro",
  "HCLTech",
  "Tech Mahindra",
  "Accenture",
  "Cognizant",
  "Capgemini",
  "Larsen & Toubro (L&T)",
  "Zoho",
  "Byju's",
  "Swiggy",
  "Zomato",
  "Paytm",
  "PhonePe",
  "Razorpay",
  "OLA",
  "Uber",
  "Flipkart",
  "Meesho",
  "Tata Digital",
  "Reliance Jio",
  "Adani",
  "Deloitte",
  "KPMG",
  "EY",
  "PwC",
  "Goldman Sachs",
  "JP Morgan Chase",
  "Morgan Stanley",
  "Barclays",
  "HSBC",
  "American Express",
  "LinkedIn",
  "Spotify",
  "Uber",
  "Tesla",
  "SpaceX",
  "Boeing",
  "Siemens",
  "Honeywell",
  "Shell",
  "Unilever",
  "Nestle",
  "PepsiCo",
  "Coca-Cola",
  "P&G",
  "Colgate-Palmolive",
  "Asian Paints",
  "Hindustan Unilever",
  "Mahindra",
  "Tata Motors",
  "Ford",
  "Toyota",
  "Honda",
  "Mercedes-Benz",
  "BMW",
  "Airbnb",
  "Booking.com",
  "RedBus",
  "J.P. Morgan",
  "Sutherland",
  "Concentrix",
  "Teleperformance",
  "Mindtree",
  "Persistent Systems",
  "Mphasis",
  "Publicis Sapient",
  "Slack",
  "Atlassian",
  "HubSpot",
  "Shopify",
   ];
    const jobLocations = [
  "Bengaluru",
  "Hyderabad",
  "Pune",
  "Mumbai",
  "Navi Mumbai",
  "Thane",
  "Delhi",
  "New Delhi",
  "Gurugram",
  "Noida",
  "Chennai",
  "Kolkata",
  "Ahmedabad",
  "Surat",
  "Jaipur",
  "Indore",
  "Lucknow",
  "Bhopal",
  "Nagpur",
  "Chandigarh",
  "Mohali",
  "Zirakpur",
  "Kochi",
  "Trivandrum",
  "Coimbatore",
  "Visakhapatnam",
  "Vadodara",
  "Rajkot",
  "Mysuru",
  "Hubballi",
  "Mangalore",
  "Goa",
  "Patna",
  "Ranchi",
  "Bhubaneswar",
  "Guwahati",
  "Dehradun",
  "Jammu",
  "Udaipur",
  "Kanpur",
  "Varanasi",
  "Prayagraj",
  "Amritsar",
  "Ludhiana",
  "Jalandhar",
  "Faridabad",
  "Ghaziabad",
  "Agra",
  "Meerut",
  "Gorakhpur",
  "Jabalpur",
  "Raipur",
  "Bilaspur",
  "Nashik",
  "Aurangabad",
  "Vijayawada",
  "Tirupati",
  "Warangal",
  "Nellore",
  "Madurai",
  "Salem",
  "Erode",
  "Tirunelveli",
  "Bhavnagar",
  "Gandhinagar",
  "Srinagar",
  "Shimla",
  "Kharagpur",
  "Durgapur",
  "Siliguri",
  "Puducherry",
  "Port Blair",
  "Aizawl",
  "Imphal",
  "Shillong",
  "Kohima",
  "Gangtok",
  "Itanagar",
  "Remote (India)",
  "Work From Home"
];
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
 const industrySkills = [
  // Frontend Technologies
  "React.js",
  "Next.js",
  "Vue.js",
  "Angular",
  "TypeScript",
  "JavaScript (ES6+)",
  "HTML5 & CSS3",
  "Tailwind CSS",
  "Bootstrap",
  "Material-UI",
  "Redux/Redux Toolkit",
  "React Query",
  "GraphQL (Apollo/Relay)",
  "Webpack",
  "Vite",
  "Jest",
  "React Testing Library",
  "Cypress",
  "Playwright",
  
  // Backend Technologies
  "Node.js",
  "Express.js",
  "NestJS",
  "Python",
  "Django",
  "Flask",
  "FastAPI",
  "Java",
  "Spring Boot",
  "C#",
  ".NET Core",
  "Go (Golang)",
  "Ruby on Rails",
  "PHP",
  "Laravel",
  "REST API",
  "Microservices",
  "GraphQL",
  "gRPC",
  "WebSockets",
  
  // Databases
  "MongoDB",
  "MySQL",
  "PostgreSQL",
  "Redis",
  "Elasticsearch",
  "Firebase",
  "Supabase",
  "DynamoDB",
  "Cassandra",
  "SQL",
  "NoSQL",
  "ORM (Prisma/Sequelize)",
  
  // DevOps & Cloud
  "Docker",
  "Kubernetes",
  "AWS",
  "Azure",
  "Google Cloud Platform",
  "CI/CD (GitHub Actions/Jenkins)",
  "Terraform",
  "Ansible",
  "Nginx",
  "Linux",
  "Shell Scripting",
  "Git",
  
  // Mobile Development
  "React Native",
  "Flutter",
  "Swift",
  "Kotlin",
  "Android Development",
  "iOS Development",
  
  // Data Science & AI/ML
  "Python (Data Science)",
  "R Programming",
  "Machine Learning",
  "Deep Learning",
  "TensorFlow",
  "PyTorch",
  "Scikit-learn",
  "Pandas",
  "NumPy",
  "Data Visualization",
  "Tableau",
  "Power BI",
  
  // Testing & QA
  "Selenium",
  "JUnit",
  "Mocha/Chai",
  "Postman",
  "API Testing",
  "Load Testing",
  "Security Testing",
  
  // Soft Skills
  "Problem Solving",
  "Communication Skills",
  "Team Leadership",
  "Project Management",
  "Agile/Scrum",
  "Git Collaboration",
  "Code Review",
  "Technical Documentation",
  "System Design",
  "Debugging",
  
  // Emerging Technologies
  "Blockchain",
  "Web3",
  "Smart Contracts",
  "IoT",
  "AR/VR Development",
  "Computer Vision",
  "NLP",
  "ChatGPT/OpenAI API",
  "LangChain",
  
  // Design & UX
  "Figma",
  "Adobe XD",
  "UI/UX Design",
  "Prototyping",
  "User Research",
  
  // Cybersecurity
  "Network Security",
  "Ethical Hacking",
  "Penetration Testing",
  "Cryptography",
  
  // Business & Tools
  "JIRA",
  "Confluence",
  "Slack",
  "Microsoft Office",
  "Google Workspace",
  
  // Languages
  "English",
  "Hindi",
  "Spanish",
  "French",
  "German",
  "Chinese",
  "Japanese"
];

const [showSuccess,setSuccess] = useState(false)


async function Update_Job(){
  setLoading(true)
  try{
    const Updating = await axios({
      url:"http://localhost:3000/user/updateJob",
      method:'POST',
      data:{
        id:job.id,
        newJob
      },
      headers:{
        Authorization:`Bearer ${localStorage.getItem('employerToken')}`
      }
    })

    if(Updating.data && Updating.data.ok){
       setSuccess(true)
    }
  }
  catch(err){
    console.log(err)
  }
  finally{
    setLoading(false)
  }
}

 function handleAddSkill(skill:string){
    
  const Some = newJob.skills.some(each => each===skill)

  if(!Some){
    setNewJob(prev => ({...prev,skills:[...prev.skills,skill]}))
  }
  
 }

 function handleRemoveSkill(skill:string){
   setNewJob(prev => ({...prev,skills:prev.skills.filter(each => each!==skill)}))
 }







  return <div className="fixed inset-0  bg-black/50 flex justify-center items-center z-50">
     
    {showSuccess && <ErrorPopup onClose={()=> setSuccess(false)} show={showSuccess} color="green" message="Information updated successfully."/>}


    <div className="bg-white w-[90%] p-4 max-w-2xl max-h-[85vh] rounded-xl shadow-lg overflow-y-auto animate-scale">

      {/* Header */}
        <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-100">
          <h2 className="text-xl font-semibold text-gray-800">
            Edit Job
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 cursor-pointer hover:text-red-600 text-lg"
          >
            ✕
          </button>
        </div>

        <form onSubmit={(e)=>{
          e.preventDefault()
          Update_Job()
        }} className="space-y-6 mt-10 text-slate-500">
        
                  {/* Job Title */}
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">
                      Job Title *
                    </label>
                    <select
                    onChange={(e)=>{
                      setNewJob(prev => ({...prev,title:e.target.value}))
                    }}
                    value={newJob.title} className="w-full p-3 border rounded-lg focus:outline-blue-500"  name="" id="">
                      <option value="" hidden>Select</option>
                      {
                        jobTitles.map(each => {
                          return <option key={each} value={each}>{each}</option>
                        })
                      }
                    </select>
                   
                  </div>
        
                  {/* Company Name */}
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">
                      Company Name *
                    </label>
                    <select
                     onChange={(e)=>{
                      setNewJob(prev => ({...prev,company:e.target.value}))
                    }}
                    value={newJob.company} className="w-full p-3 border rounded-lg focus:outline-blue-500" name="" id="">
                      <option value="" hidden>Select</option>
                      {
                        companyNames.map(each => {
                          return <option key={each} value={each}>{each}</option>
                        })
                      }
                    </select>
                  </div>
        
                  {/* Employment Type */}
                   <div>
                      <label className="block font-medium text-gray-700 mb-1">
                        Employment Type *
                      </label>
                      <select
                       onChange={(e)=>{
                      setNewJob(prev => ({...prev,employmentType:e.target.value}))
                    }}
                      value={newJob.employmentType}
                      required className="w-full p-3 border text-slate-500 rounded-lg focus:outline-blue-500">
                        <option value="" hidden>Select:</option>
                        <option>Onsite</option>
                        <option>Remote</option>
                        <option>Hybrid</option>
                      </select>
                   </div>
        
                  {/* Job Location & Work Mode */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-medium text-gray-700 mb-1">
                        Job Location *
                      </label>
                      <select
                       onChange={(e)=>{
                      setNewJob(prev => ({...prev,location:e.target.value}))
                    }}
                      value={newJob.location} className="w-full p-3 border rounded-lg focus:outline-blue-500" name="" id="">
                      <option value="" hidden>Select</option>
                      {
                        jobLocations.map(each => {
                          return <option key={each} value={each}>{each}</option>
                        })
                      }
                     </select>
        
                    </div>
                    <div>
                      <label className="block font-medium text-gray-700 mb-1">
                        Work Mode *
                      </label>
                      <select
                       onChange={(e)=>{
                      setNewJob(prev => ({...prev,workmode:e.target.value}))
                    }}
                      value={newJob.workMode}
                      required className="w-full text-slate-500 p-3 border rounded-lg focus:outline-blue-500">
                        <option>Onsite</option>
                        <option>Remote</option>
                        <option>Hybrid</option>
                      </select>
                    </div>
                  </div>
        
                  {/* Job Type & Category */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-medium text-gray-700 mb-1">
                        Job Type *
                      </label>
                      <select
                       onChange={(e)=>{
                      setNewJob(prev => ({...prev,jobtype:e.target.value}))
                    }}
                      value={newJob.jobtype}
                      required className="w-full text-slate-500 p-3 border rounded-lg focus:outline-blue-500"
                      defaultValue={"Full-time"}>
                        <option>Full-time</option>
                        <option>Part-time</option>
                        <option>Internship</option>
                        <option>Contract</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-medium text-gray-700 mb-1">
                        Category / Role *
                      </label>
                      <select
                       onChange={(e)=>{
                      setNewJob(prev => ({...prev,role:e.target.value}))
                    }}
                      value={newJob.role}
                      className="w-full p-3 border rounded-lg focus:outline-blue-500"  name="" id="">
                      <option value="" hidden>Select</option>
                      {
                        jobRoles.map(each => {
                          return <option key={each} value={each}>{each}</option>
                        })
                      }
                     </select>
                    </div>
                  </div>
        
                  {/*Experience and Vacancy*/}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-medium text-gray-700 mb-1">
                        Experience Required
                      </label>
                      <input
                       onChange={(e)=>{
                      setNewJob(prev => ({...prev,experience:e.target.value}))
                    }}
                      value={newJob.experience}
                        required
                        type="text"
                        className="w-full p-3 border rounded-lg focus:outline-blue-500"
                        placeholder="e.g., 0-2 years / Fresher / 3+ years"
                      />
                    </div>
        
                     {/* Vacancy Input */}
                    <div className="w-full flex flex-col">
                      <label className="block font-medium text-gray-700 mb-1">Vacancies</label>
                      
                      <input
                       onChange={(e)=>{
                      setNewJob(prev => ({...prev,vacancies:e.target.value}))
                    }}
                        value={newJob.openings}
                        required
                        type="number"
                        min="1"
                        placeholder="Enter no. of positions (e.g., 5)"
                        className="w-full p-3 border rounded-lg focus:outline-blue-500"
                      />
                    </div>
        
                  </div>
               
        
                    {/* Salary Input Rupee Or Dollar */}
                    <div className="w-full flex  flex-col gap-2">
                  <label className="font-medium text-sm">Salary</label>
        
                  <div className="flex items-center gap-3 bg-gray-50 border rounded-lg p-3">
                    
                    {/* Currency Select */}
                    <select
                     onChange={(e)=>{
                      setNewJob(prev => ({...prev,currency:e.target.value}))
                    }}
                       value={newJob.currency}
                      required
                      className="border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      defaultValue="INR"
                    >
                      
                      <option value="INR">₹ INR</option>
                      <option value="USD">$ USD</option>
                    </select>
        
                    {/* Salary Amount */}
                    <input
                     onChange={(e)=>{
                      setNewJob(prev => ({...prev,salary:e.target.value}))
                    }}
                    value={newJob.salary}
                      required
                      type="number"
                      placeholder="Enter amount (e.g., 35000)"
                      className="flex-1 border no-spinner rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                    </div>
        
        
                   
        
                 
        
                  {/* Required Skills */}
                   <div className="flex flex-col gap-2">
            <label className="block font-medium text-gray-700 mb-1">
              Required Skills (Comma Separated) *
            </label>

            <div className="flex flex-wrap gap-1">
              {
                newJob.skills.map(each => {
                  return <span className="rounded-xl px-3 py-1 flex gap-2 items-center text-white bg-blue-400">{each } <span 
                  onClick={()=> handleRemoveSkill(each)}
                  className="text-black cursor-pointer">X</span></span>
                })
              }
            </div>
           <select
           onChange={(e)=> handleAddSkill(e.target.value)}
           name="" id="" className="w-full text-slate-500 p-3 border rounded-lg focus:outline-blue-500">
             <option value="" hidden>Select</option>
             {
              industrySkills.map(each=>{
                return <option value={each}>{each}</option>
              })
             }
           </select>
          </div>
        

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-medium text-gray-700 mb-1">
                        Status *
                      </label>
                     <select onChange={(e)=> setNewJob(prev => ({...prev,status:e.target.value}))} className="border w-full rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" name="" id="">
                      <option value="" hidden >Status</option>
                      <option value="Active">Active</option>
                      <option value="Closed">Closed</option>
                     </select>
                    </div>
        
                   {/* Deadline */}
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">
                      Application Deadline *
                    </label>
                    <input
                      onChange={(e)=>{
                      setNewJob(prev => ({...prev,deadline:new Date(e.target.value)}))
                    }}
                     
                      required
                      type="date"
                      className="w-full text-slate-500 p-3 border rounded-lg focus:outline-blue-500"
                    />
                  </div>
        
                  </div>
                  
        
                  {/* Job Description */}
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">
                      Job Description *
                    </label>
                    <textarea
                     onChange={(e)=> setNewJob(prev => ({...prev,description:e.target.value}))}
                      value={newJob.description}
                      rows={6}
                      className="w-full p-3 border rounded-lg focus:outline-blue-500"
                      placeholder="Describe the role, responsibilities, culture and expectations..."
                    ></textarea>
                  </div>
        
                 
        
                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full flex justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition"
                  >
                    {loading ? <Spinner/>:'Confirm Update'}
                  </button>
        
                </form>



    </div>

  </div>
}

export default ManageJobs;
