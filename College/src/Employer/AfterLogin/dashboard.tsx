import { Hamburger, HamburgerIcon, HamIcon } from "lucide-react";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import PostJob from "./jobPost";
import ManageJobs from "./ManageJobs";
import ApplicantsTab from "./applicants";
import CompanyProfileUI from "./companyProfile";
import ShortlistedCandidates from "./shortlistedApplicants";


const EmployerDashboard = () => {
    const [collapse,setCollapse] = useState(false);
    const [curPage,setCurPage] = useState('Dashboard');

  return (
    <div className="flex h-screen flex-col bg-gray-100">

        <header className="w-full bg-white shadow-md py-4 px-6 flex justify-between items-center fixed top-0 left-0 z-50">
      {/* Left Branding */}
      <div className="flex items-center gap-2">
        <img
          src="/LogoYuva.jpg"
          alt="logo"
          className="w-10 h-10 rounded "
        />
        <h1 className="text-2xl font-semibold text-gray-700">
          JobSphere – Employer Panel
        </h1>
      </div>

      {/* Right Icons */}
      <div className="flex items-center gap-8">
        {/* Notifications */}
        <div className="relative cursor-pointer">
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            5
          </span>
          <span className="text-2xl">🔔</span>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3 cursor-pointer">
          <img
            src="/ss.png"
            alt="profile"
            className="w-9 h-9 rounded-full"
          />
          
        </div>
      </div>
    </header>

        <div className="min-h-screen flex pt-20">
            {/* ---------- Sidebar ---------- */}
      <aside className={`w-64 ${!collapse ? 'right-appear' : 'left-collapse'} shadow-2xl p-5 fixed left-0 top-18 h-[calc(100vh-80px)] overflow-y-auto bg-white`}>
        <div className="flex mb-8 justify-between items-center">
            <h2 className={`text-2xl font-bold text-blue-600 ${!collapse ? '':'hidden'} `}>Employer</h2>
            
            <RxHamburgerMenu onClick={()=> setCollapse(prev => !prev)} className={`cursor-pointer hover:text-slate-500 font-bold ${!collapse ? '':'scale-200 transition-all duration-500'} `}/>
        </div>
        
        <nav className={`space-y-2 ${!collapse ? '':'hidden'} font-medium`}>

          <a onClick={(e)=> setCurPage("Dashboard")} className={`block ${curPage==='Dashboard' && 'bg-blue-100'} text-gray-700 hover:text-blue-600 p-2 cursor-pointer`}>Dashboard</a>

          <a onClick={(e)=> setCurPage("Post")} className={`block text-gray-700 ${curPage==='Post' && 'bg-blue-100'} hover:text-blue-600 p-2 cursor-pointer`}>Post a Job</a>

          <a onClick={(e)=> setCurPage("ManageJobs")} className={`block text-gray-700 ${curPage==='ManageJobs' && 'bg-blue-100'} hover:text-blue-600 p-2 cursor-pointer`}>Manage Jobs</a>

          <a onClick={(e)=> setCurPage("Applicants")} className={`block text-gray-700 ${curPage==='Applicants' && 'bg-blue-100'} hover:text-blue-600 p-2 cursor-pointer`}>Applicants</a>

          <a onClick={(e)=> setCurPage("CompanyProfile")} className={`block text-gray-700 ${curPage==='CompanyProfile' && 'bg-blue-100'} hover:text-blue-600 p-2 cursor-pointer`}>Company Profile</a>
          <a onClick={(e)=> setCurPage("Shortlisted")} className={`block text-gray-700 ${curPage==='Shortlisted' && 'bg-blue-100'} hover:text-blue-600 p-2 cursor-pointer`}>See Shortlisted</a>
          <a onClick={()=> {
                localStorage.removeItem('employerToken');
                localStorage.removeItem('Employeremail');
                window.location.href = '/'
          }} className={`block text-gray-700 p-2  hover:text-blue-600 cursor-pointer`}>Logout</a>
        </nav>
      </aside>
      
      {curPage==='Dashboard'  && <main className="flex-1 p-8 overflow-y-auto ml-64">

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-5 rounded-xl shadow text-center">
            <p className="text-4xl font-bold text-blue-600">54</p>
            <p className="text-gray-600 font-medium">Total Applicants</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow text-center">
            <p className="text-4xl font-bold text-green-600">12</p>
            <p className="text-gray-600 font-medium">Active Jobs</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow text-center">
            <p className="text-4xl font-bold text-yellow-600">7</p>
            <p className="text-gray-600 font-medium">New Applications Today</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow text-center">
            <p className="text-4xl font-bold text-purple-600">23</p>
            <p className="text-gray-600 font-medium">Interviews Scheduled</p>
          </div>
        </div>

        {/* Recent Job Posts */}
        <section className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">Recent Job Posts</h2>
            <button className="text-blue-600 font-medium hover:underline cursor-pointer">View All</button>
          </div>
          <div className="bg-white p-5 rounded-xl shadow space-y-3">
            <p className="flex justify-between border-b pb-2">
              <span>Frontend Developer</span> <span className="text-green-600">Active</span>
            </p>
            <p className="flex justify-between border-b pb-2">
              <span>Backend Developer</span> <span className="text-gray-600">Closed</span>
            </p>
            <p className="flex justify-between">
              <span>UI/UX Designer</span> <span className="text-green-600">Active</span>
            </p>
          </div>
        </section>

        {/* Recent Applicants */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">Recent Applicants</h2>
            <button className="text-blue-600 font-medium hover:underline cursor-pointer">View All</button>
          </div>
          <div className="bg-white p-5 rounded-xl shadow space-y-3">
            <p className="flex justify-between border-b pb-2">
              <span>Raj Sharma — React Developer</span> <span className="text-gray-500">Applied Today</span>
            </p>
            <p className="flex justify-between border-b pb-2">
              <span>Neha Patel — UI/UX Designer</span> <span className="text-gray-500">1 day ago</span>
            </p>
            <p className="flex justify-between">
              <span>Aman Verma — Java Backend</span> <span className="text-gray-500">2 days ago</span>
            </p>
          </div>
        </section>

      </main>}

      {curPage==='Post' && <div className={`flex-1 p-8 overflow-y-auto ${collapse ? 'ml-10':'ml-64'}`}><PostJob /></div>}
      {curPage==='ManageJobs' && <div className={`flex-1 p-8 overflow-y-auto ${collapse ? 'ml-10':'ml-64'}`}><ManageJobs setCurPage={setCurPage}/></div>}
      {curPage==='Applicants' && <main className={`flex-1 p-8 overflow-y-auto ${collapse ? 'ml-10':'ml-64'}`}><ApplicantsTab /></main>}
      
      {curPage==='CompanyProfile' && <main className={`flex-1 p-8 overflow-y-auto ${collapse ? 'ml-10':'ml-64'}`}><CompanyProfileUI setCurPage={setCurPage}/></main>}
      {curPage==='Shortlisted' && <main className={`flex-1 p-8 overflow-y-auto ${collapse ? 'ml-10':'ml-64'}`}><ShortlistedCandidates /></main>}

      {/* ---------- Main Content ---------- */}
      
        </div>
      
    </div>
  );
};

export default EmployerDashboard;
