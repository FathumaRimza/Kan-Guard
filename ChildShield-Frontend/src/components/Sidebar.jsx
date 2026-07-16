import { Link } from "react-router-dom";

import {useState } from "react";

function Sidebar() {

    const [active,setActive] = useState("");


  const user = JSON.parse(localStorage.getItem("user"));

  const role = user?.role;
console.log(user);
console.log(role);
  return (
    <div
     className="text-white p-3"
style={{
background:"linear-gradient(180deg,#4E8F90,#78B7B5)",
minHeight:"100vh",
boxShadow:"4px 0 20px rgba(0,0,0,0.12)"
}}
    >
     <div className="text-center mb-4">


<h4
className="fw-bold mt-2"
style={{
letterSpacing:"1px",
color:"#FFFFFF"
}}
>

Kan-Guard

</h4>

<small
style={{
color:"#BFDBFE"
}}
>

Protect • Empower • Respect

</small>

<hr
className="mt-3"
style={{
borderColor:"#D6AF5C"
}}
/>

</div>



      <ul className="nav flex-column">

        {/* Dashboard */}
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/dashboard"
               onMouseEnter={()=>setActive("dashboard")}
                    onMouseLeave={()=>setActive("")}

                      style={{
                        color:"#FFFFFF",
                        padding:"12px 18px",
                        borderRadius:"12px",
                        marginBottom:"6px",
                        fontWeight:"500",
                        transition:"0.3s",
                        display:"block",
                        background:active==="dashboard"
                       ?"rgba(214,175,92,0.35)"
                         :"transparent"
                      }}
        
                            >
            🏠 Dashboard
                  </Link>
                 </li>

                  {/* Parent */}
                   {role === "Parent" && (
                        <>
                        <li className="nav-item mb-2">
                       <Link className="nav-link text-white" to="/children"
              
                                onMouseEnter={()=>setActive("children")}
                                 onMouseLeave={()=>setActive("")}
                                 style={{
                      color:"#FFFFFF",
                       padding:"12px 18px",
                      borderRadius:"12px",
                      marginBottom:"6px",
                    fontWeight:"500",
                        transition:"0.3s",
                          display:"block",
                        background:active==="children"
                       ?"rgba(214,175,92,0.35)"
                         :"transparent"
                        
                             }}
                             >
                           👶 My Children
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link className="nav-link text-white" to="/reports"

              onMouseEnter={()=>setActive("reports")}
                      onMouseLeave={()=>setActive("")}
              style={{
color:"#FFFFFF",
padding:"12px 18px",
borderRadius:"12px",
marginBottom:"6px",
fontWeight:"500",
transition:"0.3s",
  display:"block",
                        background:active==="reports"
                       ?"rgba(214,175,92,0.35)"
                         :"transparent"
}}
              
              >
                🚨 Report Incident
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link
                className="nav-link text-white"
                to="/missingChildren"

                onMouseEnter={()=>setActive("missingChildren")}
                    onMouseLeave={()=>setActive("")}


                style={{
color:"#FFFFFF",
padding:"12px 18px",
borderRadius:"12px",
marginBottom:"6px",
fontWeight:"500",
transition:"0.3s",
  display:"block",
                        background:active==="missingChildren"
                       ?"rgba(214,175,92,0.35)"
                         :"transparent"
}}
              >
                🔍 Missing Children
              </Link>
            </li>
          </>
        )}

        {/* School Admin */}
        {role === "SchoolAdmin" && (
          <>
            <li className="nav-item mb-2">
              <Link className="nav-link text-white" to="/schools"

              onMouseEnter={()=>setActive("schools")}
                 onMouseLeave={()=>setActive("")}
              style={{
color:"#FFFFFF",
padding:"12px 18px",
borderRadius:"12px",
marginBottom:"6px",
fontWeight:"500",
transition:"0.3s",
  display:"block",
                        background:active==="schools"
                       ?"rgba(214,175,92,0.35)"
                         :"transparent"
}}
              
              >
                🏫 Schools
              </Link>
            </li>
            <li className="nav-item mb-2">
  <Link className="nav-link text-white" to="/children"

           onMouseEnter={()=>setActive("children")}
                  onMouseLeave={()=>setActive("")}
  style={{
color:"#FFFFFF",
padding:"12px 18px",
borderRadius:"12px",
marginBottom:"6px",
fontWeight:"500",
transition:"0.3s",
  display:"block",
                        background:active==="children"
                       ?"rgba(214,175,92,0.35)"
                         :"transparent"
}}
  
  >
    👶 All Children
  </Link>
</li>
<li className="nav-item mb-2">
  <Link
    className="nav-link text-white"
    to="/missingChildren"

                 onMouseEnter={()=>setActive("missingChildren")}
                  onMouseLeave={()=>setActive("")}
  style={{
color:"#FFFFFF",
padding:"12px 18px",
borderRadius:"12px",
marginBottom:"6px",
fontWeight:"500",
transition:"0.3s",
  display:"block",
                        background:active==="missingChildren"
                       ?"rgba(214,175,92,0.35)"
                         :"transparent"
}}
  >
    🔍 Missing Children
  </Link>
</li>

            <li className="nav-item mb-2">
              <Link className="nav-link text-white" to="/reports"
                                    onMouseEnter={()=>setActive("reports")}
                  onMouseLeave={()=>setActive("")}
              
              style={{
color:"#FFFFFF",
padding:"12px 18px",
borderRadius:"12px",
marginBottom:"6px",
fontWeight:"500",
transition:"0.3s",
  display:"block",
                        background:active==="reports"
                       ?"rgba(214,175,92,0.35)"
                         :"transparent"
}}
              >
                🚨 Reports
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link className="nav-link text-white" to="/alerts"
                               onMouseEnter={()=>setActive("alerts")}
                  onMouseLeave={()=>setActive("")}
              
              style={{
color:"#FFFFFF",
padding:"12px 18px",
borderRadius:"12px",
marginBottom:"6px",
fontWeight:"500",
transition:"0.3s",
  display:"block",
                        background:active==="alerts"
                       ?"rgba(214,175,92,0.35)"
                         :"transparent"
}}
              >
                📢 Alerts
              </Link>
            </li>
          </>
        )}

        {/* Police */}
        {role === "Police" && (
          <>
            <li className="nav-item mb-2">
              <Link className="nav-link text-white" to="/reports"
                               onMouseEnter={()=>setActive("reports")}
                  onMouseLeave={()=>setActive("")}
              
              style={{
color:"#FFFFFF",
padding:"12px 18px",
borderRadius:"12px",
marginBottom:"6px",
fontWeight:"500",
transition:"0.3s",
  display:"block",
                        background:active==="reports"
                       ?"rgba(214,175,92,0.35)"
                         :"transparent"
}}
              >
                🚔 Reports
              </Link>
            </li>

            <li className="nav-item mb-2">
  <Link className="nav-link text-white" to="/children"
                       onMouseEnter={()=>setActive("children")}
                  onMouseLeave={()=>setActive("")}
  
  style={{
color:"#FFFFFF",
padding:"12px 18px",
borderRadius:"12px",
marginBottom:"6px",
fontWeight:"500",
transition:"0.3s",
  display:"block",
                        background:active==="children"
                       ?"rgba(214,175,92,0.35)"
                         :"transparent"
}}
  >
    👶 All Children
  </Link>
</li>

            <li className="nav-item mb-2">
              <Link
                className="nav-link text-white"
                to="/missingChildren"
                           onMouseEnter={()=>setActive("missingChildren")}
                  onMouseLeave={()=>setActive("")}

                style={{
color:"#FFFFFF",
padding:"12px 18px",
borderRadius:"12px",
marginBottom:"6px",
fontWeight:"500",
transition:"0.3s",
  display:"block",
                        background:active==="missingChildren"
                       ?"rgba(214,175,92,0.35)"
                         :"transparent"
}}
              >
                👦 Missing Children
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link className="nav-link text-white" to="/alerts"
                                     onMouseEnter={()=>setActive("alerts")}
                  onMouseLeave={()=>setActive("")}
              
              style={{
color:"#FFFFFF",
padding:"12px 18px",
borderRadius:"12px",
marginBottom:"6px",
fontWeight:"500",
transition:"0.3s",
  display:"block",
                        background:active==="alerts"
                       ?"rgba(214,175,92,0.35)"
                         :"transparent"
}}
              >
                🚨 Alerts
              </Link>
            </li>
          </>
        )}

        <li className="nav-item mb-2">

<Link
className="nav-link text-white"
to="/anonymousSupport"
                 onMouseEnter={()=>setActive("anonymousSupport")}
                  onMouseLeave={()=>setActive("")}

style={{
color:"#FFFFFF",
padding:"12px 18px",
borderRadius:"12px",
marginBottom:"6px",
fontWeight:"500",
transition:"0.3s",
  display:"block",
                        background:active==="anonymousSupport"
                       ?"rgba(214,175,92,0.35)"
                         :"transparent"
}}
>

💬 Anonymous Support

</Link>

</li>

        {/* Common */}
        <li className="nav-item mb-2">
          <Link
            className="nav-link text-white"
            to="/notifications"
                        onMouseEnter={()=>setActive("notifications")}
                  onMouseLeave={()=>setActive("")}

            style={{
color:"#FFFFFF",
padding:"12px 18px",
borderRadius:"12px",
marginBottom:"6px",
fontWeight:"500",
transition:"0.3s",
  display:"block",
                        background:active==="notifications"
                       ?"rgba(214,175,92,0.35)"
                         :"transparent"
}}
          >
            🔔 Notifications
          </Link>
        </li>

      </ul>
      <div
className="text-center mt-5"
style={{
color:"#E8F5F5",
fontSize:"12px"
}}
>

<hr style={{borderColor:"#D6AF5C"}}/>

© 2026 Kan-Guard

<br/>

Safe Childhood • Stronger Tomorrow

</div>
    </div>
  );
}

export default Sidebar;