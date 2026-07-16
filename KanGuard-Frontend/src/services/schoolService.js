import API from "../api/axios";


// Get all schools

export const getSchools = async()=>{

const response = await API.get("/schools");

return response.data;

};




// Add school

export const addSchool = async(schoolData)=>{

const response = await API.post(
"/schools",
schoolData
);

return response.data;

};




// Update school

export const updateSchool = async(id,schoolData)=>{

const response = await API.put(
`/schools/${id}`,
schoolData
);

return response.data;

};




// Delete school

export const deleteSchool = async(id)=>{

const response = await API.delete(
`/schools/${id}`
);

return response.data;

};