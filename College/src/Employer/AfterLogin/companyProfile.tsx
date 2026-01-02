import React, { useEffect, useState } from "react";
import { 
  Building, 
  Users, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle, 
  User, 
  Briefcase, 
  Calendar,
  Edit3,
  FileText,
  Hash,
  Globe,
  Award
} from "lucide-react";
import axios from "axios";
// PartialSafeEmployer banayein
export interface PartialSafeEmployer {
  id?: number;
  name?: string;
  email?: string;
  emailVerify?: boolean;
  hiringfor?: string | null;
  company?: string | null;
  industry?: string | null;
  noOfEmployees?: string | null;
  designation?: string | null;
  pincode?: string | null;
  companyAddress?: string | null;
  phone?: string | null;
  createdAs?: string | null;
  website?: string | null;
  founded?: string | null;
  companyDescription?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}
const CompanyProfileUI = ({setCurPage}:any) => {
  // Sample static data
  const [employer, setEmployer] = useState<PartialSafeEmployer>({});

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({ ...employer });
  

  const handleEditToggle = () => {
    if (isEditing) {
       updateData(editedData); // ✅ Edited data bhejo
    } else {
      setEditedData({ ...employer }); 
      
    }
    setIsEditing(!isEditing);
    
  };


  const handleInputChange = (field: string, value: string) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }));
  };


  async function GetEmployer(){
     
      try{
            const Getting = await axios({
              url:'http://localhost:3000/user/getEmployer',
              method:'GET',
              headers:{
                Authorization:`Bearer ${localStorage.getItem('employerToken')}`
              }

            })

            if(Getting.data && Getting.data.employer){
              setEmployer(Getting.data.employer)
              setEditedData(Getting.data.employer)
            }

     }
     catch(err){
      console.log(err)
     }
  }


  async function updateData(dataToUpdate:Partial<PartialSafeEmployer>){
  

    try{
         const Updating = await axios({
          url:"http://localhost:3000/user/updateEmployer",
          headers:{
            Authorization:`Bearer ${localStorage.getItem('employerToken')}`
          },
          method:'POST',
          data:{
            employer:dataToUpdate
          }
         })

         if(Updating.data && Updating.data.ok){
             GetEmployer();
         }
    }
    catch(err){
      console.log(err)
    }
    finally{
      setIsEditing(!isEditing)
    }

   
  }

  useEffect(()=>{
    GetEmployer()
  },[])
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with Stats */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Company Profile
          </h1>
          <p className="text-gray-600">Manage and update your company information</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Company Overview Card */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Company Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <Building className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{employer.company}</h2>
                    <div className="flex items-center space-x-2 mt-1">
                      <Globe className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{employer.website || "www.ishan.com"}</span>
                      <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
                        {employer.industry}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleEditToggle}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg font-medium transition-all ${
                    isEditing 
                      ? "bg-green-100 text-green-700 hover:bg-green-200" 
                      : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700"
                  }`}
                >
                  <Edit3 className="w-4 h-4" />
                  <span>{isEditing ? "Save Changes" : "Edit Profile"}</span>
                </button>
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                      <input
                        type="text"
                        value={editedData.company as string}
                        onChange={(e) => handleInputChange("company", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                      <input
                        type="text"
                        value={editedData.industry as string}
                        onChange={(e) => handleInputChange("industry", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                      <input
                        type="text"
                        value={editedData.website as string}
                        onChange={(e) => handleInputChange("website", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Founded</label>
                      <input
                        type="text"
                        value={editedData.founded as string}
                        onChange={(e) => handleInputChange("founded", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Description</label>
                    <textarea
                      value={editedData.companyDescription as string}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              ) : (
                <p className="text-gray-600 mb-6">{employer.companyDescription}</p>
              )}

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6 border-t border-gray-100">
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <Users className="w-5 h-5 text-blue-500" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{employer.noOfEmployees}</p>
                  <p className="text-sm text-gray-500">Employees</p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <FileText className="w-5 h-5 text-green-500" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{30}</p>
                  <p className="text-sm text-gray-500">Active Jobs</p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <Calendar className="w-5 h-5 text-purple-500" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{employer.founded || "2018"}</p>
                  <p className="text-sm text-gray-500">Founded</p>
                </div>
                
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <MapPin className="w-5 h-5 text-blue-500 mr-2" />
                Location Information
              </h3>
              {isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                      type="text"
                      value={editedData.companyAddress as string}
                      onChange={(e) => handleInputChange("companyAddress", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                    <input
                      type="text"
                      value={editedData.pincode as string}
                      onChange={(e) => handleInputChange("pincode", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-900 font-medium">Company Address</p>
                      <p className="text-gray-600">{employer.companyAddress}</p>
                      <p className="text-gray-600">Pincode: {employer.pincode}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Contact & Timeline */}
          <div className="space-y-6">
            {/* Contact Person Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User className="w-5 h-5 text-green-500 mr-2" />
                Contact Person
              </h3>
              
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      value={editedData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                    <input
                      type="text"
                      value={editedData.designation as string}
                      onChange={(e) => handleInputChange("designation", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={editedData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="text"
                      value={editedData.phone as string}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xl font-bold text-gray-900">{employer.name}</p>
                      <div className="flex items-center mt-1">
                        <Briefcase className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">{employer.designation}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-gray-900 font-medium">Email Address</p>
                        <div className="flex items-center">
                          <span className="text-gray-600 mr-2">{employer.email}</span>
                          {employer.emailVerify && (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-gray-900 font-medium">Phone Number</p>
                        <p className="text-gray-600">{employer.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Hash className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-gray-900 font-medium">Hiring For</p>
                        <p className="text-gray-600">{employer.hiringfor}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Timeline Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Timeline</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">Account Created</span>
                  </div>
                  <span className="text-gray-900 font-medium">{new Date(employer.createdAt || "").toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        })}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">Last Updated</span>
                  </div>
                  <span className="text-gray-900 font-medium">{new Date(employer.updatedAt || "").toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        })}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                onClick={()=> setCurPage("ManageJobs")}
                className="w-full bg-white/20 text-white hover:bg-white/30 py-2.5 rounded-lg font-medium transition-colors">
                  View Posted Jobs
                </button>
                <button
                onClick={()=> setCurPage("Post")}
                className="w-full bg-white/20 text-white hover:bg-white/30 py-2.5 rounded-lg font-medium transition-colors">
                  Post New Job
                </button>
                <button
                onClick={()=> setCurPage('Applicants')}
                className="w-full bg-white/20 text-white hover:bg-white/30 py-2.5 rounded-lg font-medium transition-colors">
                  View Applicants
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfileUI;