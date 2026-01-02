import { useState } from "react";
import axios from "axios";
interface JobProfile{
  title:string,
  company:string,
  experience:string,
  workmode:string,
  employmentType:string,
  location:string,
  jobtype:string,
  role:string,
  vacancies:string,
  currency:string,
  salary:string,
  skills:string[],
  responsibililities:string[],
  requirements:string[],
  education:string[]
  deadline:Date,
  description:string
}

const PostJob = () => {

  const [jobObject,setJobObject] = useState<JobProfile>({
        title: "",
        company: "",
        experience: "",
        workmode: "Onsite",
        employmentType: "",
        location: "",
        jobtype: "Full-time",
        role: "",
        vacancies: "",
        currency: "INR",
        salary: "",
        skills: [],
        responsibililities:[],
        requirements:[],
        education:[],
        deadline: new Date(),
        description: ""
  })

   const [responsibilityInput, setResponsibilityInput] = useState("");
   const [requirementInput, setRequirementInput] = useState("");
   const [educationInput, setEducationInput] = useState("");

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

const experiencesList = [
  "0-1",
  "1-2",
  "2-3",
  "3-4",
  "4-5",
  "5-7",
  "7-10",
  "10"
];



 function handleAddSkill(skill:string){
    
  const Some = jobObject.skills.some(each => each===skill)

  if(!Some){
    setJobObject(prev => ({...prev,skills:[...prev.skills,skill]}))
  }
  
 }

 function handleRemoveSkill(skill:string){
   setJobObject(prev => ({...prev,skills:prev.skills.filter(each => each!==skill)}))
 }

 const addResponsibility = () => {
    if (!responsibilityInput.trim()) return;

    setJobObject(prev => ({...prev,responsibililities:[...prev.responsibililities,responsibilityInput]}))
    setResponsibilityInput("");
  };

  const removeResponsibility = (index: number) => {
    setJobObject(prev => ({...prev,responsibililities:prev.responsibililities.filter((_,i)=> i!==index)}))
  };

  const addRequirements = () => {
    if (!requirementInput.trim()) return;

    setJobObject(prev => ({...prev,requirements:[...prev.requirements,requirementInput]}))
    setRequirementInput("");
  };

  const removeRequirements = (index: number) => {
    setJobObject(prev => ({...prev,requirements:prev.requirements.filter((_,i)=> i!==index)}))
  };

  const addEducation = () => {
    if (!educationInput.trim()) return;

    setJobObject(prev => ({...prev,education:[...prev.education,educationInput]}))
    setEducationInput("");
  };

  const removeEducation = (index: number) => {
    setJobObject(prev => ({...prev,education:prev.education.filter((_,i)=> i!==index)}))
  };






  const [wrongField,setWrongField] = useState(false)
  const [showSuccess,setShowSuccess] = useState(false);
  const [loading,setLoading] = useState(false)
   

  

  async function PostingJob(e:any){
  e.preventDefault();

  let Save = false;
   Save = Object.entries(jobObject).some(
  ([key, value]) => {
    if(key !== "description" && String(value).trim() === ""){
       console.log(key + " and " + value);
       return true;
    }
  }
  );


  if(Save){ 
    setWrongField(true)
    return;
  }

   setLoading(true)
   try{
      const Posting = await axios({
        url:'http://localhost:3000/user/postingJob',
        method:'POST',
        data:jobObject,
        headers:{
          Authorization:`Bearer ${localStorage.getItem('employerToken')}`
        }
      })

      if(Posting.data && Posting.data.ok){
          setShowSuccess(true)
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
    <div className="p-8 bg-gray-100 min-h-screen">
       
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-8">
        {/* Title */}
        <h2 className="text-3xl font-semibold text-gray-700 mb-6">
          Post a New Job
        </h2>

        {/* Job Posting Form */}
        <form onSubmit={PostingJob} className="space-y-6">

          {/* Job Title */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Job Title *
            </label>
            <select className="w-full p-3 border rounded-lg focus:outline-blue-500" onChange={(e)=> setJobObject(prev => ({...prev,title:e.target.value}))} name="" id="">
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
            <select className="w-full p-3 border rounded-lg focus:outline-blue-500" onChange={(e)=> setJobObject(prev => ({...prev,company:e.target.value}))} name="" id="">
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
              onChange={(e)=> setJobObject(prev => ({...prev,employmentType:e.target.value}))}
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
              <select className="w-full p-3 border rounded-lg focus:outline-blue-500" onChange={(e)=> setJobObject(prev => ({...prev,location:e.target.value}))} name="" id="">
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
              onChange={(e)=> setJobObject(prev => ({...prev,workmode:e.target.value}))}
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
              onChange={(e)=> setJobObject(prev => ({...prev,jobtype:e.target.value}))}
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
              <select className="w-full p-3 border rounded-lg focus:outline-blue-500" onChange={(e)=> setJobObject(prev => ({...prev,role:e.target.value}))} name="" id="">
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
              <select
              onChange={(e)=> setJobObject(prev => ({...prev,experience:e.target.value}))}
              className="w-full text-slate-500 p-3 border rounded-lg focus:outline-blue-500" name="" id="">
                <option value="" hidden>Experience</option>
                {
                  experiencesList.map(each => {
                    return <option value={each}>{each} yrs</option>
                  })
                }
              </select>
            </div>

             {/* Vacancy Input */}
            <div className="w-full flex flex-col">
              <label className="block font-medium text-gray-700 mb-1">Vacancies</label>

              <input
                onChange={(e)=> setJobObject(prev => ({...prev,vacancies:e.target.value}))}
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
            onChange={(e)=> setJobObject(prev => ({...prev,currency:e.target.value}))}
              required
              className="border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              defaultValue="INR"
            >
              
              <option value="INR">₹ INR</option>
              <option value="USD">$ USD</option>
            </select>

            {/* Salary Amount */}
            <input
            onChange={(e)=> setJobObject(prev => ({...prev,salary:e.target.value}))}
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
                jobObject.skills.map(each => {
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

          {/* Deadline */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Application Deadline *
            </label>
            <input
            onChange={(e)=> setJobObject(prev => ({...prev,deadline:new Date(e.target.value)}))}
              required
              type="date"
              className="w-full text-slate-500 p-3 border rounded-lg focus:outline-blue-500"
            />
          </div>

          {/* Job Description */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Job Description *
            </label>
            <textarea
              onChange={(e)=> setJobObject(prev => ({...prev,description:e.target.value}))}
              rows={6}
              className="w-full p-3 border rounded-lg focus:outline-blue-500"
              placeholder="Describe the role, responsibilities, culture and expectations..."
            ></textarea>
          </div>

          {/* Responsibilities */}
          <div className="bg-white p-4 rounded-lg border space-y-3">
      <h3 className="font-semibold">Responsibilities</h3>

      <div className="flex gap-2">
        <input
         required={!jobObject.responsibililities.length}
          className="border rounded-md px-3 py-2 w-full"
          placeholder="Add responsibility"
          value={responsibilityInput}
          onChange={(e) => setResponsibilityInput(e.target.value)}
        />
        <button
        type="button"
          onClick={addResponsibility}
          className="bg-blue-600 text-white px-4 rounded-md"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {jobObject.responsibililities.map((item, index) => (
          <li
            key={index}
            className="flex justify-between items-center border px-3 py-2 rounded-md"
          >
            <span>• {item}</span>
            <button
            type="button"
              onClick={() => removeResponsibility(index)}
              className="text-red-500 text-sm"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
          </div>


           {/* Requirements */}
          <div className="bg-white p-4 rounded-lg border space-y-3">
      <h3 className="font-semibold">Requirements</h3>

      <div className="flex gap-2">
        <input
         required={!jobObject.requirements.length}
          className="border rounded-md px-3 py-2 w-full"
          placeholder="Add requirements"
          value={requirementInput}
          onChange={(e) => setRequirementInput(e.target.value)}
        />
        <button
        type="button"
          onClick={addRequirements}
          className="bg-blue-600 text-white px-4 rounded-md"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {jobObject.requirements.map((item, index) => (
          <li
            key={index}
            className="flex justify-between items-center border px-3 py-2 rounded-md"
          >
            <span>• {item}</span>
            <button
            type="button"
              onClick={() => removeRequirements(index)}
              className="text-red-500 text-sm"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
          </div>


          {/* Education need */}
          <div className="bg-white p-4 rounded-lg border space-y-3">
      <h3 className="font-semibold">Education</h3>

      <div className="flex gap-2">
        <input
         required={!jobObject.education.length}
          className="border rounded-md px-3 py-2 w-full"
          placeholder="Add Education Eligibility"
          value={educationInput}
          onChange={(e) => setEducationInput(e.target.value)}
        />
        <button
        type="button"
          onClick={addEducation}
          className="bg-blue-600 text-white px-4 rounded-md"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {jobObject.education.map((item, index) => (
          <li
            key={index}
            className="flex justify-between items-center border px-3 py-2 rounded-md"
          >
            <span>• {item}</span>
            <button
            type="button"
              onClick={() => removeEducation(index)}
              className="text-red-500 text-sm"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
          </div>



         

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition"
          >
            {loading ? <Spinner/>:'Post Job'}
          </button>

        </form>
      </div>
     {wrongField && <ErrorPopup show={wrongField} onClose={()=> setWrongField(false)}/>} 
     {showSuccess && <ErrorPopup show={showSuccess} color={'green'} onClose={()=> setShowSuccess(false)} message="Job Posted Successfully."/>} 
    </div>
  );
};

export default PostJob;

import React from "react";
import { Spinner } from "../../components/loader";

type Props = {
  show: boolean;
  color?:string;
  message?: string;
  onClose?: () => void;
};

export const ErrorPopup: React.FC<Props> = ({ show,color ="red",message = "Wrong fields entered or some fields are empty", onClose }) => {
  return (
    // container (covers nothing when hidden because pointer-events-none)
    <div
      aria-live="assertive"
      className={`fixed inset-0 flex items-start justify-center pointer-events-none z-50 px-4 pt-6 sm:pt-8`}
    >
      <div
        // popup card
        className={`pointer-events-auto max-w-md w-full transform transition-all duration-300 ease-in-out
          ${show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 scale-[0.98]"}
        `}
      >
        <div className={`${color==='green' ? 'bg-green-600':'bg-red-600'} text-white rounded-lg shadow-lg overflow-hidden border ${color==='green' ? 'border-green-700':'border-red-700'}`}>
          <div className="flex items-start gap-3 p-4">
            {/* icon */}
            <div className="flex-shrink-0 mt-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M11.998 13.333a1 1 0 100-2 1 1 0 000 2z" fill="#fff"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 16a1 1 0 100-2 1 1 0 000 2zm-1-8a1 1 0 012 0v4a1 1 0 11-2 0V10z" fill="#fff"/>
              </svg>
            </div>

            {/* content */}
            <div className="flex-1">
              <p className="font-semibold">{color==='green' ? 'Submission completed':'Submission failed'}</p>
              <p className="text-sm mt-1 leading-tight text-red-100">{message}</p>
            </div>

            {/* close */}
            <button
              onClick={onClose}
              aria-label="Close"
              className={`ml-2 -mr-1 mt-1 rounded-md p-1 hover:bg-${color}-700/30 transition`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          
        </div>
      </div>
    </div>
  );
};



