import { CiCircleCheck, CiSearch, CiSettings } from "react-icons/ci";
import { FaArrowDown, FaGraduationCap, FaRegBuilding, FaRocket, FaRupeeSign, FaSearch } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { MdOutlineScreenSearchDesktop } from "react-icons/md";
import { LuHouse } from "react-icons/lu";
import { IoBagRemoveOutline } from "react-icons/io5";
import { GoGraph } from "react-icons/go";
import { IoCubeOutline } from "react-icons/io5";
import { useState } from "react";
import Footer from "./footer";
import { Spinner } from "./loader";
export default function Home(){

    const listOfTypesofJobs = [
        {
            "text":"Remote",
            "react_icon":<LuHouse className="text-xl"/>
        },
        {
            "text":"MNC",
            "react_icon":<FaRegBuilding className="text-xl"/>
        },
        {
            "text":"Project Mg...",
            "react_icon":<CiCircleCheck className="text-xl"/>
        },{
            "text":"Software &...",
            "react_icon":<MdOutlineScreenSearchDesktop className="text-xl"/>
        },
        {
            "text":"Sales",
            "react_icon":<IoBagRemoveOutline  className="text-xl"/>
        },
        
        {
            "text":"Marketing",
            "react_icon":<GoGraph  className="text-xl"/>
        },
        {
            "text":"Remote",
            "react_icon":<IoCubeOutline className="text-xl"/>
        },
        {
            "text":"Supply Ch...",
            "react_icon":<CiSettings  className="text-xl"/>
        },
        {
            "text":"Engineering",
            "react_icon":<FaRocket  className="text-xl"/>
        },
        {
            "text":"Startup",
            "react_icon":<FaRupeeSign  className="text-xl"/>
        },
        {
            "text":"Banking &...",
            "react_icon":<FaGraduationCap className="text-xl"/>
        }
    ]


   const companies_sponsored = [
    "All",
        "Services",
        "Technology", 
        "Healthcare & Life Sciences",
        "Manufacturing & Production",
        "Infrastructure, Transport & Real Estate",
        "BFSI",
        "Consumer, Retail & Hospitality",
        "BPM", 
        "Media, Entertainment & Telecom",
        "Education",
        "Professional Services"
];
    return <div className="font-aman">
         {/* heading  */}


        
         <div className="flex flex-col gap-3 mt-20 justify-center items-center"> 
            <h1 className="text-4xl font-bold">Find your dream job now</h1>
            <span className="font-medium text-xl">5 lakh+ jobs for you to explore</span>
         </div>

         {/* Skills , experience ,location and search option */}

        <div className="flex justify-center mt-20">
  <div className="w-[70%]  text-slate-500 flex items-center px-6 py-2 shadow-lg rounded-full gap-4">
    {/* Search Icon */}
    <FaSearch/>

    {/* Skills Input */}
    <div className="flex-1">
      <input 
        type="text" 
        className="w-full text-lg outline-none bg-transparent "
        placeholder="Enter skills/designations/companies" 
      />
    </div>

    <div className="">|</div>

    {/* Experience Input */}
    <div className="flex items-center gap-2 min-w-[150px]">
      <input 
        type="text" 
        className="w-full text-lg outline-none bg-transparent "
        placeholder="Select experience" 
      />
    <FaArrowDown/>
    </div>

    <div className="">|</div>

    {/* Location Input */}
    <div className="flex-1">
      <input 
        type="text" 
        className="w-full text-lg outline-none bg-transparent "
        placeholder="Enter location" 
      />
    </div>

    {/* Search Button */}
    <button className="bg-blue-600 text-white rounded-full font-medium px-6 py-3 whitespace-nowrap hover:bg-blue-700 transition-colors">
      Search
    </button>
  </div>
</div>

         {/* diwali banner */}
         <CareerDiwaliBanner/>


         <div className="mx-auto mt-10 gap-6 flex justify-center flex-wrap max-w-6xl">
              
            {
                listOfTypesofJobs.map((each:any)=>{
                    return <div className="flex justify-center border transition-all duration-200   rounded-xl p-4 border-gray-300 cursor-pointer hover:shadow-lg items-center gap-4">

                        {each.react_icon}

                        <span className="flex font-bold items-center justify-center gap-2">
                            {each.text}
                            <IoIosArrowForward className="text-slate-500" />
                        </span>

                    </div>
                })
            }

         </div>


         {/* Top companies hiring now */}

         <div className="mt-20">
            <div className="flex justify-center text-2xl font-bold">
                <h1>Top companies hiring now</h1>
            </div>

            <JobSectors/>


         </div>


         {/* Featured companies actively hiring */}
         <div>
             <FeaturedCompanies/>
         </div>

         {/* Popular Roles */}
         <div className="mx-auto mt-20 flex relative justify-center">
              
            <div className="bg-gradient-to-b  h-auto rounded-2xl border border-orange-200  w-[70%] p-4  flex justify-start to-orange-100  ">
                
                <div className="flex gap-3 items-center flex-col">
                   <img src="https://static.naukimg.com/s/0/0/i/role-collection-ot.png" className="h-[200px] translate-x-15" alt="" />
                   
                    <span className="text-2xl max-w-xs font-bold">Discover jobs across popular roles</span>

                    <p className="text-slate-600 text-sm">Select a role and we'll show you relevant jobs for it!</p>
                </div>
            </div>

            <div className="absolute -top-14 right-70 grid p-8 h-[450px] gap-3 border border-gray-300 bg-white rounded-3xl grid-cols-2">
                <span className="flex border justify-center items-center border-gray-300 rounded-xl p-3 flex-col">
                    <h1>Full stack developer</h1>
                    <span>21.8k+ Jobs {">"}</span>
                </span>
                 <span className="flex border justify-center items-center border-gray-300 rounded-xl  flex-col">
                    <h1>Full stack developer</h1>
                    <span>21.8k+ Jobs {">"}</span>
                </span>
                 <span className="flex border justify-center items-center border-gray-300 rounded-xl p-3 flex-col">
                    <h1>Full stack developer</h1>
                    <span>21.8k+ Jobs {">"}</span>
                </span>
                 <span className="flex border justify-center items-center border-gray-300 rounded-xl p-1 flex-col">
                    <h1>Full stack developer</h1>
                    <span>21.8k+ Jobs {">"}</span>
                </span>
                 <span className="flex border justify-center items-center border-gray-300  rounded-xl p-3 flex-col">
                    <h1>Full stack developer</h1>
                    <span>21.8k+ Jobs {">"}</span>
                </span>
                 <span className="flex border justify-center items-center border-gray-300 rounded-xl p-3 flex-col">
                    <h1>Full stack developer</h1>
                    <span>21.8k+ Jobs {">"}</span>
                </span>
                
            </div>
            
           
         </div>


         {/* Sponsored companies */}

         <div className="mt-20 flex gap-5 flex-col">
            <div className="flex justify-center">
                <h1 className="text-2xl font-bold">Sponsored companies</h1>
            </div>

            {/* List */}

            <div className="flex gap-3 mx-36 flex-wrap justify-center">
                {
                    companies_sponsored.map((each:any)=>{
                       return <span className={`px-5 py-2 cursor-pointer hover:bg-gray-300 border rounded-full  border-gray-300 text-xs ${each==='All' ? 'text-black border-slate-900  bg-gray-300 font-medium':'text-slate-700'}`}>{each}</span>
                    })
                }
            </div>


            <div className="mx-auto">
                 <Sponsored_Companies/>
            </div>


         </div>


        {/* Footer */}
        <Footer/>

         
    </div>
}


const CareerDiwaliBanner = () => {
  return (
    <div className="relative cursor-pointer mt-20 w-full max-w-4xl mx-auto p-4  bg-gradient-to-r from-orange-500 to-yellow-600 rounded-2xl shadow-xl overflow-hidden">
      {/* Top Decorative Border (Simulated with a repeating pattern or texture) */}
  <div 
  className={`absolute top-0 left-0 right-0 h-4 bg-[url('data:image/svg+xml;utf8,${encodeURIComponent('<svg viewBox="0 0 100 10" xmlns="http://www.w3.org/2000/svg"><polygon points="0,0 10,10 20,0" style="fill:rgb(255,255,255,0.2);"/></svg>')}')]`}
  style={{ backgroundSize: '20px 10px', backgroundRepeat: 'repeat-x' }}
>
</div>
      <div className="absolute top-4 left-0 right-0 h-2 bg-yellow-700/30"></div>

      {/* Content Container */}
      <div className="relative flex flex-col items-center justify-center space-y-4 pt-6 pb-4">
        
        {/* Crown Icon (Placeholder) */}
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 text-white border border-white/50">
          {/* Using a simple text/symbol for the crown, replace with an actual SVG/Icon if needed */}
          <span role="img" aria-label="crown" className="text-xl">👑</span>
        </div>

        {/* Hashtag */}
        <div className="absolute top-2 right-2 bg-white text-orange-600 font-semibold text-sm px-3 py-1 rounded-full shadow-md">
          #CareerWaliDiwali
        </div>

        {/* Main Text */}
        <p className="text-white text-xl md:text-2xl font-bold text-center drop-shadow-lg">
          This Diwali, make your career shine brighter with Naukri Pro ✨
        </p>

        {/* Button */}
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105">
          Upgrade My Profile
        </button>
      </div>

      {/* Left Decoration (Flower/Marigold Placeholder) */}
      <div className="absolute top-0 left-0 w-20 h-20 opacity-70">
        {/* Simple placeholder for the flower, consider replacing with an image */}
        <span role="img" aria-label="flower" className="text-5xl absolute top-1 left-1 transform rotate-12">🌼</span>
      </div>

      {/* Right Decoration (Diyas Placeholder) */}
      <div className="absolute bottom-2 right-4 w-16 h-16">
        {/* Simple placeholder for Diyas, consider replacing with an image/SVG */}
        <span role="img" aria-label="diya" className="text-4xl">🪔🪔</span>
      </div>
    </div>
  );
};




const JobSectors = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const jobSectors = [
    {
      title: "MNCs",
      hiring: "2.2K+ are actively hiring",
      color: "from-blue-500 to-purple-600",
      icon: "🏢"
    },
    {
      title: "Fintech",
      hiring: "138 are actively hiring",
      color: "from-green-500 to-teal-600",
      icon: "💳"
    },
    {
      title: "FMCG & Retail",
      hiring: "159 are actively hiring",
      color: "from-orange-500 to-red-600",
      icon: "🛒"
    },
    {
      title: "Startups",
      hiring: "733 are actively hiring",
      color: "from-pink-500 to-rose-600",
      icon: "🚀"
    },
    {
      title: "Edtech",
      hiring: "161 are actively hiring",
      color: "from-indigo-500 to-blue-600",
      icon: "🎓"
    },
    {
      title: "Healthcare",
      hiring: "289 are actively hiring",
      color: "from-emerald-500 to-green-600",
      icon: "🏥"
    },
    {
      title: "IT Services",
      hiring: "1.5K+ are actively hiring",
      color: "from-cyan-500 to-blue-600",
      icon: "💻"
    },
    {
      title: "Manufacturing",
      hiring: "421 are actively hiring",
      color: "from-amber-500 to-orange-600",
      icon: "🏭"
    }
  ];

  const cardsPerPage = 4;
  const totalPages = Math.ceil(jobSectors.length / cardsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === totalPages - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? totalPages - 1 : prevIndex - 1
    );
  };

  const visibleCards = jobSectors.slice(
    currentIndex * cardsPerPage,
    (currentIndex + 1) * cardsPerPage
  );

   // Calculate transform for smooth sliding
  const getTransform = () => {
    return `translateX(-${currentIndex * (100 / cardsPerPage)}%)`;
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        
        
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-white border border-gray-200 rounded-full p-3 transition-all duration-300 hover:scale-110"
          >
            <svg className="w-6 h-6 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 border-gray-200 border bg-white translate-x-4 z-10 rounded-full p-3 transition-all duration-300 hover:scale-110"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Cards Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {visibleCards.map((sector, index) => (
              <div
                key={sector.title}
                className={`  text-black rounded-2xl p-6 shadow-lg transform transition-all duration-500  cursor-pointer border border-gray-300 `}
              >
               
                <h3 className="text-lg flex gap-2 items-center font-[600]  mb-2">
                  {sector.title}
                  <IoIosArrowForward className=""/>
                </h3>
                <p className=" text-xs text-slate-600 font-medium">
                  {sector.hiring}
                </p>
                <div className="mt-4 flex items-center ">
                  <span className="text-sm">Explore Jobs</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center  mt-8 space-x-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-black scale-125' 
                  : 'bg-slate-200 '
              }`}
            />
          ))}
        </div>

        {/* Current Page Info */}
        <div className="text-center mt-6 text-white/70">
          Page {currentIndex + 1} of {totalPages}
        </div>
      </div>
    </div>
  );
};


const FeaturedCompanies = () => {
  const companies = [
    {
      name: "Lloyds Technology Centre",
      rating: "3.4",
      reviews: "176 | reviews",
      description: "A tech and data company.",
      logo: "🏢"
    },
    {
      name: "Capgemini",
      rating: "3.7",
      reviews: "49.5K+|reviews",
      description: "Global leader in technology services.",
      logo: "💼"
    },
    {
      name: "Nagarro",
      rating: "3.9",
      reviews: "4.6K+ | reviews",
      description: "Leader in digital product engineering.",
      logo: "🚀"
    },
    {
      name: "Infosys BPM",
      rating: "3.5",
      reviews: "11.3K+ | reviews",
      description: "Join us to navigate your next",
      
      logo: "🌍"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Featured companies actively hiring
        </h1>
      
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {companies.map((company, index) => (
          <div
            key={index}
            className="flex flex-col items-center  rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
          >
            {/* Company Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-xl">
                  {company.logo}
                </div>
                <div className="flex flex-col items-center">
                  <h3 className="font-semibold text-center text-gray-900 text-lg">
                    {company.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="flex items-center gap-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="text-sm font-medium text-gray-700">
                        {company.rating}
                      </span>
                    </span>
                    <span className="text-sm text-gray-500">
                      {company.reviews}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-4 text-sm text-center">
              {company.description}
            </p>

            

            {/* View Jobs Button */}
            <button className="w-[80%] bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 group">
              View jobs
              <IoIosArrowForward className="group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>
        ))}
      </div>

      {/* View All Companies Button */}
      <div className="text-center">
        <button className="bg-white border border-gray-300 hover:border-gray-400 text-gray-700 font-medium px-8 py-3 rounded-lg transition-all duration-200 hover:shadow-md flex items-center gap-2 mx-auto group">
          View all companies
          <IoIosArrowForward className="group-hover:translate-x-1 transition-transform duration-200" />
        </button>
      </div>
    </div>
  );
};

const Sponsored_Companies=()=>{
    const companies = [
  {
    name: "Yotta Infrastructure",
    rating: "3.6",
    reviews: "145 reviews",
   
    tags: ["Corporate", "B2B", "Private", "Service"],
    logo: "🔧"
  },
  {
    name: "Happiest Minds Technologies",
    rating: "3.6", 
    reviews: "1.5K+ reviews",
    industry: "IT Services & Consulting",
    tags: ["BPM / BPO", "IT Services & Consulting", "Product"],
    logo: "💡"
  },
  {
    name: "AGS Health",
    rating: "4.0",
    reviews: "3.1K+ reviews", 
    industry: "Healthcare Technology",
    tags: ["Software Product", "Analytics / KPO / Research", "B2B"],
    logo: "🏥"
  },
  {
    name: "Myeti",
    rating: "3.8",
    reviews: "149 reviews",
    industry: "IT Services & Consulting",
    tags: ["Foreign MNC", "B2B", "Private"],
    logo: "🌐"
  },
  {
    name: "Mercedes Benz", 
    rating: "3.7",
    reviews: "19K+ reviews",
    industry: "Automobile",
    tags: ["Public", "Corporate", "Automobile"],
    logo: "🚗"
  },
  {
    name: "GAP INC.",
    displayName: "GAP",
    rating: "3.7",
    reviews: "254 reviews", 
    industry: "Retail",
    tags: ["Forbes Global 2000", "Retail", "B2C"],
    logo: "👕"
  },
  {
    name: "Thermo Fisher Scientific",
    rating: "3.8",
    reviews: "982 reviews",
    industry: "Biotech & Life Sciences", 
    tags: ["Foreign MNC", "Biotech & Life sciences"],
    logo: "🔬"
  },
  {
    name: "TTEC",
    rating: "3.6",
    reviews: "1.5K+ reviews",
    industry: "Business Process Management",
    tags: ["Foreign MNC", "Public", "Analytics / KPO / Research"],
    logo: "📊"
  }
];

 return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Featured companies actively hiring
        </h1>
      
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {companies.map((company, index) => (
          <div
            key={index}
            className="flex flex-col  items-center cursor-pointer rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
          >
            {/* Company Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-xl">
                  {company.logo}
                </div>
                <div className="flex flex-col items-center">
                  <h3 className="font-bold text-center text-gray-900 text-lg">
                    {company.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="flex items-center gap-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="text-sm font-medium text-gray-700">
                        {company.rating}
                      </span>
                    </span>
                    <span className="text-sm text-gray-500">
                      {company.reviews}
                    </span>
                  </div>
                </div>
              </div>
            </div>

           {/* Array of types */}

           <div className="flex gap-1 flex-wrap justify-center">
            {    
            company.tags.map((each:any)=>{
                return <span className="border border-gray-300 text-slate-500 rounded-full px-2 py-1 text-[10px]">{each}</span>
            })
           }
           </div>
        

            

           
          
          </div>
        ))}
      </div>

      {/* View All Companies Button */}
      <div className="text-center">
        <button className="bg-white border border-gray-300 hover:border-gray-400 text-gray-700 font-medium px-8 py-3 rounded-lg transition-all duration-200 hover:shadow-md flex items-center gap-2 mx-auto group">
          View all companies
          <IoIosArrowForward className="group-hover:translate-x-1 transition-transform duration-200" />
        </button>
      </div>
    </div>
  );
}




