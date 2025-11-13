import { useState } from "react";

export default function SignupAddEdu() {
  const HighestQualification = [
    "Doctorate/PhD",
    'Masters/Post-Graduation',
    'Graduation/Diploma',
    '12th',
    '10th',
    'Below 10th'
  ]

  const educationList = [
    "B.A",
    "BCA", 
    "B.B.A/B.M.S",
    "B.Com",
    "B.Ed",
    "B.Pharma",
    "B.Sc",
    "B.Tech/B.E.",
    "LLB",
    "Diploma"
  ];

  return (
    <div className="min-h-screen font-roboto flex gap-8 justify-center bg-gray-50 items-start p-6">
      {/* left steps completing div */}
      <div className="w-1/3 max-w-md p-6">
        {/* Vertical Progress Bar */}
        <div className="flex gap-4">
          {/* Progress Line */}
          <div className="flex flex-col items-center">
            {/* Completed section - Green tick and line */}
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mb-2">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div className="w-[1px] h-20 bg-green-500"></div>
            
            {/* Current section - Green circle and grey line below */}
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mb-2">
              <span className="text-white text-xs font-bold h-2 w-2 bg-white rounded-full"></span>
            </div>
            <div className="w-[1px] h-20 bg-gray-300"></div>
            
            {/* Remaining sections - Grey circles */}
            <div className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center"></div>
          </div>

          {/* Content */}
          <div className="flex-1">
            {/* Basic details - Completed */}
            <div className="mb-18">
              <h1 className="text-lg text-gray-800">Basic details</h1>
            </div>

            {/* Education - Current */}
            <div className="mb-16">
              <h2 className="text-lg font-semibold text-gray-700">Education</h2>
              <p className="text-gray-600 text-sm mt-1">
                Employers prefer to know about your Education
              </p>
            </div>

            {/* Last step text */}
            <div>
              <p className="text-gray-500 text-sm">Last step</p>
            </div>
          </div>
        </div>
      </div>

      {/* right main div info */}
      <div className="w-2/3 bg-white rounded-xl shadow-lg p-8">
        {/* heading */}
        <div className="mb-8">
          <h1 className="font-bold text-2xl mb-2">Education details</h1>
          <p className="text-gray-600">These details help recruiters identify your background.</p>
        </div>

        <div className="space-y-8">
          {/* highest qualification/degree */}
          <div>
            <div className="mb-3">
              <span className="font-medium text-gray-700">
                Highest qualification/Degree currently pursuing <sup className="text-red-600">*</sup>
              </span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {HighestQualification.map((each, index) => (
                <span key={index} className="px-4 py-2 rounded-full border border-gray-300 text-gray-600 text-sm hover:border-blue-500 hover:text-blue-600 cursor-pointer transition-colors">
                  {each}
                </span>
              ))}
            </div>
          </div>

          {/* Courses */}
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <h1 className="font-medium text-gray-700">Course <sup className="text-red-600">*</sup></h1>
              <input 
                type="text" 
                placeholder="Eg. B.Tech" 
                className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              />
            </div>
            <div>
              <span className="text-sm text-gray-500">Suggestions</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {educationList.map((each, index) => (
                  <span key={index} className="px-4 py-2 rounded-full border border-gray-300 text-gray-600 text-sm hover:border-blue-500 hover:text-blue-600 cursor-pointer transition-colors">
                    {each}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Course type */}
          <div>
            <h1 className="font-medium text-gray-700 mb-3">
              Course type <sup className="text-red-600">*</sup>
            </h1>
            <div className="flex gap-3">
              <span className="px-4 py-2 rounded-full border border-gray-300 text-gray-600 text-sm hover:border-blue-500 hover:text-blue-600 cursor-pointer transition-colors">Full Time</span>
              <span className="px-4 py-2 rounded-full border border-gray-300 text-gray-600 text-sm hover:border-blue-500 hover:text-blue-600 cursor-pointer transition-colors">Part Time</span>
              <span className="px-4 py-2 rounded-full border border-gray-300 text-gray-600 text-sm hover:border-blue-500 hover:text-blue-600 cursor-pointer transition-colors">Distance Learning</span>
            </div>
          </div>

          {/* Specialization */}
          <div>
            <span className="font-medium text-gray-700 mb-2 block">
              Specialization <sup className="text-red-600">*</sup>
            </span>
            <input 
              type="text" 
              placeholder="Eg. Data Analytics" 
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            />
          </div>

          {/* University section */}
          <div>
            <div className="mb-3">
              <h2 className="font-medium text-gray-700">
                University / Institute<span className="text-red-600">*</span>
              </h2>
            </div>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Eg. Enter your university/institute name"
            />
          </div>

          {/* Starting year */}
          <div className="space-y-3">
            <h1 className="font-medium text-gray-700">Starting year <sup className="text-red-600">*</sup></h1>
            <input 
              type="text" 
              placeholder="Eg. 2025" 
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            />
            <div className="flex gap-2">
              <span className="px-4 py-2 rounded-full border border-gray-300 text-gray-600 text-sm hover:border-blue-500 hover:text-blue-600 cursor-pointer transition-colors">2025</span>
              <span className="px-4 py-2 rounded-full border border-gray-300 text-gray-600 text-sm hover:border-blue-500 hover:text-blue-600 cursor-pointer transition-colors">2024</span>
              <span className="px-4 py-2 rounded-full border border-gray-300 text-gray-600 text-sm hover:border-blue-500 hover:text-blue-600 cursor-pointer transition-colors">2023</span>
              <span className="px-4 py-2 rounded-full border border-gray-300 text-gray-600 text-sm hover:border-blue-500 hover:text-blue-600 cursor-pointer transition-colors">2022</span>
            </div>
          </div>

          {/* Ending year */}
          <div className="space-y-3">
            <h1 className="font-medium text-gray-700">Ending year <sup className="text-red-600">*</sup></h1>
            <input 
              type="text" 
              placeholder="Eg. 2025" 
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            />
            <div className="flex gap-2">
              <span className="px-4 py-2 rounded-full border border-gray-300 text-gray-600 text-sm hover:border-blue-500 hover:text-blue-600 cursor-pointer transition-colors">2028</span>
              <span className="px-4 py-2 rounded-full border border-gray-300 text-gray-600 text-sm hover:border-blue-500 hover:text-blue-600 cursor-pointer transition-colors">2027</span>
              <span className="px-4 py-2 rounded-full border border-gray-300 text-gray-600 text-sm hover:border-blue-500 hover:text-blue-600 cursor-pointer transition-colors">2026</span>
              <span className="px-4 py-2 rounded-full border border-gray-300 text-gray-600 text-sm hover:border-blue-500 hover:text-blue-600 cursor-pointer transition-colors">2025</span>
            </div>
          </div>

          {/* Grading System */}
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <h1 className="font-medium text-gray-700">Grading system <sup className="text-red-600">*</sup></h1>
              <input 
                type="text" 
                placeholder="Select grading system" 
                className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              />
            </div>
            <div>
              <span className="text-sm text-gray-500">Suggestions</span>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-4 py-2 rounded-full border border-gray-300 text-gray-600 text-sm hover:border-blue-500 hover:text-blue-600 cursor-pointer transition-colors">Scale 10 Grading System</span>
                <span className="px-4 py-2 rounded-full border border-gray-300 text-gray-600 text-sm hover:border-blue-500 hover:text-blue-600 cursor-pointer transition-colors">Scale 4 Grading System</span>
                <span className="px-4 py-2 rounded-full border border-gray-300 text-gray-600 text-sm hover:border-blue-500 hover:text-blue-600 cursor-pointer transition-colors">% Marks of 100 Maximum</span>
                <span className="px-4 py-2 rounded-full border border-gray-300 text-gray-600 text-sm hover:border-blue-500 hover:text-blue-600 cursor-pointer transition-colors">Course Requires a Pass</span>
              </div>
            </div>
          </div>

          {/* Key skills - Add your AddSkills component here */}
          <div>
            <AddSkills/>
          </div>
        </div>
      </div>
    </div>
  );
}

function AddSkills(){
  
  const [skills, setSkills] = useState(['Web Designing']);
  const [inputValue, setInputValue] = useState('');

  const suggestions = [
    'Web Designer',
    'Ux And UI Designer',
    'User Interface Designer',
    'Graphic Web Designer',
    'Web Application Developer',
    'Graphic Designer',
    'User Experience Designer',
    'Html Developer',
    'Web Designer And Developer',
    'Wordpress Developer'
  ];

  const addSkill = (skill:any) => {
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
    setInputValue('');
  };

  const removeSkill = (skillToRemove:any) => {
    setSkills(skills.filter((skill:any) => skill !== skillToRemove));
  };

  const handleInputChange = (e:any) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyPress = (e:any) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      addSkill(inputValue.trim());
    }
  };

  return (
    <div className="max-w-4xl  p-2 bg-white">
      {/* Heading */}
      <div className="mb-6">
        <h2 className="text-lgtext-gray-900">
          Key skills<span className="text-red-500">*</span>
        </h2>
      </div>

      {/* Selected Skills */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {skills.map((skill:any, index:any) => (
            <div
              key={index}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2"
            >
              <span className="text-sm">{skill}</span>
              <button
                onClick={() => removeSkill(skill)}
                className="text-blue-600 hover:text-blue-800 text-lg font-bold"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Input Field */}
      <div className="mb-6 flex flex-col gap-2 items-start">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleInputKeyPress}
          placeholder="Type a skill and press Enter"
          className="w-full px-4 py-3 border border-gray-300 text-slate-400 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <span
        onClick={()=>{
           if(inputValue){
            addSkill(inputValue)
           }
        }}
        className={`${inputValue ? 'text-blue-500 font-bold':'text-slate-500'} border cursor-pointer border-slate-400 rounded-full px-3 py-1`}>Add+</span>
      </div>

      {/* Recruiters Info */}
      <div className="mb-6">
        <p className="text-gray-500 text-xs mb-4">
          Recruiters look for candidates with specific key skills
        </p>
        <p className="text-gray-500 font-medium mb-3 text-xs">Suggestions:</p>
      </div>

      {/* Suggestions Grid */}
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => addSkill(suggestion)}
            className=" px-3 py-1 border border-gray-300 text-sm rounded-full hover:bg-gray-50 hover:border-blue-500 transition-colors duration-200"
          >
            <span className="text-gray-700">{suggestion}</span>
            <span className="text-blue-500 ml-1">+</span>
          </button>
        ))}
      </div>
    </div>
  );
};
