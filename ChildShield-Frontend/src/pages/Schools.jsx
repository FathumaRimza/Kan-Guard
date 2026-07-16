import {useEffect,useState} from "react";


import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";


import {
getSchools,
addSchool,
updateSchool,
deleteSchool
} from "../services/schoolService";



function Schools(){



const emptyForm={

schoolName:"",
address:"",
district:"",
principal:"",
contactNumber:"",
email:""

};



const [schools,setSchools]=useState([]);

const [form,setForm]=useState(emptyForm);

const [editId,setEditId]=useState(null);





useEffect(()=>{

loadSchools();

},[]);






const loadSchools=async()=>{


try{


const data=await getSchools();


setSchools(data.schools || []);


}
catch(error){

console.log(error);

}


};







const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


};







const submitSchool=async(e)=>{


e.preventDefault();



try{


if(editId){


await updateSchool(
editId,
form
);


alert("School updated");


}
else{


await addSchool(form);


alert("School added");


}



setForm(emptyForm);

setEditId(null);

loadSchools();



}
catch(error){


console.log(error);

alert(
"Failed to save school"
);


}



};







const editSchool=(school)=>{


setForm({

schoolName:school.schoolName,

address:school.address,

district:school.district,

principal:school.principal,

contactNumber:school.contactNumber,

email:school.email

});


setEditId(school._id);


};







const removeSchool=async(id)=>{


if(window.confirm("Delete school?")){


await deleteSchool(id);


loadSchools();


}


};








return(


<div>


<Navbar/>




<div className="row">



<div className="col-md-3">

<Sidebar/>

</div>








<div className="col-md-9 p-4">


<h2>
School Management 🏫
</h2>







<div className="card shadow p-4 mt-3">


<h4>

{
editId
?
"Update School"
:
"Add School"

}

</h4>




<form onSubmit={submitSchool}>


<input

className="form-control mb-2"

name="schoolName"

placeholder="School Name"

value={form.schoolName}

onChange={handleChange}

/>






<input

className="form-control mb-2"

name="address"

placeholder="Address"

value={form.address}

onChange={handleChange}

/>







<input

className="form-control mb-2"

name="district"

placeholder="District"

value={form.district}

onChange={handleChange}

/>







<input

className="form-control mb-2"

name="principal"

placeholder="Principal Name"

value={form.principal}

onChange={handleChange}

/>







<input

className="form-control mb-2"

name="contactNumber"

placeholder="Contact Number"

value={form.contactNumber}

onChange={handleChange}

/>







<input

className="form-control mb-2"

name="email"

placeholder="Email"

value={form.email}

onChange={handleChange}

/>







<button className="btn btn-success">

{
editId
?
"Update"
:
"Add"

}

</button>



</form>



</div>









<div className="card shadow p-4 mt-4">


<h4>
School List
</h4>





<table className="table">


<thead>

<tr>

<th>
School
</th>


<th>
District
</th>


<th>
Principal
</th>


<th>
Contact
</th>


<th>
Action
</th>


</tr>


</thead>






<tbody>


{

schools.map((school)=>(


<tr key={school._id}>


<td>
{school.schoolName}
</td>


<td>
{school.district}
</td>


<td>
{school.principal}
</td>


<td>
{school.contactNumber}
</td>



<td>


<button

className="btn btn-warning btn-sm me-2"

onClick={()=>editSchool(school)}

>

Edit

</button>





<button

className="btn btn-danger btn-sm"

onClick={()=>removeSchool(school._id)}

>

Delete

</button>


</td>



</tr>


))


}



</tbody>


</table>



</div>





</div>



</div>



</div>


);


}


export default Schools;