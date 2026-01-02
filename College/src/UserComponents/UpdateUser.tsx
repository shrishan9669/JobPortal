import { CiLocationOn } from "react-icons/ci";
import { FaPhone, FaUserCircle } from "react-icons/fa";
import { PiShoppingBagOpenLight } from "react-icons/pi";

import { FiEdit2 } from "react-icons/fi";
import { TiShoppingBag } from "react-icons/ti";
import { MdDeleteOutline, MdOutlineEdit, MdOutlineEmail, MdOutlineRadioButtonChecked } from "react-icons/md";
import { LuClipboardCopy } from "react-icons/lu";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Spinner } from "../components/loader";
import { GiTireIronCross } from "react-icons/gi";
import { RxCross1, RxCrossCircled } from "react-icons/rx";
import { X } from "lucide-react";
export default function UpdateUser(){

    const[name,setName] = useState('');
    const[email,setEmail] = useState('');
    const[city,setCity] = useState('');
    const[experience,setExp] = useState('');
    const[phone,setPhone] = useState('');
    const[updated,setUpdated] = useState('');
    const [verified,setVerified] = useState('not-verified');
    const [availability,setAvailable] = useState('')
    async function UserDetails(){
        try{
            const Details = await axios({
                url:`http://localhost:3000/user/BasicDetails`,
                method:'GET',
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token') || ""}`
                }
            })
            console.log(Details.data)

            if(Details.data && Details.data.user){
               setName(Details.data.user.name);
               setEmail(Details.data.user.email);
               setVerified(Details.data.user.emailVerify)
               setPhone(Details.data.user.phone);
               setExp(Details.data.user.experience);
               setCity(Details.data.user.location);
               setUpdated(formatDate(Details.data.user.updatedAt))
               setAvailable(Details.data.user.availability)

            }
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
         UserDetails()
    },[])


    // Pop ups
    const[showDisability,setShowDisability] = useState(true)
    const[DisabilityPopup,setDisabilityPopup] = useState(false);
    const[personalPopup,setPersonalPopup] = useState(false);
    const[careerPopup,setCareerPopup] = useState(false);
    const [key_skillsPopup,setKeySkillsPopup] = useState(false)
    const [eduPopup,setEdupopup] = useState(false)
    const [editUser,setEditUser] = useState(false)
    
   

    //  Getting disability
     const [disability,setDisability] = useState('');
     const [military,setMilitary] = useState('');
     const [careerBreak,setBreak] = useState('');
     const [keySkills,setKeySkills] = useState<String []>([]);
     const [preObj,setRowId] = useState({})
     const [personalObj,setPersonalObj] = useState({
            gender:'',
            maritalStatus:'',
            dateofBirth:'',
            category:'',
            moreInfo:[],
            address:"",
            language:[] 
            
        })

        interface EducationType{
            education:''
            marks:''
            passout:''
            startingCourse:''
            endingCourse:''
            course:''
            courseType:''
            gradingSystem:''
            medium:''
            board:''
        }
     const [educationSet,setEducationSet] = useState<EducationType[]>([])



        async function GetDiversity(){
            try{
                const Got = await axios({
                    url:`http://localhost:3000/user/getDisability?email=${localStorage.getItem('email')}`,
                    method:'GET',
                    
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem('token') || ""}`
                    }
                })

                if(Got.data){
                    setDisability(Got.data.disability);
                    setMilitary(Got.data.militaryExp);
                    setBreak(Got.data.careerBreak)
                }


            }
            catch(err){
                console.log(err);
            }
        
        }

        async function GettingAlreadySkills(){
            try{
                const Data = await axios({
                    url:'http://localhost:3000/user/getKeySkills',
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem('token')}`
                    },
                    method:'GET'
                })

                if(Data.data && Data.data.ok){
                    setKeySkills(Data.data.skills);
                }
            }
            catch(err){
                console.log(err)
                alert(err)
            }
        }

       


        async function Getting_PersonalDetails(){
            try{
                const FinalData = await axios({
                    url:'http://localhost:3000/user/getPersonalDetails',
                    method:'GET',
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem('token')}`
                    }
                })

                if(FinalData.data && FinalData.data.data.Personal){
                    setPersonalObj({
                        gender:FinalData.data.data.Personal.gender,
                        category:FinalData.data.data.Personal.category,
                        maritalStatus:FinalData.data.data.Personal.maritalStatus,
                        moreInfo:FinalData.data.data.Personal.moreInfo,
                        dateofBirth:FinalData.data.data.Personal.dateofBirth,
                        address:FinalData.data.data.Personal.permanentAddress,
                        language:FinalData.data.data.Language
                    })
                }


            }
            catch(err){
                console.log(err)
            }
        }

        async function Getting_Educational(){
            try{
                 const Getting = await axios({
                    url:'http://localhost:3000/user/getEducation',
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem('token')}`
                    },
                    method:'GET'
                 })

                 if(Getting.data && Getting.data.ok){
                    setEducationSet(Getting.data.education)
                 }
            }
            catch(err){
                console.log(err)
            }
        }


        

    useEffect(()=>{
           GetDiversity();
           GettingAlreadySkills();
           Getting_PersonalDetails();
           Getting_Educational();
    },[])


    function Education_Exist_OrNot(education:any){
       if(educationSet.length>0){
        return educationSet.some(each => each.education===education)
       }
    }

    function EducationType(education:any){
        if(educationSet.length>0){
            if(education==='10th' || education==='12th'){
                return 'school'
            }
            else return 'higherEducation'
        }
    }
    return (
        <div className="font-aman bg-gray-50 p-14">
               <ProfileCard availability={availability} setEditUser={setEditUser} name={name} email={email} phone={phone} updated={updated} city={city} exp={experience} verify={verified}/>


            {/* lower part */}

            <div className="max-w-6xl gap-6 mx-auto flex mt-10">
                     <QuickLinks/>

                     <div className="w-[70%] flex-col gap-4 flex">
                      {showDisability &&  <Disability_Banner setShowDisability={setShowDisability}/>}
                       

                        <ResumeUpdate/>

                         {/* Key skills */}

                         <div id="KeySkills" className="p-4 bg-white flex flex-col shadow-sm gap-5 rounded-2xl">
                            <div className="flex font-medium items-center gap-3">
                                Key skills <MdOutlineEdit onClick={()=> setKeySkillsPopup(true)}  className="text-slate-500 cursor-pointer"/>
                            </div>


                            {!keySkills.length &&  <div className="flex gap-3 text-slate-500 text-sm">
                               Recruiter prefer specific skills before hiring.
                            </div>}
                           
                             
                             {keySkills.length > 0   &&  <div className="flex flex-wrap gap-2">
                            {
                                keySkills.map((each:any)=>{
                                    return <span className="text-slate-500 bg-gray-100 rounded-full px-4 py-1 text-sm border border-gray-400 ">{each}</span>
                                })
                            }
                             </div>}
                            

                           

                         </div>

                         {/* Employement */}

                        <ReUsableCommonDiv firstSpan={'Employment'} lastSpan={'Add employment'} MainContent={'Your employment details will help recruiters understand your experience'} gap={'3'}/>

                         {/* Education */}
                         <div id="Education" className="flex flex-col bg-white gap-4  p-4 rounded-2xl">
                            <div className="flex justify-between">
                                <span className="font-medium ">Education <span   onClick={Getting_Educational}className="cursor-pointer hover:text-green-500 hover:font-medium animate-pulse ">(Reload Details)</span></span>
                                <span onClick={()=> {
                                    setRowId({})
                                    setEdupopup(true)
                                    }} className="text-blue-500 font-medium cursor-pointer">Add education</span>
                            </div>

                            <p className="text-slate-500 ">Your qualifications help employers know your educational background</p>

                             
                             <div className="flex flex-col gap-4 items-start">
                                {
                                  educationSet.map((each:any)=>{
                                    return <div>
                                        {EducationType(each.education)==='school' && <div className="flex flex-col">
                                              <span className="font-medium  flex gap-3 items-center">Class {each.education} <FiEdit2 onClick={()=> {
                                                setRowId({education:each.education,rowId:each.id})
                                                setEdupopup(true)
                                                }}  className="text-slate-500 cursor-pointer"/></span>
                                              <span className="font-medium">{each.medium}</span>
                                              <span className="text-slate-500">{each.passout}</span>
                                         </div>
                                        }
                                        {EducationType(each.education)==='higherEducation' && <div className="flex flex-col">
                                              <span className="font-medium flex gap-3 items-center">{each.education} {each.course}  <FiEdit2 onClick={()=> {
                                                setRowId({education:each.education,rowId:each.id})
                                                setEdupopup(true)
                                                }} className="text-slate-500 cursor-pointer"/></span>
                                              <span className="font-medium">{each.university}</span>
                                              <span className="text-slate-500">{each.startingCourse}-{each.endingCourse} | {each.courseType}</span>

                                         </div>
                                        }
                                    </div>
                                  })
                                }
                             </div>
                          

                            <div className="flex flex-col gap-4 items-start">

                                {!Education_Exist_OrNot('Doctorate/PhD') && <span className="text-blue-500 font-medium text-md">Add doctorate/PHD</span>}
                                {!Education_Exist_OrNot('Masters/Post-Graduation') && <span className="text-blue-500 font-medium text-md">Add masters/post-graduation</span>}
                                {!Education_Exist_OrNot('Graduation/Diploma') && <span className="text-blue-500 font-medium text-md">Add graduation/diploma</span>}
                                {!Education_Exist_OrNot('12th') &&  <span className="text-blue-500 font-medium text-md">Add class XII</span>}
                                {!Education_Exist_OrNot('10th') && <span className="text-blue-500 font-medium text-md">Add class 10th</span>}
                                
                            </div>
                         </div>

                        {/* IT skills */}
                        <ReUsableCommonDiv ID={'ITSkills'} firstSpan={'IT skills'} lastSpan={'Add Details'} MainContent={'Show your technical expertise by mentioning softwares and skills you know'} gap={'3'}/>

                        <ReUsableCommonDiv ID={'Projects'} firstSpan={'Projects'} lastSpan={'Add Projects'} MainContent={'Stand out to employers by adding details about projects that you have done so far'} gap={'3'}/>
 
                        <ReUsableCommonDiv ID={'Summary'} firstSpan={'Profile Summary'} lastSpan={'Add profile summary'} MainContent={'Highlight your key career achievements to help employers know your potential'} gap={'3'}/>


                        {/* Accomplishments */}
                        
                        <div id="Accomplishments" className="bg-white rounded-2xl gap flex flex-col gap-4 p-4">
                            <div className="flex flex-col gap-3">
                                <span className="font-medium">Accomplishments</span>
                                <p className="text-slate-500">Showcase your credentials by adding relevant certifications, work samples, online profiles, etc.</p>
                            </div>

                            {/* Adding links */}
                            <div  className="flex flex-col gap-5">
                        <div className="flex  p-2  border-b border-dotted border-gray-400 flex-col gap-2">
                                <div className="flex justify-between">
                                    <span className="font-medium">Online profile</span>
                                    <span className="text-blue-500 font-medium">Add</span>
                                </div>
                                <p className="text-slate-600">Add link to online professional profiles (e.g. LinkedIn, etc.)</p>
                            </div>
                            <div className="flex p-2  flex-col gap-2  border-b border-gray-400 border-dotted">
                                <div className="flex justify-between">
                                    <span className="font-medium">Work sample</span>
                                    <span className="text-blue-500 font-medium">Add</span>
                                </div>
                                <p className="text-slate-600">Link relevant work samples (e.g. Github, Behance)</p>
                            </div>
                            <div className="flex p-2  flex-col gap-2  border-b border-gray-400 border-dotted">
                                <div className="flex justify-between">
                                    <span className="font-medium">White paper / Research publication / Journal entry</span>
                                    <span className="text-blue-500 font-medium">Add</span>
                                </div>
                                <p className="text-slate-600">Add links to your online publications</p>
                            </div>
                            <div className="flex p-2  flex-col gap-2  border-b border-gray-400 border-dotted">
                                <div className="flex justify-between">
                                    <span className="font-medium">Add links to your online publications</span>
                                    <span className="text-blue-500 font-medium">Add</span>
                                </div>
                                <p className="text-slate-600">Add links to your online presentations (e.g. Slide-share presentation links etc.)</p>
                            </div>
                            <div className="flex  p-2 flex-col gap-2  border-b border-gray-400 border-dotted">
                                <div className="flex justify-between">
                                    <span className="font-medium">Patent</span>
                                    <span className="text-blue-500 font-medium">Add</span>
                                </div>
                                <p className="text-slate-600">Add details of patents you have filed</p>
                            </div>
                            <div className="flex p-2  flex-col gap-2">
                                <div className="flex justify-between">
                                    <span className="font-medium">Certification</span>
                                    <span className="text-blue-500 font-medium">Add</span>
                                </div>
                                <p className="text-slate-600">Add details of certifications you have completed</p>
                            </div>
                            </div>

                            
                        </div>


                        {/* Career profile */}
                         <div id="CareerProfile" className="flex  gap-10 mx-auto p-6 bg-white rounded-2xl shadow-lg">
       
                <div className="w-full">
                    {/* Main Heading */}
                    <div className="flex items-center gap-4 w-full mb-5">
            <h1 className="text-lg  font-medium text-gray-800">Career profile</h1>
                <MdOutlineEdit onClick={()=> setCareerPopup(true)} className="text-slate-500"/>
                    </div>
                
                
                {/* Current Industry */}
                <div className="mb-4">
                    <span className="text-gray-500 ">Current industry</span>
                    <p className="text-gray-800">Miscellaneous</p>
                </div>

                {/* Desired Job Type */}
                <div className="mb-4">
                    <span className="text-gray-500">Desired job type</span>
                    <p className="text-blue-500 font-medium">Add desired job type</p>
                </div>

                {/* Preferred Shift */}
                <div className="mb-4">
                    <span className="text-gray-500">Preferred shift</span>
                    <p className="text-blue-500 font-medium">Add preferred shift</p>
                </div>

                {/* Expected Salary */}
                <div className="mb-6">
                    <span className="text-gray-600 font-medium">Expected salary</span>
                    <p className="font-medium text-slate-600">¥1,20,000</p>
                </div>
                </div>

                
                <div className="flex justify-center pt-10 flex-col">
                    {/* Department */}
                <div className="mb-4">
                    <h3 className="  text-gray-500 mb-2">Department</h3>
                    <p className="text-blue-500 font-medium">Add department</p>
                </div>

                {/* Desired Employment Type */}
                <div className="mb-4">
                    <span className="text-gray-500">Desired employment type</span>
                    <p className="text-blue-500 font-medium">Add desired employment type</p>
                </div>

                {/* Preferred Work Location */}
                <div className="mb-4">
                    <span className="text-gray-500">Preferred work location</span>
                    <p className="text-gray-800 font-medium">
                    Guna, Kolkata, Ahmedabad, Noida, Pune, Mumbai, Bangalore/Bengaluru, Delhi / NCR
                    </p>
                </div>
                </div>

                
                         </div>

                         {/* Personal details */}
                         <div id="PersonalDetails" className="p-4 rounded-2xl shadow-lg bg-white flex flex-col gap-5">
                            
                            <div className="flex gap-3 items-center">
                                <span className="font-medium">Personal details</span>
                                <MdOutlineEdit onClick={()=> setPersonalPopup(true)}/>
                            </div>

                             <p>This information is important for employers to know you better</p>
                            
                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex flex-col gap-1">
                                    <span className="text-slate-500">Personal</span>
                                    <p className="text-blue-500 font-medium flex gap-2">{personalObj.gender ? <span className="text-slate-700 flex items-center">{personalObj.gender}</span>:'Gender'} , {personalObj.maritalStatus ? <span className="text-slate-700 flex items-center">{personalObj.maritalStatus}</span>:'Marital Status'}, {personalObj.moreInfo ? <span className="text-slate-700 flex items-center">{personalObj.moreInfo.join(',')}</span>:'Add more info'}</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-slate-500">Date of Birth</span>
                                    <p className="text-blue-500 font-medium">
                                        {personalObj.dateofBirth ? <span className="text-slate-600">{formatDate(personalObj.dateofBirth)}</span>:'Add date of birth'}
                                    </p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-slate-500">Category</span>
                                    <p className="text-blue-500 font-medium">{personalObj.category ? <span className="text-slate-700">{personalObj.category}</span>:'Add category'}</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-slate-500">Work permit</span>
                                    <p className="text-blue-500 font-medium">Add work permit</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-slate-500">Address</span>
                                    <p className="text-blue-500 font-medium">{personalObj.address ? <span className="text-slate-700">{personalObj.address}</span>:'Add address'}</p>
                                </div>

                               {!personalObj.language.length && <div className="flex flex-col gap-1">
                                    <span className="text-slate-500">Languages</span>
                                    <p className="text-blue-500 font-medium">Add languages</p>
                                </div>
                               }
                               
                            </div>

                           
                            <div className="mt-6">
  <div className="flex justify-between items-center mb-4">
    <span className="text-lg font-semibold text-gray-800">Languages</span>
    <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition">
      Add Languages
    </button>
  </div>

  <div className="overflow-x-auto">
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr className="bg-gray-100 border-b border-gray-400 text-left">
          <th className="py-3 px-4 font-semibold text-gray-700">Language</th>
          <th className="py-3 px-4 font-semibold text-gray-700">Proficiency</th>
          <th className="py-3 px-4 font-semibold text-gray-700">Read</th>
          <th className="py-3 px-4 font-semibold text-gray-700">Write</th>
          <th className="py-3 px-4 font-semibold text-gray-700">Speak</th>
        </tr>
      </thead>

      <tbody>
        {personalObj.language.map((eachObj: any, index: number) => (
          <tr
            key={index}
            className="border-b border-gray-400 hover:bg-gray-50 transition"
          >
            <td className="py-2 px-4 text-gray-800">{eachObj.language}</td>
            <td className="py-2 px-4 text-gray-800">{eachObj.proficiency}</td>
            <td className="py-2 px-4">{eachObj.canRead ? <MdOutlineRadioButtonChecked /> :<RxCrossCircled />}</td>
            <td className="py-2 px-4">{eachObj.canWrite ? <MdOutlineRadioButtonChecked /> : <RxCrossCircled />}</td>
            <td className="py-2 px-4">{eachObj.canSpeak ? <MdOutlineRadioButtonChecked /> : <RxCrossCircled />}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
                            </div>

                         </div>



                         {/* Diversity inclusion */}
                         <div className="px-4 pb-4 flex flex-col gap-4 bg-white rounded-2xl">
                             <div className=" flex pr-5 justify-end">
                                <span className="text-purple-400 bg-purple-300 rounded-b-2xl px-2 text-sm">New</span>    
                             </div>

                             <div>
                                <div className="flex gap-4 items-center">
                                    <span className="font-medium">Diversity & inclusion</span>
                                    <MdOutlineEdit onClick={()=> setDisabilityPopup(true)}  className="text-slate-500 cursor-pointer"/>
                                </div>
                                <p className="text-slate-500 mt-3">Share details to attract recruiters who value people from different backgrounds</p>


                                <div className="flex flex-col gap-5 mt-4">
                                    {/* Disability */}
                                    {disability &&  <div className="flex flex-col gap-1">
                                        <span className="text-slate-400 text-sm">Disability status</span>
                                        <span className="text-slate-600 font-medium text-md">{disability==='true' ? "I have a disability":"Do not have disability"}</span>

                                    </div>}
                                    
                                    {!disability &&   <span onClick={()=> setDisabilityPopup(true)} className="text-blue-500 font-medium cursor-pointer">Add disability status</span>}

 
                                    {/* MilitaryExperience */}
                                    {military &&  <div className="flex flex-col gap-1">
                                        <span className="text-slate-400 text-sm">Military Experience</span>
                                        <span className="text-slate-600 font-medium text-md">{military}</span>

                                    </div>}
                                  
                                  {!military && <span  onClick={()=> setDisabilityPopup(true)} className="text-blue-500 font-medium cursor-pointer">Add military experience</span>}


                                  {/* CareerBreak */}
                                  {careerBreak &&  <div className="flex flex-col gap-1">
                                        <span className="text-slate-400 text-sm">Career Break</span>
                                        <span className="text-slate-600 font-medium text-md">{careerBreak}</span>

                                    </div>}
                                    
                                    {!careerBreak && <span  onClick={()=> setDisabilityPopup(true)} className="text-blue-500 font-medium cursor-pointer">Add career break</span>}
                                    
                                </div>
                             </div>

                             
                         </div>

                         {DisabilityPopup && <Diversity_Inclusion disability={disability} setDisabilityPopup={setDisabilityPopup}/>}

                             {personalPopup && <PersonalDetails onClose={()=> setPersonalPopup(false)}/>}

                             {careerPopup && <CareerProfile onClose={()=> setCareerPopup(false)}/>} 
                             {key_skillsPopup && <KeySkills_Div onClose={()=> setKeySkillsPopup(false)}/>} 
                              {eduPopup && <EducationDiv preObject={preObj || ""}  onClose={()=> setEdupopup(false)}/>}  
                                    
                     </div>
            </div>

          {editUser && <BasicDetailsModal availability={availability} name={name} city={city} phone={phone} exp={experience} email={email} onClose={()=> setEditUser(false)}/>}
        </div>
    )
}


function BasicDetailsModal({onClose,name,city,phone,exp,email,availability}:any) {
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

const [showLocation,setShowLocation] = useState(false)
const [showMobile,setShowMobile] = useState(false);
const [showEmail,setShowEmail] = useState(false)


const [newObj,setNewObj] = useState({
  name:name,
  location:city,
  phone:phone,
  email:email,
  experience:exp,
  availability:availability
})
const [loading,setLoading] = useState(false)
const [prefLocations,setPrefLocations] = useState<string[]>([]);
const [prefRoles,setPrefRoles] = useState<string[]>([])

function AddLocation(location:string){
    const exist = prefLocations.some(each => each===location)
  if(!exist){
    setPrefLocations(pref => ([...pref,location]))
  }
}
function removeLocation(location:string){
  setPrefLocations(pref => (pref.filter(each => each!==location)))
}
function AddRoles(role:string){
  const exist = prefRoles.some(each => each===role)
  if(!exist){
    setPrefRoles(prev => ([...prev,role]))
  }
}

function RemoveRole(role:string){
  setPrefRoles(prev => (prev.filter(each => each!==role)))
}
async function UpdateUser(){
    setLoading(true)

    try{
       const Updated = await axios({
        url:'http://localhost:3000/user/userUpdate',
        data:{
          newObj,
          prefRoles,
          prefLocations
        },
        method:'POST',
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
       })

       if(Updated.data && Updated.data.ok){
         alert(Updated.data.msg)
        
         onClose();
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
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="w-full h-[600px] no-scrollbar overflow-y-scroll max-w-xl bg-white rounded-xl shadow-xl p-6 relative">
        {/* Close button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>

        {/* Title */}
        <h2 className="text-lg font-semibold mb-6">Basic details</h2>

        {/* Name */}
        <div className="mb-5">
          <label className="block text-sm font-medium mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            onChange={(e)=> setNewObj(prev => ({...prev,name:e.target.value}))}
            type="text"
            defaultValue={name}
            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

       

        {/* Work Experience */}
        <div className="mb-6">
          <p className="text-sm font-medium mb-2">Work Experience</p>
          <p className="text-xs text-gray-500 mb-3">
            We will personalise your Naukri experience based on this
          </p>
          <select
          onChange={(e)=> setNewObj(prev => ({...prev,experience:e.target.value}))}
          className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" name="" id="">
            <option value="" hidden>Select Exp</option>
            
            {
              experiencesList.map(each => {
                return <option value={each}>{each} yrs</option>
              })
            }

          </select>
        </div>

        {/* Location */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">
            Current location <span className="text-red-500">*</span>
          </label>
          <p className="text-xs text-gray-500 mb-3">
            This helps us match you to relevant jobs
          </p>
          
         <div className="relative w-full">
            <input
              
              value={newObj.location}
              onClick={()=> setShowLocation(prev => !prev)}
              onChange={(e)=> setNewObj(prev => ({...prev,location:e.target.value}))}
              type="text"
              placeholder="Type location"
              className="w-full border rounded-lg px-3 py-2"
            />

            <div className={`absolute ${showLocation ? 'block':'hidden'} h-[200px] overflow-y-scroll p-2 w-full bg-white border rounded-lg mt-1 shadow`}>
              {
                jobLocations.map(each => {
                  return <p onClick={()=>{
                    setNewObj(prev => ({...prev,location:each}));
                    setShowLocation(false)
                  }} className="hover:bg-gray-100 p-1" key={each}>{each}</p>
                })
              }
            </div>
          </div>
        </div>


        {/* preferred locations */}
        <div>
              <label className="block font-medium text-gray-700 mb-1">
                Prefered locations *
              </label>

              <div className='flex mt-2 flex-wrap gap-2'>
                {
                  prefLocations.map(e=>{
                    return <span className='px-3 flex items-center gap-2 py-1 text-white bg-black rounded-2xl' key={e}>{e} <span onClick={()=>{
                      removeLocation(e)
                    }} className='font-semibold cursor-pointer'>X</span></span>
                  })
                }
              </div>
              <select
                onChange={(e)=>{
                     AddLocation(e.target.value)
                }}
              className="w-full mt-3 text-slate-500 p-3 border rounded-lg focus:outline-blue-500" name="" id="">
                <option value="" hidden>Location</option>
                {
                  topITLocationsIndia.map(each => {
                    return <option value={each}>{each}</option>
                  })
                }
              </select>
        </div>

        {/* Job Roles Interests*/}
          <div className="mt-5">
              <label className="block font-medium text-gray-700 mb-1">
                Select Job Roles *
              </label>

              <div className='flex mt-2 flex-wrap gap-2'>
                {
                  prefRoles.map(e=>{
                    return <span className='px-3 flex items-center gap-2 py-1 text-white bg-black rounded-2xl' key={e}>{e} <span onClick={()=>{
                      RemoveRole(e)
                    }} className='font-semibold cursor-pointer'>X</span></span>
                  })
                }
              </div>
              <select
                onChange={(e)=>{
                     AddRoles(e.target.value)
                }}
              className="w-full mt-3 text-slate-500 p-3 border rounded-lg focus:outline-blue-500" name="" id="">
                <option value="" hidden>Roles</option>
                {
                  jobRoles.map(each => {
                    return <option value={each}>{each}</option>
                  })
                }
              </select>
          </div>

        {/* Mobile */}
        <div className="mb-5 mt-5">
          <label className="block text-sm font-medium mb-1">
            Mobile number <span className="text-red-500">*</span>
          </label>
          <p className="text-sm text-gray-700">{phone}</p>
          <p onClick={()=> setShowMobile(prev => !prev)} className="text-sm text-blue-600 cursor-pointer">{showMobile ? `Don't Change Number`:`Change mobile number`}</p>

          {
          showMobile && <div>
              <input onChange={(e)=> setNewObj(prev => ({...prev,phone:e.target.value}))} type="text"  className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
          </div>
          }
        </div>

        {/* Email */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">
            Email address <span className="text-red-500">*</span>
          </label>
          <p className="text-sm text-gray-700">{email}</p>
          <p onClick={()=> setShowEmail(prev => !prev)} className="text-sm text-blue-600 cursor-pointer">{showEmail ? `Don't Change Email`:`Change Email`}</p> 
          {
            showEmail && <div>
              <input
               onChange={(e)=> setNewObj(prev => ({...prev,email:e.target.value}))}
               type="text" className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          }
          
          </div>
          
          


        {/* Availability */}
        <div className="mb-8">
          <p className="text-sm font-medium mb-3">Availability to join</p>
          <div className="flex flex-wrap gap-3">
            {["15 Days or less", "1 Month", "2 Months", "3 Months", "More than 3 Months"].map(
              (item) => (
                <span
                  onClick={()=> setNewObj(prev => ({...prev,availability:item}))}
                  key={item}
                  className={`px-4 py-1.5 border ${newObj.availability===item ? 'bg-gray-100':''} rounded-full text-sm cursor-pointer hover:bg-gray-100`}
                >
                  {item}
                </span>
              )
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="text-blue-600">Cancel</button>
          <button
          onClick={UpdateUser}
          className="bg-blue-600 flex justify-center text-white px-6 py-2 rounded-full">
            {loading ? <Spinner/>:'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}




function ReUsableCommonDiv({firstSpan,lastSpan,MainContent,gap,ID}:any){

     const [ResumeAndSummaryShow,setResumeandSummaryShow] = useState(false);
     const [it_skillsPopup,setITSkillsPopup] = useState(false);
     const [employementPopup,setEmployePopup] = useState(false);
     const [projectPopup,setProjectPopup] = useState(false)

    const[content,setContent] = useState('')
    const[It_Skills,setITSkill] = useState([]);
    const [projects,setProjects] = useState([])
    const [loading,setLoading] = useState(false)
    const [rowId,setRowId] = useState('');
    async function Getting_WideRangeOfData(){
        try{
           const GettingData = await axios({
            url:`http://localhost:3000/user/${ID}?email=${localStorage.getItem('email')}`,
          
            method:'GET',
            
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token') || ""}`
                }
           }) 

           if(GettingData.data && GettingData.data.ok){
            if(ID === 'Summary'){
                setContent(GettingData.data.Data)
            }
           }

        }
        catch(err){
          console.log(err)
        }

    }


    async function Getting_ITSkills(){
         try{
              const Getting = await axios({
                url:'http://localhost:3000/user/getItSkills',
                method:"GET",
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
              })

              if(Getting.data && Getting.data.ok){
                   setITSkill(Getting.data.AllSkills)
              }
         }
         catch(err){
            console.log(err)
         }
    }

    async function Getting_Projects(){
      try{
          const Projects = await axios({
            url:'http://localhost:3000/user/getProjects',
            method:'GET',
            headers:{
              Authorization:`Bearer ${localStorage.getItem('token')}`
            }
          })

          if(Projects.data && Projects.data.ok){
                setProjects(Projects.data.projects)
          }
      }
      catch(err){
        console.log(err)
      }
    }

    async function DeleteProject(Rowid:any){
      setLoading(true)
         try{
            const Response = await axios({
              url:`http://localhost:3000/user/deleteProject?projectRowId=${Rowid}`,
              method:'DELETE',
              headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
              }
            })

            if(Response.data && Response.data.ok){
              Getting_Projects()
            }
         }
         catch(err){
          console.log(err)  
         }
         finally{
          setLoading(true)
         }
    }

    useEffect(()=>{
           if(ID==='Summary'){
            Getting_WideRangeOfData()
           }
           if(ID==='ITSkills'){
            Getting_ITSkills()
           }
           if(ID==='Projects'){
              Getting_Projects()
           }
           
    },[])
   return (
    <div id={ID} className={`p-4 flex flex-col bg-white shadow-sm gap-${gap} rounded-2xl`}>
         <div className="flex justify-between">
            <span className="font-medium flex items-center gap-2">{firstSpan} {firstSpan==='Profile Summary' ? <MdOutlineEdit onClick={()=> setResumeandSummaryShow(true)} className="text-slate-500 cursor-pointer"/>:''}</span>
            {lastSpan && <span onClick={()=>{
                
            firstSpan==='IT skills' ? setITSkillsPopup(true):''
            firstSpan==='IT skills' ? setRowId(""):''

            firstSpan==='Employment' ? setEmployePopup(true):''

            firstSpan==='Projects' ? setProjectPopup(true):''
            
                
            }} className="font-medium text-blue-500 cursor-pointer">{lastSpan}</span>}
         </div>

         <div>
            <p className="text-slate-500 text-sm">{content ? content:MainContent}</p>
           
         </div>

{/* Showing the pop up */}
         {ResumeAndSummaryShow && <Headline_And_ProfileSummary_Div id={'ProfileSummary'} Headline={'Profile Summary'} Description={'Give recruiters a brief overview of the highlights of your career, key achievements, and career goals to help recruiters know your profile better.'} onClose={()=> setResumeandSummaryShow(false)}/>}


         {it_skillsPopup && <IT_Skills rowId={rowId || ""} onClose={()=> setITSkillsPopup(false)}/>}   
         {employementPopup && <Employement_PopUp onClose={()=> setEmployePopup(false)}/>}
         {projectPopup && <ProjectDiv onClose={()=> setProjectPopup(false)}/>}

    {/* It skills dekhane ke liye... */}
        {ID==='ITSkills' && 
        <div className="overflow-x-auto">
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr className=" border-b border-gray-400 text-left">
          <th className="py-3 px-4 font-medium text-gray-500">Skills</th>
          <th className="py-3 px-4 font-medium text-gray-500">Version</th>
          <th className="py-3 px-4 font-medium text-gray-500">Last used</th>
          <th className="py-3 px-4 font-medium text-gray-500">Experience</th>
          
        </tr>
      </thead>

      <tbody>
        {It_Skills.map((eachObj: any, index: number) => (
          <tr
            key={index}
            className="border-b border-gray-400 hover:bg-gray-50 transition"
          >
            <td className="py-2 px-4 text-gray-800">{eachObj.skill || "--------"}</td>
            <td className="py-2 px-4 text-gray-800">{eachObj.version || "-------"}</td>
            <td className="py-2 px-4">{eachObj.lastused || "-------"}</td>
            <td className="py-2 px-4">{eachObj.expYears} {eachObj.expMonths || "--------"}</td>
            <td className="py-2 px-4"><MdOutlineEdit className="cursor-pointer text-slate-500"  onClick={()=>{
                    setRowId(eachObj.id.toString());
                    setITSkillsPopup(true)
            }}/></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
        }


      {/* Projects dekhane ke liye... */}

      {
        ID==='Projects' && 

        <div className="flex flex-col gap-3">


          
          { projects.length>0  &&
             projects.map((each:any) => {
              return <div className="flex flex-col">
                 <span className="flex items-center gap-2">{each.projectTitle} {loading ? <Spinner/>:<MdDeleteOutline  
                 onClick={()=> DeleteProject(each.id)}
                 
                 className="text-slate-500 cursor-pointer text-lg hover:text-slate-700"/>} </span>
                 <span>{each.client}</span>
                 <span className="text-slate-500 font-normal">{each.startMonth} {each.startYear}</span>
                 <span className="text-slate-500">{each.description}</span>
              </div>
             })
          }
            
        </div>
      }


         



    </div>
   )
}

function formatDate(isoString:any) {
  const date = new Date(isoString);

const options: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "short",
  year: "numeric",
};  // ye "Oct 16, 2025" jaisa return karega
const formatted = new Date(isoString).toLocaleDateString("en-GB", options);
  // optional: agar tu chahata hai month pehle aaye "16 Oct, 2025"
  const parts = formatted.split(" ");
  return `${parts[0]} ${parts[1]}, ${parts[2]}`;
}

function ProfileCard({setEditUser,name,email,phone,city,exp,updated,verify,availability}:any) {
    const [showVerifyEmail,setShowEmail]  = useState(false)
  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 w-full max-w-6xl mx-auto ">
       {/* left part */}

       <div className="flex w-[70%] items-center">
        {/* UserProfilPicture */}
        <div>
            <FaUserCircle className="text-slate-400 hover:text-black/50 cursor-pointer w-[140px] h-[140px]" />
            
        </div>

        <div className=" w-full p-3 flex-col flex gap-3">
            {/* Name */}
            <div>
                <span className="flex items-center text-xl font-semibold gap-7">{name?.toUpperCase()} <FiEdit2 
                onClick={()=> setEditUser(true)}
                className="text-lg cursor-pointer text-slate-500"/></span>
                <span>Profile last updated - {updated}</span>
            </div>

            <div className="border-t w-full text-slate-200">

            </div>

            <div className="flex items-center justify-between p-4 ">
                {/* city part */}
                <div className="flex flex-col gap-3">
                    <span className="text-slate-700 flex items-center gap-3"><CiLocationOn />{city}</span>
                    <span className="text-slate-700 flex items-center gap-3"><TiShoppingBag /> {exp[0]?.toUpperCase() + exp?.slice(1).toLowerCase()}</span>
                    <span className="text-slate-700 flex items-center gap-3"><PiShoppingBagOpenLight />{availability || 'Add availabiltiy to join' }</span>
                </div>

                <div className="w-px bg-gray-300 h-20"></div>

                <div className="flex flex-col gap-3">
                    <span className="flex gap-2 items-center text-slate-700"><FaPhone/>{phone}</span>
                    <span className="flex gap-2 items-center text-slate-700"><MdOutlineEmail /> {email} {verify==='Verified' ? <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="12" r="10" fill="#10b981"/>
                    <path 
                      d="M8 12L11 15L16 9" 
                      stroke="white" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    /></svg>:<span className="text-blue-500 font-medium hover:text-blue-600 cursor-pointer"
                    onClick={()=> setShowEmail(true)}
                    >Verify</span>} </span>
                </div>
            </div>
        </div>
       </div>

       <div className="w-[30%] bg-orange-100 gap-3 flex-col flex rounded-xl p-5">
               <div className="flex justify-between">
                    <div className="flex gap-3  items-center">
                        <MdOutlineEmail className="text-xl text-slate-500"/>
                        <span className="text-gray-600">Verify email</span>
                    </div>

                    <span className="text-green-400 rounded-full w-10 flex justify-center items-center bg-white">5%</span>
                    </div>
               <div className="flex justify-between">
                 <div className="flex gap-3 items-center">
                        <CiLocationOn className="text-xl  text-slate-500"/>
                        <span className="text-gray-600">Add prefered location</span>
                    </div>

                    <span className="text-green-400 rounded-full w-10 flex justify-center items-center bg-white">2%</span>
               </div>
               <div className="flex justify-between">
                 <div className="flex gap-3  items-center">
                        <LuClipboardCopy className="text-xl  text-slate-500"/>
                        <span className="text-gray-600">Add resume</span>
                    </div>

                    <span className="text-green-400 rounded-full w-10 flex justify-center items-center bg-white">10%</span>
               </div>

               <div className="flex justify-center">
                <button className="bg-orange-600 rounded-full text-white px-4 py-2 font-semibold">Add 12 missing details</button>
               </div>
       </div>

        {showVerifyEmail && <VerifyGmail onClose={()=> setShowEmail(false)}/>}
    </div>
  );
}

function VerifyGmail({ onClose }: any) {

  const [msg,setMsg] = useState('')
  const [loading,setLoading] =useState(false)
  async function VerifyMail(){
    setLoading(true)
    try{
      const Sending = await axios({
        url:'http://localhost:3000/user/VerifyEmailLink',
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        },
        method:'POST'
      })

      if(Sending.data && Sending.data.ok) {
          setMsg('Verification email sent! Please check your inbox.')
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
    <div className="fixed inset-0 flex font-aman items-center justify-center bg-black/80 z-50">
      <div className="bg-white no-scrollbar zoom-in max-h-[600px] overflow-y-auto rounded-4xl flex flex-col gap-5 shadow-md p-8 max-w-2xl mx-auto">
        
        {/* Close Button */}
        <div className="flex items-center justify-end">
          <GiTireIronCross 
            onClick={onClose} 
            className="text-slate-500 cursor-pointer text-xl" 
          />
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Icon */}
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-bold text-gray-800">Verify Your Email Address</h2>

          {/* Description */}
          <div className="text-gray-600 space-y-4">
            <p>
              Please verify your email address to unlock all features and improve your profile visibility.
            </p>
            
            <div className="bg-blue-50 p-4 rounded-lg text-left">
              <h3 className="font-semibold text-blue-800 mb-2">Why verified emails are preferred by recruiters?</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• <span className="font-medium">Authenticity:</span> Confirms your identity and professionalism</li>
                <li>• <span className="font-medium">Reliability:</span> Ensures recruiters can reach you easily</li>
                <li>• <span className="font-medium">Seriousness:</span> Shows you're genuinely seeking opportunities</li>
                <li>• <span className="font-medium">Security:</span> Reduces fake profiles and spam</li>
                <li>• <span className="font-medium">Priority:</span> Verified profiles often appear higher in search results</li>
              </ul>
            </div>

            <p className="text-sm text-gray-500">
              Recruiters are 3x more likely to contact candidates with verified email addresses.
            </p>
          </div>

          {/* Verify Button */}
          <button onClick={VerifyMail} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-105">
            {loading ? <Spinner/>:'Verify Email Address'}
          </button>

          <p className="text-purple-500 animate-pulse font-medium" hidden={!msg}>{msg}</p>

          {/* Resend Option */}
          <p className="text-sm text-gray-500">
            Didn't receive the verification email?{" "}
            <button className="text-blue-600 hover:text-blue-700 font-medium underline">
              Resend Verification Link
            </button>
          </p>
        </div>


        

      </div>
    </div>
  )
}


function QuickLinks(){

    function scrolltoId(id:any){
       const element = document.getElementById(id);
       if(element){
        element.scrollIntoView({
            behavior:'smooth',
            block:'start'
        })
       }
    }
    return (
        <div className="border max-h-[550px] sticky rounded-xl p-5 w-[30%] border-gray-300 bg-white flex flex-col gap-5">
            <div className="flex justify-start font-medium">
                <h1 className="text-xl">Quick Links</h1>
            </div> 

            <div className="flex flex-col gap-1">
                <div className="flex hover:bg-gray-50 p-2 rounded-full hover:font-medium justify-between items-center">
                    <a onClick={(e)=>{
                         e.preventDefault()
                        scrolltoId('Resume')
                    }} className="cursor-pointer">Resume</a>
                    <span className="text-blue-500 font-medium">Upload</span>
                </div>
                <div onClick={()=>scrolltoId('Headline')} className="flex hover:bg-gray-50 p-2 rounded-fullcursor-pointer justify-between items-center hover:font-medium">
                    <span>Resume headline</span>
                    
                </div>
                <div className="flex justify-between hover:bg-gray-50 p-2 hover:font-medium rounded-full items-center">
                    <span onClick={()=>scrolltoId('KeySkills')} className="cursor-pointer">Key skills</span>
                    <span className="text-blue-500 font-medium">Add</span>
                </div>
                <div className="flex justify-between hover:bg-gray-50 p-2 hover:font-medium rounded-full items-center">
                    <span onClick={()=>scrolltoId('Education')} className="cursor-pointer">Education</span>
                    <span className="text-blue-500 font-medium">Add</span>
                </div>
                <div className="flex justify-between hover:bg-gray-50 p-2 hover:font-medium rounded-full items-center">
                    <span onClick={()=>scrolltoId('KeySkills')} className="cursor-pointer">IT skills</span>
                    <span className="text-blue-500 font-medium">Add</span>
                </div>
                <div className="flex justify-between hover:bg-gray-50 p-2 hover:font-medium rounded-full items-center">
                    <span onClick={()=>scrolltoId('Projects')} className="cursor-pointer">Projects</span>
                    <span className="text-blue-500 font-medium">Add</span>
                </div>
                <div className="flex justify-between hover:bg-gray-50 p-2 hover:font-medium rounded-full items-center">
                    <span onClick={()=>scrolltoId('Summary')} className="cursor-pointer">Profile summary</span>
                    <span className="text-blue-500 font-medium">Add</span>
                </div>

                <div onClick={()=>scrolltoId('Accomplishments')} className="flex hover:font-medium hover:bg-gray-50 p-2 rounded-full justify-start cursor-pointer">Accomplishments</div>
                <div onClick={()=>scrolltoId('CareerProfile')} className="flex hover:font-medium hover:bg-gray-50 p-2 rounded-full cursor-pointer justify-start">Career profile</div>
                <div onClick={()=>scrolltoId('PersonalDetails')} className="flex  hover:bg-gray-50 p-2 rounded-full hover:font-medium cursor-pointer justify-start">Personal details</div>
            </div>
                 
        </div>
    )
}

function Disability_Banner({setShowDisability}:any){
    const [loading,setLoading] = useState(false);
    const [disability,setDisability] = useState('');
    async function Disability(){
        setLoading(true)
        try{
          const Posting = await axios({
            url:"http://localhost:3000/user/disability",
            data:{
               disability:disability,
               email:localStorage.getItem('email')
            },
            method:'POST',
            
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token') || ""}`
                }
          })
           
          if(Posting.data && Posting.data.ok){
               setShowDisability(false)
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
        <div className="max-w-4xl w-full  pb-5 bg-white flex flex-col rounded-3xl">

           <div className="flex justify-end  pr-5">
            <span className="bg-purple-200 text-xs p-2 rounded-b-2xl text-purple-400">Diversity & inclusion</span>
           </div>

           <div className="text-xl font-semibold px-5 mt-2">
            Companies want to build inclusive teams, help us identify your disability status for better jobs.
           </div>

           <div className="flex gap-2  px-5 mt-3">
            <span onClick={(e)=>setDisability('true')} className={`border ${disability==='true' ? 'bg-gray-200':''} cursor-pointer border-gray-300 text-slate-500 text-sm rounded-full p-2`}>I have a disability</span>
            <span onClick={(e)=>setDisability('false')} className={`border ${disability==='false' ? 'bg-gray-200':''} cursor-pointer border-gray-300 text-slate-500 text-sm rounded-full p-2`}>I don't have a disability</span>
           </div>

           <div className="flex justify-end px-5">
            <button onClick={Disability} disabled={!disability} className={`bg-gray-100 transition-all duration-300 ${loading ? 'bg-gray-100 text-slate-400':''} ${disability ? 'cursor-pointer bg-purple-500 text-white':'cursor-not-allowed '} rounded-full px-4 py-2 text-slate-400`}>{loading ? "Updating...":'Submit'}</button>
           </div>

        </div>
    )
}

function ResumeUpdate(){
    const [ResumeAndSummaryShow,setResumeandSummaryShow] = useState(false);
      
      const [headline,setHeadline] = useState('');

      async function Gettingheadline(){
        try{
           const Data = await axios({
            url:`http://localhost:3000/user/resume_headline?email=${localStorage.getItem('email')}`,
            method:'GET',
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token') || ""}`
            }
           })

           if(Data.data && Data.data.ok){ 
                  setHeadline(Data.data.headline)
           }
        }
        catch(err){
              console.log(err)
        }
      }

      useEffect(()=>{
           Gettingheadline()
      },[])
    return (
        <div id="Resume" className="flex transition-all duration-200 bg-inherit flex-col gap-3">
            {/* First upper div */}
          <div className="p-6 shadow-lg bg-white flex flex-col rounded-2xl gap-6">
    {/* Header Section */}
    <div className="flex justify-start">
        <h1 className="text-2xl font-bold text-gray-800">Resume</h1>
    </div> 

    <div className="flex justify-start">
        <p className="text-gray-600">70% of recruiters discover candidates through their resume</p>
    </div>

    {/* Create your resume in 3 steps banner */}
    <div className="bg-gradient-to-b rounded-2xl flex justify-between items-center from-pink-50 via-pink-100 to-pink-200 p-6">
        {/* Curved left div with image */}
        <div className="w-1/5 flex justify-center items-center">
            <div className="bg-gradient-to-r from-pink-200 to-pink-300 rounded-e-2xl rounded-s-2xl h-32 w-32 flex justify-center items-center">
                <img 
                    className="h-20 object-contain" 
                    src="https://static.naukimg.com/s/0/0/i/resume360/desktop/widgets/desktop-bg.png" 
                    alt="Resume creation" 
                />
            </div>
        </div>

        {/* Steps Content */}
        <div className="flex-1 flex flex-col items-start px-6">
            <h1 className="text-xl font-medium text-gray-800 mb-4">Create your resume in 3 easy steps</h1>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li className="pl-2">Add the missing details in your profile</li>
                <li className="pl-2">Choose a template for your resume</li>
                <li className="pl-2">Improve the content with AI</li>
            </ol>
        </div>

        {/* Button */}
        <div className="flex justify-center items-center">
            <button className="px-6 py-3 text-white bg-blue-500 rounded-full font-medium hover:bg-blue-600 transition-colors">
                Create resume
            </button>
        </div>
    </div>

    {/* Dotted Upload resume div */}
    <div className="flex border-2 border-dashed border-gray-300 rounded-2xl justify-center items-center py-8 hover:border-blue-400 transition-colors cursor-pointer">
        <div className="flex flex-col gap-2 items-center text-center">
            <h1 className="text-gray-700">
                Already have a resume? <span className="text-blue-500 font-medium hover:text-blue-600 cursor-pointer">Upload resume</span>
            </h1>
            <span className="text-slate-500 text-sm">Supported Formats: doc, docx, rtf, pdf, upto 2 MB</span>
        </div>
    </div>
</div>



    {/* Resume headline */}

    <div className="p-3 rounded-2xl flex flex-col gap-3 bg-white shadow-lg">
      <div className="flex font-medium items-center gap-3">
        Resume headline  <MdOutlineEdit onClick={()=>setResumeandSummaryShow(true)}  className="text-slate-500 cursor-pointer"/>
      </div> 

      {/* Rendering headline */}
      <div className="text-slate-500 text-sm">
       {headline ? headline:"The recruiter see this and get basic understanding of your resume."}
      </div>

     
    </div>

    {ResumeAndSummaryShow && <Headline_And_ProfileSummary_Div id={"ResumeHeadline"} Headline={'Resume Headline'} Description={'It is the first thing recruiters notice in your profile. Write a concise headline introducing yourself to employers. (Minimum 5 words)'} onClose={()=> setResumeandSummaryShow(false)}/>}

    </div>
    )

}

const Headline_And_ProfileSummary_Div = ({onClose,Headline,Description,id}:any) => {
  
    const[headline,setHeadline] = useState('');
     const maxChar = 150;

     const[loading,setLoading] = useState(false)
  const handleSave = async() => {
    setLoading(true)
    try{
         const Posting = await axios({
        url:`http://localhost:3000/user/${id}`,
        data:{
            Data:headline,
            email:localStorage.getItem('email')
        },
        method:'PUT',
        
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token') || ""}`
                }
     })

     if(Posting.data && Posting.data.ok){
        onClose();
     }
    }
    catch(err){
        console.log(err)
    }
    finally{
        setLoading(false)
    }
    
  };
  
  
  return (
    <div className="fixed inset-0 flex font-aman items-center justify-center bg-black/80  z-50">
 <div className="bg-white zoom-in rounded-4xl shadow-md p-6 max-w-2xl mx-auto">
     <div className="flex font-medium justify-end hover:font-bold cursor-pointer hover:text-slate-800" onClick={onClose}>
        X
     </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">{Headline}</h2>
        <p className="text-gray-600 mt-1">
          {Description}
        </p>
      </div>
      
      <div className="mb-4">
        <textarea
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-0 focus:border-blue-500 resize-none"
          placeholder="Enter your resume headline..."
        />

        <div className="text-slate-500">
            {"("+ (maxChar - headline.length) + ")" + " Chars Left"}
        </div>
        
      </div>
      
      <div className="flex justify-end space-x-3">
        <button
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={!headline || headline.length > maxChar}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300  transition-colors"
        >
          {loading ? <Spinner/> : "Save"}
        </button>
      </div>
    </div>
    </div>
   
  );
};


function Diversity_Inclusion({setDisabilityPopup,disability}:any){
   
    const[militaryExp,setMilitaryexp] = useState('');
    const[career_break,setBreak] = useState('');
    const[loading,setLoading] = useState(false)
    async function SetDiversity(){
        setLoading(true)
        try{
           const Settled = await axios({
             url:"http://localhost:3000/user/setDiversity",
             method:'PUT',
             data:{
                militaryExp:militaryExp,
                careerBreak:career_break,
                email:localStorage.getItem('email')
             }
             ,
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token') || ""}`
                }
           })

           if(Settled.data && Settled.data.ok){
            setDisabilityPopup(false)
           }
        }
        catch(err){
             console.log(err)
        }
        finally{
            setLoading(false)
        }
    }
  
    return <div className="fixed inset-0 flex font-aman items-center justify-center bg-black/80  z-50">
          <div className="bg-white zoom-in rounded-4xl flex flex-col gap-5 shadow-md p-8 max-w-2xl mx-auto">
            <div className="flex justify-end">
                <IoMdClose onClick={()=>setDisabilityPopup(false)} className="text-lg cursor-pointer"/>
            </div>
             
             <div className="flex gap-2 flex-col">
                <span className="text-xl font-medium">Diversity & Inclusion</span>
                <span className="text-slate-600 text-sm ">Share details to attract recruiters who value people from different backgrounds</span>
             </div>

             {/* <div className="flex gap-1 flex-col">
                <span className="font-medium">Disability status</span>
                <span className="text-slate-500 text-sm">Share your status to get jobs that match your needs</span>
                <div className="flex items-center gap-2">
                     <span className={`px-3 py-2  rounded-full ${disability==='true' ? 'text-black font-medium border border-black'
                        :'text-slate-500 cursor-pointer  border-gray-400 border'} `}>Have disability</span>
                     <span className={`px-3 ${disability==='false' ? 'border border-black font-medium text-black':'text-slate-500 border cursor-pointer border-gray-400'} py-2  rounded-full `}>Do not have disability</span>
                </div>
             </div> */}

            <div className="flex gap-1 flex-col">
                <span className="font-medium">Military status</span>
                
                <div className="flex items-center gap-2">
                     <span
                     onClick={(e)=> {
                        setMilitaryexp('Currently serving')
                        console.log(militaryExp);
                     }}
                     className={`px-3 py-2 ${militaryExp==='Currently serving' ? 'text-slate-600 border border-black':'text-slate-500 border border-gray-400'} cursor-pointer rounded-full `}>Currently serving</span>
                     <span
                     onClick={(e)=> setMilitaryexp('Previously served')}
                     className={`px-3 py-2 ${militaryExp==='Previously served' ? 'text-slate-600 border border-black':'text-slate-500 border border-gray-400'} cursor-pointer rounded-full `}>Previously served</span>
                     <span
                     onClick={()=> setMilitaryexp('Never served')}
                     className={`px-3 py-2 ${militaryExp==='Never served' ? 'text-slate-600 border border-black':'text-slate-500 border border-gray-400'} cursor-pointer rounded-full `}>Never served</span>
                </div>
             </div>
             
               <div className="flex gap-1 flex-col">
                <span className="font-medium">Career break</span>
                <span className="text-slate-500 text-sm">Help recruiters understand your unique path</span>
                <div className="flex items-center gap-2">
                     <span
                     onClick={()=> setBreak('Have taken')}
                     className={`px-3 ${career_break==='Have taken' ? 'text-slate-600 border border-black':'text-slate-500 border border-gray-400'}  py-2 cursor-pointer rounded-full `}>Have taken</span>
                     <span
                     onClick={()=> setBreak('Have not taken')}
                     className={`px-3 ${career_break==='Have not taken' ? 'text-slate-600 border border-black':'text-slate-500 border border-gray-400'}  py-2 cursor-pointer rounded-full `}>Have not taken</span>
                </div>
             </div>
             

            <div className="flex justify-end items-center">
                <div className="flex items-center gap-7">
                    <span onClick={()=> setDisabilityPopup(false)} className="text-blue-500 cursor-pointer font-medium">Cancel</span>
                    <button 
                    onClick={SetDiversity}
                    disabled={!militaryExp || !career_break} className={`   ${!militaryExp || !career_break ? 'cursor-not-allowed bg-blue-100 text-slate-400 ':'cursor-pointer bg-blue-500 hover:bg-blue-400 text-white'}  rounded-full px-5 py-2`}>Save</button>
                </div>
            </div>

          </div>
    </div>
}


 function KeySkills_Div({onClose}:any){

   const skills = [
  "Spoken English",
  "English",
  "Typing Speed",
  "Data Entry",
  "Grammar",
  "Convincing Power",
  "Non Voice Process",
  "Interpersonal Skills",
  "Fluent English",
  "Written Communication",
   ];
   
   const [loading,setLoading] = useState(false)
   const [skills_array,setSkillsArray] = useState<String []>([]);
   const [inputSkills,setInputSkills] = useState('');

   function HandleAddSkills(each:any){
    const skill = each.trim();
    if (!skill) return;
    if (!skills_array.map(s => s.toLowerCase()).includes(skill.toLowerCase())) {
        setSkillsArray(prev => [...prev, skill]);
        setInputSkills(''); // clear input after add
    }
   }

    function HandleRemoveSkills(each: string) {
        setSkillsArray(prev => prev.filter(skill => skill !== each));
    }


   async function GettingAlreadySkills(){
     try{
         const Data = await axios({
            url:'http://localhost:3000/user/getKeySkills',
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            },
            method:'GET'
         })

         if(Data.data && Data.data.ok){
            setSkillsArray(Data.data.skills);
         }
     }
     catch(err){
        console.log(err)
        alert(err)
     }
   }


   async function PostingUpdatedSkills(){
    setLoading(true)
    try{
       const Data = await axios({
        url:'http://localhost:3000/user/postKeySkills',
        headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`,

        },
        method:'POST'
        ,
        data:{
            skills:skills_array
        }
       })

       if(Data.data && Data.data.ok){
        console.log(Data.data.data)
         onClose();
       }
    }
    catch(err){
        console.log(err);
        alert(err)
    }
    finally{
        setLoading(false)
    }
   }

   useEffect(()=>{
       GettingAlreadySkills()
   },[])
    return (
        <div className="fixed   inset-0 flex font-aman items-center justify-center bg-black/80  z-50">
               <div className="bg-white no-scrollbar zoom-in max-h-[600px] overflow-y-auto rounded-4xl flex flex-col gap-5 shadow-md p-8 max-w-2xl mx-auto">

                <div className="flex items-center justify-end">
                     <GiTireIronCross onClick={onClose} className="text-slate-500 cursor-pointer text-xl" />
                </div>
                   
                   <div className="flex flex-col gap-1 ">
                    <span className="text-2xl font-medium">Key skills</span>
                    <p className="text-sm text-slate-500">Add skills that best define your expertise, for e.g, Direct Marketing, Oracle, Java, etc. (Minimum 1)</p>
                   </div>

{/* Purani skills */}
                   <div className="flex flex-col gap-1">
                      <span className="font-medium text-md">Skills</span>

                      <div className="flex flex-wrap gap-1">
                        {
                            skills_array.length > 0 &&
                            skills_array.map((each:any)=>{
                                return <span className="text-slate-500 bg-gray-100 flex border border-gray-400 rounded-full px-3 py-1 items-center gap-2 hover:bg-gray-200 text-sm">{each}  <RxCross1 className="text-black cursor-pointer font-semibold" 
                                onClick={()=> HandleRemoveSkills(each)}
                                /></span>
                            })
                        }
                      </div>
                   </div>


                {/* Adding skills input */}
                <div className="flex flex-col gap-2 items-start">
                    <input
                    onChange={(e)=> setInputSkills(e.target.value)}
                    type="text" placeholder="Add skills" className="w-full p-2 placeholder-slate-500 outline-0 border border-gray-400 rounded-xl" />

                    <span 
                    onClick={()=> HandleAddSkills(inputSkills)}
                    className=" border border-gray-400 rounded-full px-4 py-2  cursor-pointer text-black hover:bg-black hover:text-white transition-all duration-200">Add</span>
                </div>

                <div className="flex flex-col gap-2 mt-3">
                    <p className="font-medium text-md">Or you can select from the suggested set of skills</p>

                    <div className="flex flex-wrap gap-2">
                        {
                          skills.map((each:any)=>{
                            return <span
                            onClick={()=>{
                                HandleAddSkills(each);
                            }}
                            className={`border cursor-pointer  border-gray-400 px-3 py-1 rounded-full text-slate-600 hover:bg-gray-200 `}>{each + " +"}</span>
                          })
                        }
                    </div>
                </div>


                <div className="flex justify-end mt-5 pr-3">
                    <div className="flex items-center gap-5">
                        <span onClick={onClose} className="text-blue-500 cursor-pointer font-medium">Cancel</span>
                        <span
                        onClick={PostingUpdatedSkills}
                        className="bg-blue-500 text-white rounded-full font-medium cursor-pointer px-4 py-2">{loading ? <Spinner/>:'Save'}</span>
                    </div>
                </div>
               </div>
        </div>
    )
}

function PersonalDetails({onClose}:any){

     const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const years = Array.from({ length: 40 }, (_, i) => 2007 - i);

 const indianLanguages = [
  "Hindi",
  "Bengali",
  "Telugu",
  "Marathi",
  "Tamil",
  "Urdu",
  "Gujarati",
  "Kannada",
  "Odia",
  "Malayalam",
  "Punjabi",
  "Assamese",
  "Maithili",
  "Santali",
  "Kashmiri",
  "Nepali",
  "Konkani",
  "Manipuri (Meitei)",
  "Bodo",
  "Dogri",
  "Mizo",
  "English",
  "Sindhi",
  "Sanskrit",
  "Ladakhi"
];


interface LanguageType {
  language: string;
  proficiency: string;
  ableArray: string[];
  id:string
}

interface DateType {
    date:string;
    month:string;
    year:string;
}

interface MyFormData{
    gender:string;
    moreInfo:string[];
    maritalStatus:string;
    category:string;
    parmanentAddress:string;
    hometown:string;
    pincode:string
}



//   Array of objects that contain language , proficiency and array of read ,write and speak.
   const [LanguageObj,setLanguageObj] = useState<LanguageType[]>([])
   const [dateObj,setDateObj] = useState<DateType>({
  date: "",
  month: "",
  year: ""
});


function AddLanguageDiv(){
   setLanguageObj((prev:any)=>[...prev,{language:"",proficiency:"",ableArray:[],id:Math.random()}]);
}

function HandleDeleteObject(id:any){
    console.log("Id of Language"+id)
    setLanguageObj((prev:any) => prev.filter((val:any) => !(id==val.id)))
}


 // 🌀 Handle updates for language or proficiency dropdowns
  const handleSelectChange = (
    id: string,
    field: "language" | "proficiency",
    value: string
  ) => {
    setLanguageObj((prev) =>
      prev.map((obj) =>
        obj.id === id ? { ...obj, [field]: value } : obj
      )
    );
  };

   // ✅ Handle checkbox (Read, Write, Speak)
  const handleCheckboxChange = (id: string, value: string, checked: boolean) => {
    setLanguageObj((prev) =>
      prev.map((obj) => {
        if (obj.id === id) {
          const updatedArray = checked
            ? [...obj.ableArray, value]
            : obj.ableArray.filter((v) => v !== value);
          return { ...obj, ableArray: updatedArray };
        }
        return obj;
      })
    );
  };


  const [formData,setFormData] = useState<MyFormData>({
    gender:"",
    moreInfo:[],
    maritalStatus:"",
    category:"",
    parmanentAddress:"",
    hometown:"",
    pincode:""
  });

  function handleMoreInfo(each:any){
        if(formData.moreInfo.includes(each)){
            setFormData(prev => ({...prev,moreInfo:prev.moreInfo.filter(v => v!=each)}))
        }
        else {
            setFormData(prev => ({...prev,moreInfo:[...prev.moreInfo,each]}))
        }
  }

  const [loading,setLoading] = useState(false)

  const [msg,setMsg] = useState({
    msg:"",
    id:""
  })

  function Checking_Language_Empty_TohNhi(){
       if(LanguageObj.length > 0){
            const invalid = LanguageObj.some(val => val.language==='' || val.proficiency==='');
            if(invalid) return true;
        }
        return false; 
  }

  async function HandleSubmit_FinalData (){


    // All date fields should be Empty or Filled
    if(!(dateObj.month=='' && dateObj.year=='' && dateObj.date=='') && (!dateObj.year || !dateObj.month || !dateObj.date) ){
          setMsg({msg:"Can't have an empty field in Date",id:"Date"});
          alert('Error for date');
          return ;
    }

   

    if(LanguageObj.length > 0){
       const invalid = LanguageObj.some(val => val.language==='' || val.proficiency==='');

       if(invalid){
        setMsg({ msg: "Fill all the fields in Languages", id: "Language" });
        alert("Error language");
       
        return;
       }
    } 



    setLoading(true)
    const finalData:any = {};

    // 🔹 formData ke andar se sirf filled fields rakhna
  Object.entries(formData).forEach(([key, value]) => {
    if (
      value !== "" &&
      value !== null &&
      !(Array.isArray(value) && value.length === 0)
    ) {
      finalData[key] = value;
    }
  });

  // 🔹 Agar languageObj me kuch add hua hai
  if (LanguageObj.length > 0) {
    finalData.languageArr = LanguageObj;
  }

   // 🔹 Agar dateObj me kuch actual value hai
  if (dateObj.date && dateObj.month && dateObj.year) {
    finalData.dateOfBirth = dateObj;
  }

  console.log("Here is your finalData + " ,finalData)


  try{
      const ResponseData = await axios({
        url:'http://localhost:3000/user/postPersonalDetails',
        method:'POST',
        data:{
            finalData
        },
        headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })

      if(ResponseData.data && ResponseData.data.ok){
           onClose();
      }
  }
  catch(err){
    console.log(err);
    alert(err)
  }
  finally{
    setLoading(false)
  }
  }

    return (
        <div className="fixed   inset-0 flex font-aman items-center justify-center bg-black/80  z-50">
            <div className="bg-white no-scrollbar zoom-in max-h-[600px] overflow-y-auto rounded-4xl flex flex-col gap-10 shadow-md p-8 max-w-2xl mx-auto">


                <div className="flex justify-end items-center">
                    <IoMdClose onClick={onClose} className="text-xl cursor-pointer hover:text-slate-500"/>
                </div>


                <div className="flex flex-col gap-2">
                    <span className="text-xl font-medium">Personal Details</span>
                    <p className="text-slate-600 font-medium">This information is important for employers to know you better</p>
                </div>

{/* Gender */}
                <div className="flex flex-col">
                    <span className="font-medium">Gender</span>
                    <div className="flex gap-3 items-center">
                        <span onClick={()=> setFormData(prev => ({...prev,gender:'male'}))} className={`text-slate-500 border rounded-full ${formData.gender ===('male') ? 'bg-gray-200':''} border-gray-400 py-1 px-4 cursor-pointer`}>Male</span>
                        <span onClick={()=> setFormData(prev => ({...prev,gender:'female'}))} className={`text-slate-500 border rounded-full ${formData.gender === ('female') ? 'bg-gray-200':''} border-gray-400 py-1 px-4 cursor-pointer`}>Female</span>
                        <span onClick={()=> setFormData(prev => ({...prev,gender:'transgender'}))} className={`text-slate-500 border rounded-full ${formData.gender === ('transgender') ? 'bg-gray-200':''} border-gray-400 py-1 px-4 cursor-pointer`}>Transgender</span>
                    </div>
                </div>


{/* More information */}

                <div className="flex flex-col ">
                    <span className="font-medium">More information</span>
                    <p className="text-sm font-medium text-slate-500">Companies are focusing on equal opportunities and might be looking for candidates from diverse backgrounds.</p>

                    <div className="flex mt-2 gap-3 items-center">
                        <span onClick={()=>{
                            handleMoreInfo("single_parent")
                        }} className={`text-slate-500 border rounded-full ${formData.moreInfo.includes('single_parent') ? 'bg-gray-200':''} border-gray-400 py-1 px-4 cursor-pointer`}>Single parent +</span>
                        <span onClick={()=>{
                            handleMoreInfo("working_mother")
                        }}  className={`text-slate-500 border rounded-full ${formData.moreInfo.includes('working_mother') ? 'bg-gray-200':''} border-gray-400 py-1 px-4 cursor-pointer`}>Working mother +</span>
                        <span onClick={()=>{
                            handleMoreInfo("retired")
                        }} className={`text-slate-500 border rounded-full ${formData.moreInfo.includes('retired') ? 'bg-gray-200':''} border-gray-400 py-1 px-4 cursor-pointer`}>Retired(60+) +</span>
                        <span onClick={()=>{
                            handleMoreInfo("lgbtq+")
                        }} className={`text-slate-500 border rounded-full ${formData.moreInfo.includes('lgbtq+') ? 'bg-gray-200':''} border-gray-400 py-1 px-4 cursor-pointer`}>LGBTQ +</span>
                    </div>
                </div>  

{/* Marital Status */}
                <div>
                    <span className="font-medium">Martial status</span>
                    <div className="flex gap-3 items-center flex-wrap">
                       <span onClick={()=>{
                        setFormData(prev => ({...prev , maritalStatus:'single'}))
                       }} className={`text-slate-500 border rounded-full ${formData.maritalStatus==='single' ? 'bg-gray-200':''} border-gray-400 py-1 px-4 cursor-pointer`}>Single/Unmarried</span>
                       <span onClick={()=>{
                        setFormData(prev => ({...prev , maritalStatus:'married'}))
                       }} className={`text-slate-500 border rounded-full ${formData.maritalStatus==='married' ? 'bg-gray-200':''} border-gray-400 py-1 px-4 cursor-pointer`}>Married</span>
                       <span onClick={()=>{
                        setFormData(prev => ({...prev , maritalStatus:'widowed'}))
                       }} className={`text-slate-500 border rounded-full ${formData.maritalStatus==='widowed' ? 'bg-gray-200':''} border-gray-400 py-1 px-4 cursor-pointer`}>Widowed</span>
                       <span onClick={()=>{
                        setFormData(prev => ({...prev , maritalStatus:'divorced'}))
                       }} className={`text-slate-500 border rounded-full ${formData.maritalStatus==='divorced' ? 'bg-gray-200':''} border-gray-400 py-1 px-4 cursor-pointer`}>Divorced</span>
                       <span onClick={()=>{
                        setFormData(prev => ({...prev , maritalStatus:'separated'}))
                       }} className={`text-slate-500 border rounded-full ${formData.maritalStatus==='separated' ? 'bg-gray-200':''} border-gray-400 py-1 px-4 cursor-pointer`}>Separated</span>
                       <span onClick={()=>{
                        setFormData(prev => ({...prev , maritalStatus:'other'}))
                       }} className={`text-slate-500 border rounded-full ${formData.maritalStatus==='other' ? 'bg-gray-200':''} border-gray-400 py-1 px-4 cursor-pointer`}>Other</span>
                    </div>
                </div>

{/* DOB */}
                <div className="flex flex-col gap-1"> 
                    <span className="font-medium">Date of birth</span>

                    <div className="flex gap-2">
                        <select onChange={(e)=> setDateObj(prev => ({...prev,date:e.target.value}))} defaultValue={""} name="" id="" className="border border-gray-400 placeholder-slate-500 w-[33%] p-2 rounded-lg">

                            <option value=""  disabled hidden>DD</option>
                            {
                                days.map((e)=>{
                                    return <option value={e} key={e}>{e}</option>
                                })
                            }
                            
                        </select>

                        <select onChange={(e)=> setDateObj(prev => ({...prev,month:e.target.value}))} name="" id="" defaultValue={""} className="border border-gray-400 placeholder-slate-500 w-[33%] p-2 rounded-lg">
                             <option value="" disabled hidden>MM</option>
                            {
                                months.map((val,ind)=>{
                                    return <option value={val} key={ind}>{val}</option>
                                })
                            }
                        </select>

                        <select onChange={(e)=> setDateObj(prev => ({...prev,year:e.target.value}))} name="" id="" defaultValue={""} className="border border-gray-400 placeholder-slate-500 w-[33%] p-2 rounded-lg">
                              <option value="" disabled hidden>YYYY</option>
                            {
                                years.map((y)=>{
                                    return <option value={y} key={y}>{y}</option>
                                })
                            }
                        </select>
                    </div>

                    <div className={`text-red-500 text-sm ${dateObj.year && dateObj.date && dateObj.month   ? 'hidden':''} `}>
                        {msg.id==='Date' ? msg.msg:''}
                    </div>
                </div>

{/* category */}

                <div className="flex flex-col gap-1">
                    <span className="font-medium">Category</span>
                    <p className="text-slate-500"> Companies welcome people from various categories to bring equality among all citizens</p>
                    <div className="flex flex-wrap gap-2 max-w-4xl">
                        <span onClick={()=> setFormData(prev => ({...prev,category:'general'}))} className={`text-slate-500 border rounded-full ${formData.category==='general' ? 'bg-gray-200':''} border-gray-400 py-1 px-4 cursor-pointer`}>General</span>
                        <span onClick={()=> setFormData(prev => ({...prev,category:'sc'}))} className={`text-slate-500 border rounded-full ${formData.category==='sc' ? 'bg-gray-200':''} border-gray-400 py-1 px-4 cursor-pointer`}>Scheduled Caste(SC)</span>
                        <span onClick={()=> setFormData(prev => ({...prev,category:'st'}))} className={`text-slate-500 border rounded-full ${formData.category==='st' ? 'bg-gray-200':''} border-gray-400 py-1 px-4 cursor-pointer`}>Scheduled Tribe(ST)</span>
                        <span onClick={()=> setFormData(prev => ({...prev,category:'obc_creamy'}))} className={`text-slate-500 border rounded-full ${formData.category==='obc_creamy' ? 'bg-gray-200':''} border-gray-400 py-1 px-4 cursor-pointer`}>OBC-Creamy</span>
                        <span onClick={()=> setFormData(prev => ({...prev,category:'obc_non_creamy'}))} className={`text-slate-500 border rounded-full ${formData.category==='obc_non_creamy' ? 'bg-gray-200':''} border-gray-400 py-1 px-4 cursor-pointer`}>OBC - Non Creamy</span>
                        <span onClick={()=> setFormData(prev => ({...prev,category:'other'}))} className={`text-slate-500 border rounded-full ${formData.category==='other' ? 'bg-gray-200':''} border-gray-400 py-1 px-4 cursor-pointer`}>Other</span>
                    </div>
                </div>

{/* Permanend Address */}
                <div className="flex flex-col gap-2">
                    <span className="font-medium"> Permanent address</span>
                    <input onChange={(e) => setFormData(prev => ({...prev,parmanentAddress:e.target.value}))} type="text" placeholder="Enter your permanent address" className="w-full placeholder-slate-500 p-3 rounded-2xl border border-gray-400 outline-0" />
                </div>
{/* Hometown */}
                <div className="flex flex-col gap-2">
                    <span className="font-medium">Hometown</span>
                    <input onChange={(e) => setFormData(prev => ({...prev,hometown:e.target.value}))} type="text" placeholder="Enter your hometown" className="w-full placeholder-slate-500 p-3 rounded-2xl border border-gray-400 outline-0" />
                </div>

{/* Pincode */}
                 <div className="flex flex-col gap-2">
                    <span className="font-medium">Pincode</span>
                    <input onChange={(e) => setFormData(prev => ({...prev,pincode:e.target.value}))} type="text" placeholder="Enter your pincode" className="w-full placeholder-slate-500 p-3 rounded-2xl border border-gray-400 outline-0" />
                </div>

{/*Language proficiency*/}

                <div className="flex flex-col gap-6">
                     <div className="flex flex-col gap-1">
                        <span className="font-medium">Language proficiency</span>
                        <p className="text-slate-500">Strengthen your resume by letting recruiters know you can communicate in multiple languages</p>
                     </div>

                     <div className={`text-red-500 text-sm animate-pulse ${Checking_Language_Empty_TohNhi() ? '':'hidden'}`}>
                        {msg.id==='Language' ? msg.msg:''}
                     </div>

                     <div className="flex flex-col gap-9">
                        {
                            LanguageObj.length > 0 &&
                            LanguageObj.map((val:any)=>{
                                return <div id={val.id} key={val.id} className="flex items-center gap-3">

                                       <div className="flex flex-col gap-3 w-full">

                                    <div className="flex gap-3 items-center">
                                        {/* Language* */}
                                       <div className="w-[50%]">
                                        <span className="flex font-medium items-center">Language<sup className="text-red-400">*</sup></span>

                                       <select
                                        onChange={(e) =>
                                            handleSelectChange(val.id, "language", e.target.value)
                                        }
                                       defaultValue={""} value={val.language} className="border w-full placeholder-slate-400 border-gray-400 p-3 rounded-2xl text-gray-600" name="" aria-placeholder="Select language" id=""
                                      
                                       >
                                        <option value="" disabled hidden>Select language</option>
                                        {
                                            indianLanguages.map((each:any)=>{ 
                                                return <option key={each} value={each}>{each}</option>
                                            })
                                        }
                                       </select>
                                       </div>

                                    {/* Proficiency* */}
                                       <div className="w-[50%]">
                                        <span className="flex font-medium items-center">Proficiency<sup className="text-red-400">*</sup></span>


                                       <select
                                        onChange={(e) =>
                                            handleSelectChange(val.id, "proficiency", e.target.value)
                                        }
                                       defaultValue={""} value={val.proficiency} className="border w-full border-gray-400 p-3 rounded-2xl text-gray-600" name="" id="">
                                        <option value="" disabled hidden>Select language</option>
                                        <option value="Beginner">Beginner</option>
                                        <option value="Proficient">Proficient</option>
                                        <option value="Expert">Expert</option>
                                       </select>
                                       </div>
                                    </div>
                                   
                                        {/* Check box read , write  and speak */}
                                       <div className="flex justify-between px-3 items-center text-md text-slate-400">
                                        <div className="flex items-center gap-1">
                                            <input
                                            onChange={(e) =>
                                            handleCheckboxChange(val.id, "Read", e.target.checked)
                                            }
                                             checked={val.ableArray.includes('Read')}
                                            type="checkbox" className="rounded-xl border border-gray-400 transition-all duration-300"/>
                                            <span className="">Read</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <input
                                             onChange={(e) =>
                                            handleCheckboxChange(val.id, "Speak", e.target.checked)
                                            }
                                             checked={val.ableArray.includes('Speak')}
                                            type="checkbox" className="rounded-xl border border-gray-400 transition-all duration-300" />
                                            <span>Speak</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <input
                                             onChange={(e) =>
                                            handleCheckboxChange(val.id, "Write", e.target.checked)
                                            }
                                             checked={val.ableArray.includes('Write')}
                                            type="checkbox" className="rounded-xl border border-gray-400 transition-all duration-300" />
                                            <span>Write</span>
                                        </div>
                                       </div>

                                       </div>
                                 
                                       <div>
                                        <span
                                        onClick={()=> HandleDeleteObject(val.id)}
                                        className="text-blue-500 font-medium cursor-pointer">Delete</span>
                                       </div>
                                </div>
                            })
                        }
                     </div>

                     <div>
                        <span onClick={AddLanguageDiv} className="text-blue-500 cursor-pointer font-medium">Add language</span>
                     </div>


                </div>


{/* cancel and save button */}

                <div className="flex justify-center items-center gap-7 mt-5">
                    <span onClick={onClose} className="text-blue-500">Cancel</span>
                    <span onClick={HandleSubmit_FinalData} className="px-4 py-2 bg-blue-500  cursor-pointer hover:bg-blue-400 text-white rounded-full font-medium">{loading ? <Spinner/>:'Save'}</span>
                </div>


                



            </div>
        </div>
    )
}

function CareerProfile({onClose}:any){

    const[preferredLocations,setPreferedLocations] = useState<String[]>([]);

     const [showList,setShowList] = useState(false);
     const cities = ["Bengaluru", "Mumbai", "Pune", "Chennai", "Hyderabad", "Gurugram","Noida","Ahmedabad","Kolkata","Delhi/NCR","Remote"];
     const Departments = [
    "BFSI, Investments & Trading",
    "Customer Success, Service & Operations",
    "Data Science & Analytics",
    "Engineering - Hardware & Networks",
    "Engineering - Software & QA",
    "Finance & Accounting",
  ];

     function HandleSelect(city:string){
         setPreferedLocations(prev => prev.includes(city) ? prev.filter(v => v!==city):[...prev,city])
     }


     const [showIndustry,setShowIndus] = useState(false);
     const [showDepartment,setShowDepartment] = useState(false);


     const [industry,setIndustry] = useState('')
     const [department,setDepartment] = useState('')

     const [jobType,setJobType] = useState<String[]>([])
     const [employmentType,setEmployment] = useState<String[]>([])
     const [shiftType,setShift] = useState('')

     function handleCheckJobType(job:any){
          setJobType(prev => prev.includes(job) ? prev.filter(v => v!==job):[...prev,job]);
     }
     function handleCheckEmploymentType(employment:any){
          setJobType(prev => prev.includes(employment) ? prev.filter(v => v!==employment):[...prev,employment]);
     }



   return (
    <div className="fixed   inset-0 flex font-aman items-center justify-center bg-black/80  z-50">
         <div className="bg-white no-scrollbar zoom-in max-h-[600px] overflow-y-auto rounded-4xl flex flex-col gap-5 shadow-md p-8 max-w-2xl mx-auto">
               <div className="flex justify-end items-center">
                    <IoMdClose onClick={onClose} className="text-xl cursor-pointer hover:text-slate-500"/>
                </div>

                <div className="flex flex-col gap-1">
                <span className="text-2xl font-medium text-gray-800">
                    Career profile
                </span>
                <p className="text-sm text-gray-600">
                    Add details about your current and preferred job profile. 
                    This helps us personalise your job recommendations.
                </p>
                </div>



                <div className="flex flex-col gap-1">
                    <span className="font-medium">Current industry <sup className="text-red-500">*</sup></span>
                    <input value={industry} onClick={()=> setShowIndus(prev => !prev)} type="text" placeholder="Select industry of your current company" className="w-full p-3 cursor-pointer rounded-2xl border border-gray-400 outline-0" />

                    {showIndustry &&  
                    
                    <div className="absolute z-10 p-2 w-[600px]  flex flex-col bg-white  rounded-md mt-20 shadow-lg max-h-52 overflow-y-auto">
                       <div>
                        <h2 className="text-slate-300 font-semibold">BPM</h2>
                        <p className="hover:bg-gray-100 text-md" onClick={()=>{
                            setIndustry("Analyticc/KPO/Research")
                            setShowIndus(false);
                        }}>Analyticc/KPO/Research</p>
                        <p className="hover:bg-gray-100 text-md mt-2" onClick={()=>{
                            setIndustry("BPM/BPO")
                            setShowIndus(false);
                        }}>BPM/BPO</p>
                       </div>

                        <div>
                        <h2 className="text-slate-300 font-semibold">IT Services</h2>
                        <p className="hover:bg-gray-100 text-md mt-2" onClick={()=>{
                            setIndustry("IT Services & Consulting")
                            setShowIndus(false);
                        }}>IT Services & Consulting</p>
                       </div>
                    </div>
                    }
                </div>

                <div className="flex flex-col gap-1">
                    <span className="font-medium">Department <sup className="text-red-500">*</sup></span>
                    <input type="text" value={department} onClick={()=> setShowDepartment(prev => !prev)} placeholder="Select your department/area of expertise" className="w-full cursor-pointer placeholder-slate-500 text-sm p-3 rounded-2xl border border-gray-400 outline-0" />


                    {
                        showDepartment && 
                        <div className="absolute z-10 p-2 w-[600px]  flex flex-col bg-white  rounded-md mt-20 shadow-lg max-h-52 overflow-y-auto">
                      {
                        Departments.map(each => {
                            return <p onClick={()=> {
                                setDepartment(each)
                                setShowDepartment(false)
                            }} className="hover:bg-gray-100 text-slate-500 text-md p-1 cursor-pointer">{each}</p>
                        })
                      }
                    </div>
                    }
                </div>


{/* Desired job type */}

                <div className="flex flex-col gap-2">
                    <span className="font-medium">Desired job type</span>
                    <div className="max-w-2xl flex gap-20 items-center">
                        {/* permanent */}
                        <div className="flex gap-2 items-center">
                            <input checked={jobType.includes("Permanent")} onChange={()=> handleCheckJobType("Permanent")}  type="checkbox" className="accent-black w-4 h-4  transition-all duration-300" />
                            <span className="text-slate-500">Permanent</span>
                        </div>
                        {/* contractual */}
                        <div className="flex gap-2 items-center">
                            <input type="checkbox" checked={jobType.includes("Contractual")} onChange={()=> handleCheckJobType("Contractual")} className="accent-black w-4 h-4  transition-all duration-300" />
                            <span className="text-slate-500">Contractual</span>
                        </div>
                    </div>
                </div>

{/* Desired employment type */}
                <div className="flex flex-col gap-2">
                    <span className="font-medium">Desired employment type</span>
                    <div className="max-w-2xl flex gap-23 items-center">
                        {/* permanent */}
                        <div className="flex gap-2 items-center">
                            <input type="checkbox" onChange={()=> handleCheckEmploymentType("Full time")} checked={employmentType.includes("Full time")} className="accent-black w-4 h-4  transition-all duration-300" />
                            <span className="text-slate-500">Full time</span>
                        </div>
                        {/* contractual */}
                        <div className="flex gap-2 items-center">
                            <input type="checkbox" onChange={()=> handleCheckEmploymentType("Part time")} checked={employmentType.includes("Part time")} className="accent-black w-4 h-4  transition-all duration-300" />
                            <span className="text-slate-500">Part time</span>
                        </div>
                    </div>
                </div>

{/* Preferred shift */}
                <div className="flex flex-col gap-2">
                    <span className="font-medium">Preferred shift</span>
                    <div className="max-w-2xl flex gap-31 items-center">
                        {/* permanent */}
                        <div className="flex gap-2 items-center">
                            <input type="checkbox" checked={shiftType==='Day'} onChange={()=> setShift('Day')} className="accent-black w-4 h-4  transition-all duration-300" />
                            <span className="text-slate-500">Day</span>
                        </div>
                        {/* contractual */}
                        <div className="flex gap-2 items-center">
                            <input type="checkbox" checked={shiftType==='Night'} onChange={()=> setShift('Night')} className="accent-black w-4 h-4  transition-all duration-300" />
                            <span className="text-slate-500">Night</span>
                        </div>

                          <div className="flex gap-2 items-center">
                            <input type="checkbox" checked={shiftType==='Flexible'} onChange={()=> setShift('Flexible')} className="accent-black w-4 h-4  transition-all duration-300" />
                            <span className="text-slate-500">Flexible</span>
                          </div>
                    </div>
                </div>


            {/* Preferred work location (Max 10) */}

            <div className="flex flex-col gap-2">
                <p className="font-medium">Preferred work location (Max 10)</p>
                <input onClick={()=> setShowList(prev => !prev)}  type="text" placeholder="Tell us your location preferences to work" className="w-full p-3 rounded-2xl cursor-pointer border text-sm border-gray-400 placeholder-slate-500 outline-0" />

                {showList && (
                        <div className="absolute z-10 no-scrollbar w-[600px] bg-white border border-gray-200 rounded-md mt-20 shadow-md max-h-52 overflow-y-auto">
                        <div className="px-3 py-2 text-sm font-semibold text-gray-600 border-b">
                            Popular locations
                        </div>

                        {cities.map((city) => (
                            <label
                            key={city}
                            className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm border-b border-gray-100 last:border-0"
                            >
                            <input
                                type="checkbox"
                                checked={preferredLocations.includes(city)}
                                onChange={() => HandleSelect(city)}
                                className="accent-black w-4 h-4  transition-all duration-300"
                            />
                            <span className="text-gray-800">{city}</span>
                            </label>
                        ))}

                       
                        </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                    {
                    preferredLocations.map((each:any)=>{
                        return <span className="rounded-full flex items-center gap-2 border text-sm text-slate-500 border-gray-400 px-5 py-1">{each}<IoMdClose
                        onClick={()=> HandleSelect(each)}
                        className="text-lg text-black cursor-pointer"/></span>
                    })
                    }
                    </div>
                
            </div>

{/* Expected salary */}

            <div className="flex flex-col gap-2">
                <span className="font-medium">Expected Salary</span>
                <div className="flex items-center gap-3">
                    <select className="text-slate-500 w-[20%] rounded-2xl outline-0 border border-gray-400 p-3" name="" id="">
                        <option value="">₹</option>
                        <option value="rupee">₹</option>
                        <option value="dolar">$</option>
                    </select>

                    <input type="text" className="w-[80%] rounded-2xl outline-0 border border-gray-400 p-3" />
                </div>
            </div>

            
{/* cancel and save button */}

                <div className="flex justify-center items-center gap-7 mt-5">
                    <span onClick={onClose} className="text-blue-500 cursor-pointer">Cancel</span>
                    <span className="px-4 cursor-pointer hover:bg-blue-400 py-2 bg-blue-500 text-white rounded-full font-medium">Save</span>
                </div>


         </div>
    </div>
   )
}


interface Experience{
    years:string;
    months:string
}
function IT_Skills({onClose,rowId}:any){

    console.log("RowId" + rowId)
    const[showlastUsed,setShowLastUsed] = useState(false);
    const[showexperience,setShowExperience] = useState(false);
    const[showmonths,setShowMonth] = useState(false);
 

    const [skill,setSkill] = useState("");
    const [softwareVersion,setVersion] = useState('');
    const [lastUsed,setLastused] = useState('');
    const [loading,setLoading] = useState(false);
    const [msg,setMsg] = useState('');
    const [experience,setExperience] = useState<Experience>({
        years:"",
        months:''
    }); 
    

    async function PostIT_skills(e:any){
        e.preventDefault();
        setLoading(true);
        try{
           const PostingRes = await axios({
            url:'http://localhost:3000/user/IT_Skills',
            data:{
               skill:skill,
               lastused:String(lastUsed),
               version:softwareVersion,
               expYears:experience.years,
               expMonths:experience.months,
               rowId:rowId

            },
            method:'POST',
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
           })

           if(PostingRes.data && PostingRes.data.msg){
               setMsg(PostingRes.data.msg);
               setTimeout(()=>{
                  onClose()
               },6000)
           }
        }
        catch(err){
            console.log(err)
        }
    }
    

   

    return (
        <div className="fixed   inset-0 flex font-aman items-center justify-center bg-black/80  z-50">
           <div className="bg-white no-scrollbar zoom-in max-h-[600px] overflow-y-auto rounded-4xl flex flex-col gap-5 shadow-md p-8 max-w-2xl mx-auto">
                
                 <div className="flex justify-end items-center">
                    <IoMdClose onClick={onClose} className="text-xl cursor-pointer hover:text-slate-500"/>
                </div>


       <div className="mb-2">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          IT skills <span className="text-green-300 text-md font-normal">Add 10%</span>
        </h1>
        <p className="text-gray-500 font-medium text-sm">
          Mention skills like programming languages (Java, Python), softwares (Microsoft Word, Excel) and more, to show your technical expertise.
        </p>
      </div>

      <form>
        {/* Skill Card */}
        <div className="mb-3 p-6  rounded-lg">
          {/* Skill Name Section */}
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skill / software name<span className="text-red-500">*</span>
            </label>
            <input
              onChange={(e)=> setSkill(e.target.value)}
              type="text"
              placeholder="Skill / Software name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Divider */}
          <div className="border-t border-gray-300 my-6"></div>

          {/* Software Version and Last Used */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Software version
              </label>
              <input
               onChange={(e)=> setVersion(e.target.value)}
                type="text"
                placeholder="Software version"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last used
              </label>
              <input
              value={lastUsed}
            onClick={()=> setShowLastUsed(prev => !prev)}
                
                placeholder="Last used"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-transparent caret-transparent cursor-pointer outline-0 transition-all duration-200"
              />

              {showlastUsed && <DropDownList setShow={setShowLastUsed} setState={setLastused} content={'LastUsed'}/>}
            </div>
          </div>

          {/* Experience Section */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Experience
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs text-gray-500 mb-2">Years</label>
                <input
                value={experience.years}
                  onClick={()=> setShowExperience(prev => !prev)}
                  
                  placeholder="0"
                  min="0"
                  max="50"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 caret-transparent cursor-pointer outline-0 focus:border-transparent transition-all duration-200"
                />
                {showexperience && <DropDownList setShow={setShowExperience} setState={setExperience} content={'Experience'}/>}
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-2">Months</label>
                <input
                
                value={experience.months}
                  onClick={()=> setShowMonth(prev => !prev)}
                  
                  placeholder="0"
                  min="0"
                  max="11"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 caret-transparent cursor-pointer outline-0 focus:border-transparent transition-all duration-200"
                />
                {showmonths && <DropDownList setShow={setShowMonth} setState={setExperience} content={'Months'}/>}

              </div>
            </div>

            <div className="flex mt-4 justify-center text-green-400 animate-pulse">
                {msg}
            </div>
            
          </div>
        </div>

        
        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
          onClick={onClose}
            type="button"
            className="px-6 py-3 cursor-pointer text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={PostIT_skills}
            disabled={!skill}
            type="submit"
            className={`px-6 py-3  text-white font-medium rounded-lg transition-colors duration-200 ${!skill ? 'bg-gray-500 cursor-not-allowed':'hover:bg-blue-700 bg-blue-600'} shadow-sm`}
          >
            {loading ? <Spinner/>:"Save"}
          </button>
        </div>
      </form>




           </div>
        </div>
    )
}

function DropDownList({content,setState,setShow}:any){

     const Years = Array.from({ length: 59 }, (_, i) => 2025-i);
    const experinceYears = Array.from({ length: 31 }, (_, i) => i);
    const Months = Array.from({length:12},(_, i) => i)

    
    return <div className="absolute z-100 no-scrollbar w-[270px] p-4 bg-white border border-gray-200 rounded-md mt-3 shadow-md max-h-52 overflow-y-auto">
                        
                     {content==="LastUsed" &&  <div className="flex flex-col">
                            {
                              Years.map((each:any)=>{
                                return <span onClick={()=>{
                                    setState(each)
                                    setShow(false)
                                }} className="text-md p-1 hover:bg-gray-100 font-medium">
                                    {each}
                                </span>
                              })
                            }
                        </div>}
                       
                        {content==="Experience" &&  <div className="flex flex-col">
                            {
                              experinceYears.map((each:any)=>{
                                return <span onClick={()=>{
                                    setState((prev:any) => ({...prev,years:`${each} Years`}))
                                    setShow(false)
                                }} className="text-md hover:bg-gray-100 font-medium">
                                    {each} Years
                                </span>
                              })
                            }
                        </div>}

                         {content==="Months" &&  <div className="flex flex-col">
                            {
                              Months.map((each:any)=>{
                                return <span onClick={()=>{
                                    setState((prev:any) => ({...prev,months:`${each} Months`}))
                                    setShow(false)
                                }} className="text-md hover:bg-gray-100 font-medium">
                                    {each} Months
                                </span>
                              })
                            }
                        </div>}

                       

                       
                        </div>

}



interface Joining{
    years:Boolean;
    months:Boolean
}




function Employement_PopUp({onClose}:any){

   

    const years = Array.from({length:54},(_,i)=> 2025-i);
    const months = Array.from({length:12},(_,i)=> i);
    const monthsShort = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];
    const noticePeriodOptions = [
        "15 Days or less",
        "1 Month",
        "2 Months",
        "3 Months",
        "More than 3 Months",
        "Serving Notice Period"
    ];

    const expYears = Array.from({length:31},(_,i)=> i)


const [showJoining,setJoining] = useState<Joining>({
    years:false,
    months:false
});
const [showTill,setTill] = useState<Joining>({
    years:false,
    months:false
})
const [showExp,setShowExp] = useState<Joining>({
    years:false,
    months:false
})
const [showNotice,setShowNotice] = useState(false)


//    Data recording

    const [currentEmployment,setCurrentEmployment] = useState(true);
    const [employmentType,setEmploymentType] = useState('Full-time');

    const [totalExp,setTotalExp] = useState({
        years:"",
        months:""
    })
    const [joiningDate,setJoiningDate] = useState({
        years:"",
        months:""
    })
    const [tillDate,setTillDate] = useState({
        years:"",
        months:""
    })

    const [companyName,setCompany] = useState('');
    const [jobTitle,setJobTitle] = useState('');
    const [skills,setSkills] = useState<String[]>([]);
    const [eachSkill,setEachskill]  = useState('');
    const [profile,setProfile] = useState('');
    const [salary,setSalary] = useState('');
    const [location,setLocation] = useState('');
    const [department,setDepartment] = useState('');
    
    const [notice,setNotice] = useState('');


    function handleSkillArr(each:any){

        const eachNew = each.trim();
        if(eachNew===''){
            return ;
        }

        for(let i=0;i<skills.length;i++){
            if(skills[i]===eachNew){
                return ;
            }
        }

        setSkills(prev => ([...prev,eachNew]));

    

    }

    function handleRemoveSkill(each:any){
        setSkills(prev => prev.filter(eachVal => eachVal!==each));
    }
    function handleJobProfile(each:any){
        const profile = each.trim();

        if(!profile) return ;
        setProfile(profile); 
    }

    const [loading,setLoading] = useState(false);


    async function PostingEmployment(){
        setLoading(true)
        try{
             const posting  = await axios({
                url:'http://localhost:3000/user/postEmployment',
                method:'POST',
                data:{
                    salary,
                    totalExp,
                    joiningDate,
                    tillDate,
                    profile,
                    department,
                    companyName,
                    jobTitle,
                    notice,
                    skills
                }
                ,
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
             })

             if(posting.data && posting.data.ok){
                onClose();
             }

        }
        catch(err){
            console.log(err);
        }
        finally{
            setLoading(false);
        }

    }



    

    return (
        <div className="fixed  inset-0 flex font-aman items-center justify-center bg-black/80 z-50">

            <div className="bg-white no-scrollbar zoom-in max-h-[660px] overflow-y-auto rounded-4xl flex flex-col gap-9 shadow-md p-8 max-w-3xl mx-auto w-[660px]">


                <div className="flex justify-end items-center">
                    <IoMdClose onClick={onClose} className="text-xl cursor-pointer hover:text-slate-500"/>
                </div>


                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-medium">Employment</h1>
                    <p className="text-sm font-medium text-slate-500">Details like job title, company name, etc, help employers understand your work</p>
                </div>


 {/* current employement */}
                <div className="flex flex-col gap-1">
                      <h1 className="font-medium">Is this your current employment?</h1>

                      <div className="flex gap-6">
                        <div className="flex items-center gap-2"><input checked={currentEmployment===true} onChange={()=> setCurrentEmployment(true)} className="accent-black h-4 w-4 " type="radio" /> Yes</div>
                        <div className="flex items-center gap-2"><input checked={currentEmployment===false} type="radio" onChange={()=> setCurrentEmployment(false)} className="accent-black h-4 w-4"/> No</div>
                      </div>
                </div>
                {/* employment type */}

                <div className="flex flex-col gap-2">
                     <h1 className="font-medium">Employement type</h1>

                      <div className="flex gap-6">
                        <div className="flex items-center gap-2"><input onChange={()=> setEmploymentType('Full-time')} checked={employmentType==='Full-time'} className="accent-black h-4 w-4 " type="radio"  /> Full-time</div>
                        <div className="flex items-center gap-2"><input onChange={()=> setEmploymentType('Internship')} checked={employmentType==='Internship'} className="accent-black h-4 w-4 " type="radio"  /> Internship</div>
                      </div>

                </div>

                <form onSubmit={(e)=>{
                             e.preventDefault()
                             PostingEmployment()
                        }} action="" className="flex flex-col gap-8"> 

                {/* Total experience */}

                {(employmentType==='Full-time' && currentEmployment) &&  <div>
                    <h1 className="font-medium">
                        Total experience <sup className="text-red-500">*</sup>
                    </h1>

                    <div className="w-full gap-3 flex">

                        <input required value={totalExp.years} type="text" placeholder="Years" onClick={()=> setShowExp(prev => ({...prev,years:prev.years ? false:true}))} className="caret-transparent rounded-2xl border w-[50%] border-gray-400 outline-0 p-2" />
                        <input required value={totalExp.months} type="text"  onClick={()=> setShowExp(prev => ({...prev,months:prev.months ? false:true}))} placeholder="Months" className="caret-transparent rounded-2xl border w-[50%] border-gray-400 outline-0 p-2" />
                    </div>


                    {/* show drop down list */}

                     {showExp.years && <div className="absolute z-100 no-scrollbar w-[270px] p-2 bg-white border border-gray-200 rounded-md mt-2 shadow-md flex flex-col max-h-52 overflow-y-auto">

                        {
                            expYears.map((each:any)=>{
                                return <span onClick={()=> {
                                    setTotalExp(prev => ({...prev,years:each}))
                                    setShowExp(prev => ({...prev,years:false}))
                                }} className="text-sm font-medium hover:bg-gray-100 p-2">{each} {each<10 ? "Year":each===30 ? '+ Years':"Years"}</span>
                            })
                        }



                    </div>
                    }

                     {showExp.months && <div className="absolute flex flex-col z-100 no-scrollbar w-[270px] p-4 bg-white border border-gray-200 rounded-md right-10 mt-2 shadow-md max-h-52 overflow-y-auto">

                        {
                            months.map((each:any)=>{
                                return <span onClick={()=> {
                                    setTotalExp(prev => ({...prev,months:each}))
                                    setShowExp(prev => ({...prev,months:false}))
                                }} className="text-sm font-medium hover:bg-gray-100 p-2">{each} Months</span>
                            })
                        }



                    </div>
                    }





                </div> }
               


                {/* Current company name */}

                <div className="flex flex-col gap-1">
                    
                    <h1 className="font-medium">{currentEmployment ? 'Current':'Previous'} company name <sup className="text-red-500">*</sup></h1>
                    <input required type="text" onChange={(e)=> setCompany(e.target.value)} className="rounded-2xl p-2 border border-gray-400 outline-0" />

                </div>

                {/* Location  */}

            {employmentType==='Internship' &&  
            
                <div className="flex flex-col gap-1">
                    
                    <h1 className="font-medium">Location <sup className="text-red-500">*</sup></h1>
                    <input required type="text" onChange={(e)=> 
                        {
                            const newLocation = e.target.value.trim();
                            setLocation(newLocation)
                        }} className="rounded-2xl p-2 border border-gray-400 outline-0" />

                </div>}



                {/* Department */}

                {employmentType==='Internship' && <div className="flex flex-col gap-1">
                    
                    <h1  className="font-medium">Department <sup className="text-red-500">*</sup></h1>
                    <input required type="text" onChange={(e)=> setDepartment(e.target.value)} className="rounded-2xl p-2 border border-gray-400 outline-0" />

                </div>}


                 
                 {employmentType==='Full-time'  &&  
                 

                <div className="flex flex-col gap-1">
                    
                    <h1 className="font-medium">{currentEmployment ? 'Current':'Previous'} job title <sup className="text-red-500">*</sup></h1>
                    <input required type="text" onChange={(e)=> {
                        const newJobTitle = e.target.value.trim();
                        setJobTitle(newJobTitle);
                    }} className="rounded-2xl p-2 border border-gray-400 outline-0" />

                </div>
}
                {/* Joining date */}

                <div className="flex flex-col gap-1">
                    
                    <h1 className="font-medium">Joining date <sup className="text-red-500">*</sup></h1>

                    <div className="flex gap-2 w-full" >
                        <input required value={joiningDate.years} type="text" onClick={()=> setJoining(prev => ({...prev,years:prev.years ? false:true}))} placeholder="Select year" className="rounded-2xl cursor-pointer caret-transparent p-2 w-[50%] border border-gray-400 outline-0" />
                        <input required value={joiningDate.months} type="text" onClick={()=> setJoining(prev => ({...prev,months:prev.months ? false:true}))} placeholder="Select Month" className="rounded-2xl cursor-pointer caret-transparent p-2 border w-[50%] border-gray-400 outline-0" />
                    </div>


                    {/* Drop down list */}


                   {showJoining.years && <div className="absolute z-100 no-scrollbar w-[270px] p-2 bg-white border border-gray-200 rounded-md mt-19 shadow-md flex flex-col max-h-52 overflow-y-auto">

                        {
                            years.map((each:any)=>{
                                return <span onClick={()=> {
                                    setJoiningDate(prev => ({...prev,years:each}))
                                    setJoining(prev => ({...prev,years:false}))
                                }} className="text-sm font-medium hover:bg-gray-100 p-2">{each}</span>
                            })
                        }



                    </div>
                    }

                     {showJoining.months && <div className="absolute flex flex-col z-100 no-scrollbar w-[270px] p-4 bg-white border border-gray-200 rounded-md right-10 mt-19 shadow-md max-h-52 overflow-y-auto">

                        {
                            monthsShort.map((each:any)=>{
                                return <span onClick={()=> {
                                    setJoiningDate(prev => ({...prev,months:each}))
                                    setJoining(prev => ({...prev,months:false}))
                                }} className="text-sm font-medium hover:bg-gray-100 p-2">{each}</span>
                            })
                        }



                    </div>
                    }
                    

                    

                </div>

                {/* Till date */}

               {!currentEmployment && <div className="flex flex-col gap-1">
                    
                    <h1 className="font-medium">Till date <sup className="text-red-500">*</sup></h1>

                    <div className="flex gap-2 w-full" >
                        <input required value={tillDate.years} type="text" placeholder="Select year" onClick={()=> setTill(prev => ({...prev,years:prev.years ? false:true}))} className="rounded-2xl caret-transparent cursor-pointer p-2 w-[50%] border border-gray-400 outline-0" />
                        <input required value={tillDate.months}  type="text" placeholder="Select Month" onClick={()=> setTill(prev => ({...prev,months:prev.years ? false:true}))} className="rounded-2xl caret-transparent cursor-pointer p-2 border w-[50%] border-gray-400 outline-0" />
                    </div>

                   {/* drop down list */}

                      {showTill.years && <div className="absolute z-100 no-scrollbar w-[270px] p-2 bg-white border border-gray-200 rounded-md mt-19 shadow-md flex flex-col max-h-52 overflow-y-auto">

                        {
                            years.map((each:any)=>{
                                return <span onClick={()=> {
                                    setTillDate(prev => ({...prev,years:each}));
                                    setTill(prev => ({...prev,years:false}))
                                }} className="text-sm font-medium hover:bg-gray-100 p-2">{each}</span>
                            })
                        }



                    </div>
                    }

                     {showTill.months && <div className="absolute flex flex-col z-100 no-scrollbar w-[270px] p-4 bg-white border border-gray-200 rounded-md right-10 mt-19 shadow-md max-h-52 overflow-y-auto">

                        {
                            monthsShort.map((each:any)=>{
                                return <span onClick={()=>{
                                    setTillDate(prev => ({...prev,months:each}));
                                     setTill(prev => ({...prev,months:false}))
                                }} className="text-sm font-medium hover:bg-gray-100 p-2">{each}</span>
                            })
                        }



                    </div>
                    }
                    

                </div>}

                

                {/* current salary */}

                <div>
                    <h1 className="font-medium">
                        {employmentType==='Intership' ? 'Monthly stipend':'Salary'} <sup className="text-red-500">*</sup>
                    </h1>

                    <div className="w-full flex gap-2">
                        <input type="text" className="w-[13%] rounded-lg p-2 border border-gray-400 outline-0" placeholder="" />
                        <input required type="number" onChange={(e)=> {
                            const salary = e.target.value.trim();
                            setSalary(salary)
                        }}  className="w-[87%] rounded-lg p-2 border border-gray-400 outline-0"/>
                    </div>
                </div>


          
{/* Skills used */}

               {employmentType==='Full-time' && currentEmployment &&  <div className="flex flex-col gap-3">
                    
                    <h1 className="font-medium">Skills used <sup className="text-red-500">*</sup></h1>

                    <div className="flex flex-wrap gap-2">
                        {
                            skills.map((each:any)=>{
                                return <span className="flex gap-1 rounded-full px-3 py-1 items-center border border-gray-400 bg-gray-100">
                                     {each} <IoMdClose onClick={()=> handleRemoveSkill(each)} className="cursor-pointer text-slate-500 text-lg"/>
                                </span>
                            })
                        }
                    </div>
                    <input type="text" onChange={(e)=> setEachskill(e.target.value)} placeholder="Add skills" className="rounded-2xl p-2 border border-gray-400 outline-0" />

                    <button disabled={!eachSkill} onClick={()=> handleSkillArr(eachSkill)} className={`rounded-full  p-1 ${eachSkill ? 'bg-blue-500 text-white cursor-pointer  font-medium':'bg-gray-100 text-slate-400 cursor-not-allowed'}`}>Add</button>

                </div>}


                {/* Job profile */}

                <div className="flex flex-col gap-3">
            <h1 className="font-medium">Job Profile</h1>
            <textarea 
                onChange={(e)=> handleJobProfile(e.target.value)}
                placeholder="Type here..." 
                className="rounded-2xl  outline-0 border border-gray-300 p-4 h-40 resize-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all duration-200 shadow-sm"
            ></textarea>
                </div>


                      {/* Notice period */}
                    {employmentType==='Full-time' && currentEmployment  && <div className="w-full">
                        <h1 className="font-medium">Notice period <sup 
                        className="text-red-500">*</sup></h1>
 
                        <input required type="text" value={notice} placeholder="Select Notice period" onClick={()=> setShowNotice(prev => !prev)} className="rounded-2xl w-full p-2 border border-gray-400 outline-0 caret-transparent" />



                        {/* drop down list */}

                       {showNotice &&  <div className="absolute z-50 no-scrollbar w-[270px] p-2 bg-white border border-gray-200 rounded-md mt-2 shadow-md flex flex-col max-h-52 overflow-y-auto">


                            {
                            noticePeriodOptions.map((each:any)=>{
                                return <span onClick={()=> {
                                    setNotice(each);
                                    setShowNotice(false)
                                }} className="text-sm font-medium hover:bg-gray-100 p-2">{each}</span>
                            })
                        }




                        </div>

                        }
                        
                      </div>}
                      



                      {/* Save and close  */}

                      <div className="flex justify-end gap-4">
                        <button onClick={onClose} className="text-blue-500 cursor-pointer">Cancel</button>
                        <button type="submit" className="bg-blue-500 text-white px-4 rounded-2xl cursor-pointer py-2 font-medium">{loading ? <Spinner/>:'Save'}</button>
                      </div>
                </form>



            </div>


        </div>
    )
}


function EducationDiv({onClose,preObject}:any){
  console.log("prev" + preObject.rowId)
    
    const Starting = Array.from({length:56},(_,i) => 2025-i);
    const Ending = Array.from({length:61},(_,i) => 2030-i);



    // 🎓 Graduation (Undergraduate) Courses
const graduationCourses = [
  "B.Tech / B.E.",
  "B.Sc (Computer Science)",
  "B.Sc (Physics)",
  "B.Sc (Mathematics)",
  "B.Sc (Biotechnology)",
  "B.Com (General)",
  "B.Com (Honours)",
  "BBA (Bachelor of Business Administration)",
  "BA (Economics)",
  "BA (English Literature)",
  "BA (Political Science)",
  "BA (Psychology)",
  "BCA (Bachelor of Computer Applications)",
  "B.Arch (Architecture)",
  "B.Des (Design)",
  "B.Pharm (Pharmacy)",
  "B.Ed (Education)",
  "LLB (Law)",
  "BFA (Fine Arts)",
  "BHM (Hotel Management)",
  "BMS (Management Studies)"
];

// 🎓 Post Graduation (Masters) Courses
const mastersCourses = [
  "M.Tech / M.E.",
  "M.Sc (Computer Science)",
  "M.Sc (Mathematics)",
  "M.Sc (Physics)",
  "M.Sc (Biotechnology)",
  "M.Com (Commerce)",
  "MBA (Master of Business Administration)",
  "MA (Economics)",
  "MA (English Literature)",
  "MA (Psychology)",
  "MCA (Master of Computer Applications)",
  "M.Arch (Architecture)",
  "M.Des (Design)",
  "M.Pharm (Pharmacy)",
  "M.Ed (Education)",
  "LLM (Master of Laws)",
  "MFA (Fine Arts)",
  "MPA (Public Administration)",
  "MSW (Social Work)",
  "M.Sc (Data Science)"
];

const DoctorteCourses = [
    'Ph.D/Doctorate',
    'MPHIL',
    'Other Doctorate'
]

const SchoolBoards = [
    "CBSE (Central Board of Secondary Education)",
  "CISCE (Council for the Indian School Certificate Examinations - ICSE/ISC)",
  "NIOS (National Institute of Open Schooling)",
  "IB (International Baccalaureate)",
  "Cambridge (CIE - Cambridge International Examinations)",
   "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal"
]
const schoolMediums = [
  "English",
  "Hindi",
  "Marathi",
  "Gujarati",
  "Tamil",
  "Telugu",
  "Kannada",
  "Malayalam",
  "Bengali",
  "Punjabi",
  "Urdu",
  "Sanskrit",
  "Assamese",
  "Odia",
  "Konkani",
  "Manipuri",
  "Nepali",
  "Sindhi",
  "Bodo",
  "Other"
];



    const [education,setEducation] = useState('Doctorate/PhD');
    const [courseType,setCourseType] = useState('Full time')
    const [gradingSystem,setGrading] = useState('');
    const [marks,setMarks] = useState('')
    const [board,setBoard] = useState('')
    const [passout,setPassout] = useState('')
    const [medium,setMedium] = useState('')
    const [course,setCourse] = useState('')
    const [university,setUnivsersity] = useState('');
    const [msg,setMsg] = useState('')
    const [duration,setDuration] = useState({
        starting:'',
        ending:''
    })

    const [loading,setLoading] = useState(false)

    async function PostingEducation(){
        setLoading(true)
        try{
            const posting = await axios({
                url:'http://localhost:3000/user/postEducation',
                method:'POST',
                 data:{
                     education:(preObject.education ? preObject.education : education),
                     university,
                     passout,
                     medium,
                     duration,
                     board,
                     gradingSystem,
                     courseType,
                     marks,
                     course,
                     preObject
                     ,
                     rowId:preObject.rowId ? preObject.rowId:"" 


                 }
                ,
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            if(posting.data && posting.data.msg){
                setMsg(posting.data.msg)
            }
            if(posting.data && posting.data.ok){
                onClose();
            }
        }
        catch(err){
            console.log(err)
        }
    }


    useEffect(()=>{
        setEducation(preObject.education || "Doctorate/PhD")
    },[preObject])


    return (

        <div className="fixed  inset-0 flex font-aman items-center justify-center bg-black/80 z-50">
            <div className="bg-white no-scrollbar zoom-in max-h-[660px] overflow-y-auto rounded-4xl flex flex-col gap-9 shadow-md p-8 max-w-3xl mx-auto w-[660px]">

                 <div className="flex justify-end items-center">
                    <IoMdClose onClick={onClose} className="text-xl cursor-pointer hover:text-slate-500"/>
                </div>


                {/* Education */}

                 <form onSubmit={(e)=>{
                    e.preventDefault()
                    PostingEducation()
                 }} className="flex flex-col gap-6">
        {/* Education */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Education <span className="text-red-500">*</span>
          </label>
          <select  disabled={!!(preObject && preObject.education && preObject.rowId)}
 value={preObject?.education ? preObject?.education:education} onChange={(e)=> setEducation(e.target.value)} className="w-full border border-gray-300 caret-transparent  rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500">
            <option value="" hidden></option>
            <option className="" value="Doctorate/PhD">Doctorate/PhD</option>
            <option className="" value="Masters/Post-Graduation">Masters/Post-Graduation</option>
            <option className="" value="Graduation/Diploma">Graduation/Diploma</option>
            <option className="" value="12th">12th</option>
            <option className="" value="10th">10th</option>
            <option className="" value="Below 10th">Below 10th</option>

          </select>
        </div>

        
        {['Doctorate/PhD','Masters/Post-Graduation','Graduation/Diploma'].includes(education) && 
        

        <div className="flex flex-col gap-8 mt-3">
    <div>
          <label className="block text-sm font-medium mb-1">
            University/Institute <span className="text-red-500">*</span>
          </label>
          <input
          value={university}
          required
          onChange={(e)=> setUnivsersity(e.target.value)}
            type="text"
            placeholder="Select university/institute"
            className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

       
        <div>
          <label className="block text-sm font-medium mb-1">
            Course <span className="text-red-500">*</span>
          </label>
          <select value={course} onChange={(e)=> setCourse(e.target.value)} required className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500 mb-2">
            <option value={''} hidden></option>

           {education==='Doctorate/PhD' && 
           DoctorteCourses.map(each=> {
            return <option value={each} key={each}>
                  {each}
            </option>
           })
           }

           {education==='Masters/Post-Graduation' &&
            mastersCourses.map(each=> {
                return <option value={each} key={each}>
                    {each}
                </option>
            })
           }
           {education==='Graduation/Diploma' &&
            graduationCourses.map(each=> {
                return <option value={each} key={each}>
                    {each}
                </option>
            })
           }


          </select>
        
        </div>

       

       
        <div>
          <label className="block text-sm font-medium mb-2">
            Course type <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-10">
            <label className="flex items-center gap-2">
              <input checked={courseType==='Full time'} onClick={()=> setCourseType('Full time')} type="radio" name="type" className="accent-blue-500 h-4 w-4" />
              <span>Full time</span>
            </label>
            <label className="flex items-center gap-2">
              <input checked={courseType==='Part time'} onClick={()=> setCourseType('Part time')} type="radio" name="type" className="accent-blue-500 h-4 w-4" />
              <span>Part time</span>
            </label>
            <label className="flex items-center gap-2">
              <input checked={courseType==='Correspondence/Distance learning'}  onClick={()=> setCourseType('Correspondence/Distance learning')} type="radio" name="type" className="accent-blue-500 h-4 w-4" />
              <span>Correspondence/Distance learning</span>
            </label>
          </div>
        </div>

        
        <div>
          <label className="block text-sm font-medium mb-1">
            Course duration <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-3">
            <select required value={duration.starting} onChange={(e)=> setDuration(prev => ({...prev,starting:e.target.value}))} className="w-1/2 border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500">
              <option value="" hidden></option>
              {
                Starting.map(each=>{
                    return <option value={each} key={each}>{each}</option>
                })
              }
            </select>
            <span className="text-gray-600">To</span>
            <select required value={duration.ending} onChange={(e)=> setDuration(prev => ({...prev,ending:e.target.value}))} className="w-1/2 border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500">
            <option value="" hidden></option>
              {
                Ending.map(each=>{
                    return <option value={each} key={each}>{each}</option>
                })
              }
            </select>
          </div>
        </div>

       
        <div>
          <label className="block text-sm font-medium mb-1">Grading system</label>
          <select required value={gradingSystem} onChange={(e)=> setGrading(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500">
            <option value="" hidden></option>
            <option value="Scale 10 grading system">Scale 10 grading system</option>
            <option value="Scale 4 grading system">Scale 4 grading system</option>
            <option value="% Marks of 100 Maximum">% Marks of 100 Maximum</option>
            <option value="Course Requires a Pass">Course Requires a Pass</option>
          </select>

        {gradingSystem!=='Course Requires a Pass' && <div className="mt-5">
          <label htmlFor="marks">Marks <sup className='text-red-500'>*</sup></label>
          <input required  className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500" onChange={(e)=> setMarks(e.target.value)} type="text" id="marks" />
        </div>
        }
          
        </div>

        </div>
        
        }

        {!['Doctorate/PhD','Masters/Post-Graduation','Graduation/Diploma','Below 10th'].includes(education) &&

        <div className="flex flex-col gap-8 mt-3">

            <div>
          <label className="block text-sm font-medium mb-1">
            Board <span className="text-red-500">*</span>
          </label>
          <select required value={board} onChange={(e)=> setBoard(e.target.value)} className="w-full border border-gray-300 rounded-full p-2 outline-none focus:ring-2 focus:ring-blue-500">
            <option value={''} hidden></option>
            {
                SchoolBoards.map(each=> {
                    return <option value={each} key={each}>{each}</option>
                })
            }
          </select>
        </div>

        {/* Passing out year */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Passing out year <span className="text-red-500">*</span>
          </label>
          <select required value={passout} onChange={(e)=> setPassout(e.target.value)} className="w-full border border-gray-300 rounded-full p-2 outline-none focus:ring-2 focus:ring-blue-500">
            <option value="" hidden></option>
            {
                Starting.map(each=>{
                    return <option value={each} key={each}>{each}</option>
                })
            }
          </select>
        </div>

        {/* School medium */}
        <div>
          <label className="block text-sm font-medium mb-1">
            School medium <span className="text-red-500">*</span>
          </label>
          <select required value={medium} onChange={(e)=> setMedium(e.target.value)} className="w-full border border-gray-300 rounded-full p-2 outline-none focus:ring-1 focus:ring-blue-500">
            <option value="" hidden></option>
            {
                schoolMediums.map(each=>{
                    return <option value={each} key={each}>{each}</option>
                })
            }
          </select>
        </div>

        {/* Marks */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Marks <span className="text-red-500">*</span>
          </label>
          <input
          required
          onChange={(e)=> setMarks(e.target.value)}
            type="text"
            placeholder="% marks of 100 maximum"
            className="w-full border border-gray-300 rounded-full p-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
 
        </div>

        }
        
        {/* Buttons */}
        <div className="flex mt-3 justify-end gap-4">
          <button
          onClick={onClose}
            type="submit"
            className="text-blue-600 hover:underline font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            {loading ? <Spinner/>:'Save'}
          </button>
        </div>



      </form>


      <div className="text-red-500 font-medium flex justify-center">
        {msg}
      </div>






            </div>
        </div>
    )

}

function ProjectDiv({onClose}:any){

  const [title,setTitle] = useState('');
  const [client,setClient] = useState("");
  const [skillsused,setSkills] = useState<String[]>([]);
  const [skill,setSkill] = useState('')
  const [status,setStatus] = useState('Inprogress');
  const [loading,setLoading] = useState(false)
  const [workedFrom,setWorkedFrom] = useState({
    years:"",
    months:""
  })
  const [description,setDesc] = useState('');


  const Years = Array.from({length:50},(_,i)=> 2025-i);
   const monthsShort = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
   ];

   const Characters = 1000;


   async function HandlePosting(){
    setLoading(true)
    try{
           const Data = await axios({
            url:'http://localhost:3000/user/postProjects',
            data:{
              status,
              description,
              workedFrom,
              title,
              client,
              skillsused
            },
            method:"POST",
            headers:{
              Authorization:`Bearer ${localStorage.getItem('token')}`
            }
           })

           if(Data.data && Data.data.ok){
            onClose()
           }
    }
    catch(err){
      console.log(err)
    }
    finally{
      setLoading(false)
    }
   }

   function handleAddSkill(each:any){
     const Trimed = each.trim();
     const If_Exist = skillsused.some(eachSkill => eachSkill===Trimed);
     if(!If_Exist && Trimed!=''){
          setSkills(prev => ([...prev,Trimed]))
     }
   }

   function handleRemoveSkill(each:any){
     const Trimed = each.trim();
     setSkills(prev => prev.filter(e => e!==Trimed))
   }



    return (
        <div className="fixed  inset-0 flex font-aman items-center justify-center bg-black/80 z-50">

            <div className="bg-white no-scrollbar zoom-in max-h-[660px] overflow-y-auto rounded-4xl flex flex-col gap-9 shadow-md p-8 max-w-3xl mx-auto w-[660px]">
 



                <div className="flex justify-end items-center">
                    <IoMdClose onClick={onClose} className="text-xl cursor-pointer hover:text-slate-500"/>
                </div>

                  
                       <h2 className="text-2xl font-semibold text-gray-800 mb-2">Project</h2>
      <p className="text-gray-500 mb-6">
        Stand out for employers by adding details about projects you have done
        in college, internships, or at work
      </p>

      <form onSubmit={(e)=>{
        e.preventDefault()
        HandlePosting()
        }} action="" className="flex flex-col gap-6">
                {/* Project title */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Project title <span className="text-red-500">*</span>
        </label>
        <input
        onChange={(e)=> setTitle(e.target.value)}
          required
          type="text"
          placeholder="Enter project title"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

    

      {/* Client */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Client <span className="text-red-500">*</span>
        </label>
        <input
          onChange={(e)=> setClient(e.target.value)}
          required
          type="text"
          placeholder="Enter client name"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

       {/* Skillused */}
      <div className="mb-5 flex flex-col gap-3 items-start">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Skills Used 
        </label>
        <div className="flex flex-wrap gap-2">

          {
            skillsused.map(each => {
               return <span className="px-3 py-1 flex gap-1 items-center bg-gray-100 rounded-full border border-gray-400">
                {each} <IoMdClose className='text-slate-500 cursor-pointer' onClick={()=> handleRemoveSkill(each)}/>
               </span>
            })
          }
        </div>
        <input
          onChange={(e)=> setSkill(e.target.value)}
          type="text"
          
          placeholder="Enter skill you used"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <span onClick={()=> handleAddSkill(skill)} className="px-4 py-1 bg-purple-500 text-white rounded-full mt-2 cursor-pointer hover:bg-purple-400">Add</span>
      </div>

      {/* Project status */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Project status
        </label>
        <div className="flex items-center space-x-6">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input onChange={()=> setStatus('Inprogress')} checked={status==='Inprogress'} type="radio" name="status" className="accent-black w-4 h-4" />
            <span>In progress</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input onChange={()=> setStatus('Finished')} checked={status==='Finished'} type="radio" name="status" className="accent-black w-4 h-4" />
            <span>Finished</span>
          </label>
        </div>
      </div>

      {/* Worked from */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Worked from <span className="text-red-500">*</span>
        </label>
        <div className="flex space-x-3">
          <select
          required
          onChange={(e)=> setWorkedFrom(prev => ({...prev,years:e.target.value}))} className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600">
            <option hidden value="">Select Year</option>
            {
              Years.map(each=>{
                return <option key={each} value={each}>
                  {each}
                </option>
              })
            }
          </select>
          <select
          required
          onChange={(e)=> setWorkedFrom(prev => ({...prev,months:e.target.value}))} className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600">
            <option hidden value="">Select month</option>
            {
              monthsShort.map(each=>{
                return <option key={each} value={each}>
                  {each}
                </option>
              })
            }
          </select>
        </div>
      </div>

      {/* Details */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Details of project <span className="text-red-500">*</span>
        </label>
        <textarea
          
          onChange={(e)=> setDesc(e.target.value)}
          placeholder="Type here..."
          maxLength={Characters}
          rows={4}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
        <p
    className={`text-right text-xs mt-1 ${
      Characters - description.length === 0 ? "text-red-500" : "text-gray-500"
    }`}
  >
    {Characters - description.length} character(s) left
  </p>
      </div>

      {/* Add more / Save */}
      <div className="flex justify-end items-center">
      
        <div className="space-x-4">
          <button className="text-gray-600 font-medium hover:underline">
            Cancel
          </button>
          <button type='submit' className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition">
            {loading ? <Spinner/>:'Save'}
          </button>
        </div>
      </div>

      </form>

    

            </div>
             
        
        </div>
    )
}















