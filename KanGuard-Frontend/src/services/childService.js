import API from "../api/axios";


// Get all children

export const getChildren = async()=>{

    const response = await API.get("/children");

    return response.data;

};



// Add child

export const addChild = async(childData)=>{

    const response = await API.post(
        "/children",
        childData
    );

    return response.data;

};



// Update child

export const updateChild = async(id,childData)=>{

    const response = await API.put(
        `/children/${id}`,
        childData
    );

    return response.data;

};



// Delete child

export const deleteChild = async(id)=>{

    const response = await API.delete(
        `/children/${id}`
    );

    return response.data;

};