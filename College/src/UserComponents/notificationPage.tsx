import axios from "axios";
import React, { useEffect, useState } from "react";
import { timeAgo } from "./IdBasedJob";
import { Spinner } from "@/components/loader";

function ReturnCard({isRead,each}:any){

    if(!isRead){
        return <div className="flex gap-4  p-4 bg-white rounded-xl shadow-sm border border-blue-100">
            <div className="mt-1">
              <span className="h-3 w-3 rounded-full bg-blue-600 block"></span>
            </div>

            <div className="flex-1">
              <p className="text-slate-800 font-medium">
               {each.message}
              </p>

              <p className="text-sm text-slate-500 mt-1">
                {timeAgo(each.createdAt)}
              </p>
            </div>
          </div>
    }

    return   <div className="flex gap-4 p-4 bg-white/70 rounded-xl border border-slate-200">
            <div className="mt-1">
              <span className="h-3 w-3 rounded-full bg-transparent block"></span>
            </div>

            <div className="flex-1">
              <p className="text-slate-700">
                {each.message}
              </p>

              <p className="text-sm text-slate-500 mt-1">
                {timeAgo(each.createdAt)}
              </p>
            </div>
          </div>
}
const Notifications = () => {

    const [notifications,setNotifications] = useState([])

    async function GetNotifications_forUser(){
        setLoading(true)
        try{
           const Notifications = await axios({
            url:'http://localhost:3000/user/getNotificationsUser',
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            },
            method:'GET'
           })

           if(Notifications.data && Notifications.data.All){
            setNotifications(Notifications.data.All)
           }
        }
        catch(err){
            console.log(err)
        }
        finally{
            setLoading(false)
        }
    }

    async function MarkAllRead(){
        try{
            const All_Read = await axios({
                url:'http://localhost:3000/user/markAllread',
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`,
                },
                method:'PUT'
            })

            if(All_Read.data && All_Read.data.ok){
                GetNotifications_forUser()
            }
        }
        catch(err){
            console.log(err)
        }
    }


    useEffect(()=>{
        GetNotifications_forUser()
    },[])

   const [loading,setLoading] = useState(false)
  return (
    <div className="min-h-screen font-aman bg-slate-100 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-slate-800">
            Notifications
          </h1>
           
          <button
          onClick={MarkAllRead}
          className="text-sm text-blue-600 hover:underline">
            Mark all as read
          </button>
        </div>

        {/* Notifications List */}
        
        <div className="space-y-4">
            {
                notifications.map((each:any) => {
                    return <ReturnCard each={each} isRead={each.isRead}/>
                })
            }

        </div>


       

        {/* Empty State (comment out above list to use) */}
        {/*
        <div className="flex flex-col items-center justify-center mt-20 text-center">
          <div className="text-5xl mb-4">🔔</div>
          <h2 className="text-lg font-medium text-slate-700">
            No notifications yet
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            You’ll see updates related to your job applications here.
          </p>
        </div>
        */}
      </div>
    </div>
  );
};

export default Notifications;
