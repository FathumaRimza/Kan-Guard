import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpeg";


function Navbar(){

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));


    const logout = ()=>{

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/");

    };


    return(

        <nav

        className="navbar px-4"

        style={{
background:"#FFFFFF",
padding:"15px 30px",
boxShadow:"0 3px 15px rgba(0,0,0,.08)",
borderBottom:"3px solid #D6AF5C"

        }}

        >


            {/* Logo */}

            <div className="d-flex align-items-center">

<img
src={logo}
alt="Kan-Guard"
style={{
width:"45px",
height:"45px",
borderRadius:"12px",
marginRight:"12px"
}}
/>

<div>

<h5
style={{
margin:0,
fontWeight:"700",
color:"#4E8F90"
}}
>

Kan-Guard

</h5>

<small
style={{
color:"#9CA3AF"
}}
>

Safe Childhood • Stronger Tomorrow

</small>

</div>

</div>



            {/* Right Side */}

           <div className="d-flex align-items-center gap-3">

    <div className="text-end">


        <h6
        className="mb-0 fw-bold"
        style={{
            color:"#4E8F90",
            fontSize:"18px"
        }}
        >
            {user?.fullName || "User"}
        </h6>

    </div>

    <div
    style={{
        width:"45px",
        height:"45px",
        borderRadius:"50%",
        background:"#F5F1E8",
        border:"2px solid #D6AF5C",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        fontSize:"20px",
        color:"#4E8F90"
    }}
    >
        👤
    </div>

    <button
    className="btn"
    style={{
        background:"#D6AF5C",
        color:"white",
        borderRadius:"12px",
        padding:"8px 22px",
        fontWeight:"600",
        transition:"0.3s"
    }}
    onMouseEnter={(e)=>{
        e.currentTarget.style.background="#C49A3A";
        e.currentTarget.style.transform="scale(1.05)";
    }}
    onMouseLeave={(e)=>{
        e.currentTarget.style.background="#D6AF5C";
        e.currentTarget.style.transform="scale(1)";
    }}
    onClick={logout}
    >
        Logout
    </button>

</div>


        </nav>


    );

}


export default Navbar;