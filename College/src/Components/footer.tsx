import { BiSolidOffer } from "react-icons/bi";
import { FaGooglePlay, FaInstagram, FaLinkedin } from "react-icons/fa";
import { ImFacebook2 } from "react-icons/im";
import { FaXTwitter } from "react-icons/fa6";
export default function Footer(){
    return <div className="flex justify-between mx-44 mt-20 bg-slate-100 mb-10 rounded-2xl font-aman py-5 px-4">

        {/* 1 */}

        <div className="flex items-center flex-col justify-between max-h-40">
                   <div className="flex gap-2 items-center">
                         <BiSolidOffer className="text-5xl text-blue-500" />
                     <span className="text-3xl font-bold text-blue-500">YuvaJobs</span>
                   </div>


                   <div className="flex flex-col">
                    <span className="font-medium">Connect with us</span>
                    <div className="flex gap-4 text-slate-500">
                        <ImFacebook2  className="text-lg"/>
                        <FaInstagram className="text-lg"/>
                        <FaXTwitter className="text-lg"/>
                        <FaLinkedin className="text-lg"/>

                    </div>
                   </div>
        </div>


        {/* 2 */}
        <div className="flex flex-col gap-3">
            <span className="hover:text-slate-500 cursor-pointer">About us</span>
            <span className="hover:text-slate-500 cursor-pointer">Careers</span>
            <span className="hover:text-slate-500 cursor-pointer">Employer home</span>
            <span className="hover:text-slate-500 cursor-pointer">Sitemap</span>
            <span className="hover:text-slate-500 cursor-pointer">Credits</span>
        </div>

        {/* 3 */}
        <div className="flex flex-col gap-3">
            <span className="hover:text-slate-500 cursor-pointer">Help center</span>
            <span className="hover:text-slate-500 cursor-pointer">Summons/Notices</span>
            <span className="hover:text-slate-500 cursor-pointer">Grievances</span>
            <span className="hover:text-slate-500 cursor-pointer">Report issue</span>
            
        </div>

        {/* 4 */}
        <div className="flex flex-col gap-3">
            <span className="hover:text-slate-500 cursor-pointer">Privacy policy</span>
            <span className="hover:text-slate-500 cursor-pointer">Terms & conditions</span>
            <span className="hover:text-slate-500 cursor-pointer">Fraud alert</span>
            <span className="hover:text-slate-500 cursor-pointer">Trust & safety</span>
            
        </div>


        {/* 5. */}

        <div className="border rounded-2xl border-slate-300 w-[30%] p-5">
            <h2 className="font-bold">Apply on the go</h2>
            <p className="text-xs text-slate-500">Get real-time job updates on our App</p>

            <div className="flex justify-center mt-5">
                
            <img src="./ss.png" className="w-[80%] " alt="" />

                
            </div>
        </div>
    </div>
}