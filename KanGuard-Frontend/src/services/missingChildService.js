import API from "../api/axios";


// Get all missing children

export const getMissingChildren = async()=>{

    const response = await API.get("/missing");

    return response.data;

};




// Create missing child report

export const createMissingChild = async(data)=>{


    const response = await API.post(
        "/missing",
        data
    );


    return response.data;

};




// Update status

export const updateMissingChild = async(id,data)=>{


    const response = await API.put(
        `/missing/${id}`,
        data
    );


    return response.data;

};




// Delete

export const deleteMissingChild = async(id)=>{


    const response = await API.delete(
        `/missing/${id}`
    );


    return response.data;

};