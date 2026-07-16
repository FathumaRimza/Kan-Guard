import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

import logo from "../assets/logo.jpeg";
import Sidebar from "../components/Sidebar";
import DashboardCharts from "../components/DashboardCharts";
import RecentReports from "../components/RecentReports";

import {
    getDashboard
} from "../services/dashboardService";


function Dashboard() {


    const navigate = useNavigate();
const user = JSON.parse(localStorage.getItem("user"));

    const [stats,setStats] = useState({

        totalUsers:0,
        totalChildren:0,
        totalReports:0,
        pendingReports:0,
        totalAlerts:0,
        missingChildren:0,
        unreadNotifications:0,

         recentReports:[]

    });


    useEffect(()=>{

        loadDashboard();

    },[]);




    const loadDashboard = async()=>{

        try{

            const data = await getDashboard();

            setStats(data.dashboard);


        }
        catch(error){

            console.log(
                "Dashboard loading error",
                error
            );

        }

    };





    return (

        <div>


            <Navbar/>


            <div className="container-fluid">


                <div className="row">



                    {/* Sidebar */}

                    <div className="col-md-3 col-lg-2 p-0">

                        <Sidebar/>

                    </div>





                    {/* Main */}

                  <div
className="col-md-9 col-lg-10 p-4"
style={{
background:"#F7F8F5",
minHeight:"100vh"
}}
>

                       <div

className="card shadow-lg border-0 mb-4"
style={{
borderRadius:"25px",
background:"linear-gradient(135deg,#78B7B5,#4E8F90)",
overflow:"hidden"
}}
>

<div className="row g-0 align-items-center">

<div
className="col-md-3 d-flex justify-content-center align-items-center"
>

<img
src={logo}
alt="Kan-Guard"
style={{
width:"160px",
height:"160px",
borderRadius:"20px",
background:"white",
padding:"10px",
boxShadow:"0 8px 20px rgba(0,0,0,0.2)"
}}
/>
</div>
<div className="col-md-9">

<div className="card-body">

<h2
className="fw-bold"
style={{
color:"#FFFFFF",
fontSize:"32px"
}}
>

Welcome Back,

{user?.fullName}

</h2>
<p
style={{
color:"#D6AF5C",
fontWeight:"600",
letterSpacing:"1px"
}}
>

Together We Keep Every Child Safe

</p>

<p
className="mt-3"
style={{
color:"#E5E7EB",
fontSize:"16px",
lineHeight:"28px"
}}
>

Monitor children's safety, manage reports, issue alerts,
and build a stronger, safer community together.

</p>

</div>

</div>

</div>

</div>




                        <div className="row mt-4">



                            {/* Children */}

                            <div className="col-md-3 mb-3">


                              <div

className="card shadow-lg border-0 text-center"

onMouseEnter={(e)=>{
e.currentTarget.style.transform="scale(1.05)";
e.currentTarget.style.boxShadow="0 18px 35px rgba(0,0,0,.25)";
}}
onMouseLeave={(e)=>{
e.currentTarget.style.transform="scale(1)";
e.currentTarget.style.boxShadow="0 8px 20px rgba(0,0,0,.15)";
}}

style={{
cursor:"pointer",
borderRadius:"20px",
background:"#78B7B5",
color:"white",
transition:"0.3s ease",
padding:"25px",
height:"190px",
display:"flex",
justifyContent:"center",
alignItems:"center"
}}

onClick={()=>navigate("/children")}
>


                                    <h5>
                                        👧 Children
                                    </h5>


                                    <h2>
                                        {stats.totalChildren}
                                    </h2>


                                    <p>
                                        Registered Children
                                    </p>


                                </div>


                            </div>







                            {/* Reports */}

                            <div className="col-md-3 mb-3">


                               <div

className="card shadow-lg border-0 text-center"

onMouseEnter={(e)=>{
e.currentTarget.style.transform="scale(1.05)";
e.currentTarget.style.boxShadow="0 18px 35px rgba(0,0,0,.25)";
}}
onMouseLeave={(e)=>{
e.currentTarget.style.transform="scale(1)";
e.currentTarget.style.boxShadow="0 8px 20px rgba(0,0,0,.15)";
}}



style={{
cursor:"pointer",
borderRadius:"18px",
background:"#D6AF5C",
color:"white",
height:"190px",
display:"flex",
justifyContent:"center",
alignItems:"center"

}}

onClick={()=>navigate("/reports")}
>


                                    <h5>
                                        🚨 Reports
                                    </h5>


                                    <h2>
                                        {stats.totalReports}
                                    </h2>


                                    <p>
                                        Safety Reports
                                    </p>


                                </div>


                            </div>









                            {/* Alerts */}

                            <div className="col-md-3 mb-3">

<div

className="card shadow-lg border-0 text-center"

onMouseEnter={(e)=>{
e.currentTarget.style.transform="scale(1.05)";
e.currentTarget.style.boxShadow="0 18px 35px rgba(0,0,0,.25)";
}}
onMouseLeave={(e)=>{
e.currentTarget.style.transform="scale(1)";
e.currentTarget.style.boxShadow="0 8px 20px rgba(0,0,0,.15)";
}}



style={{
    cursor:"pointer",
borderRadius:"18px",
background:"#4E8F90",
color:"white",
height:"190px",
display:"flex",
justifyContent:"center",
alignItems:"center"

}}

onClick={()=>navigate("/alerts")}
>


                                    <h5>
                                        ⚠️ Alerts
                                    </h5>


                                    <h2>
                                        {stats.totalAlerts}
                                    </h2>


                                    <p>
                                        Active Alerts
                                    </p>


                                </div>


                            </div>









                            {/* Notifications */}

                            <div className="col-md-3 mb-3">

<div

className="card shadow-lg border-0 text-center"

onMouseEnter={(e)=>{
e.currentTarget.style.transform="scale(1.05)";
e.currentTarget.style.boxShadow="0 18px 35px rgba(0,0,0,.25)";
}}
onMouseLeave={(e)=>{
e.currentTarget.style.transform="scale(1)";
e.currentTarget.style.boxShadow="0 8px 20px rgba(0,0,0,.15)";
}}



style={{
cursor:"pointer",
borderRadius:"18px",
background:"#D6AF5C",
color:"white",
height:"190px",
display:"flex",
justifyContent:"center",
alignItems:"center"

}}

onClick={()=>navigate("/notifications")}
>

                                    <h5>
                                        🔔 Notifications
                                    </h5>


                                    <h2>
                                        {stats.unreadNotifications}
                                    </h2>


                                    <p>
                                        Unread Notifications
                                    </p>


                                </div>


                            </div>



                        </div>









                        {/* More Statistics */}


<div
className="card shadow border-0 mt-4 p-4"
style={{
borderRadius:"20px",
background:"#FFFFFF"
}}
>

                           <h4
style={{
color:"#4E8F90",
fontSize:"28px",
fontWeight:"700"
}}
>

System Overview

</h4>



                            <div className="row mt-3">


                                <div className="col-md-4">

             <h6
              style={{
        color:"#6B7280",
        fontWeight:"600"
      }}
             >
                                        👥 Total Users
                                    </h6>

             <h3
             style={{
                color:"#4E8F90",
                fontWeight:"700",
                fontSize:"32px"
             }}
             
             >
       {stats.totalUsers}
     </h3>

                                </div>




                                <div className="col-md-4">

          <h6
           style={{
        color:"#6B7280",
        fontWeight:"600"
      }}
          >
   ⏳ Pending Reports
                                 </h6>

          <h3
           style={{
                color:"#D6AF5C",
                fontWeight:"700",
                fontSize:"32px"
             }}
          >
         {stats.pendingReports}
          </h3>

                                </div>





                                <div className="col-md-4">

          <h6
           style={{
        color:"#6B7280",
        fontWeight:"600"
      }}
          >
                                        Missing Children
                                    </h6>

  <h3
   style={{
                color:"#4E8F90",
                fontWeight:"700",
                fontSize:"32px"
             }}
  >
       {stats.missingChildren}
</h3>

                                </div>


                            </div>


                        </div>

                    {(user?.role === "Police" || user?.role === "SchoolAdmin") && (
    <DashboardCharts stats={stats}/>
)}
{(user?.role === "Police" || user?.role === "SchoolAdmin") && (

    <RecentReports
        reports={stats.recentReports}
    />

)}



                    </div>



                </div>


            </div>



        </div>

    );


}


export default Dashboard;