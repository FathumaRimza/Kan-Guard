import API from "../api/axios";

export const getAlerts = async()=>{

const response = await API.get("/alerts");

return response.data;

};

export const createAlert = async(data)=>{

const response = await API.post("/alerts",data);

return response.data;

};

export const updateAlert = async(id,data)=>{

const response = await API.put(`/alerts/${id}`,data);

return response.data;

};

export const deleteAlert = async(id)=>{

const response = await API.delete(`/alerts/${id}`);

return response.data;

};