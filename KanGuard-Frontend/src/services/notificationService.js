import API from "../api/axios";



export const getNotifications = async()=>{


    const response =
    await API.get("/notifications");


    return response.data;


};





export const createNotification = async(data)=>{


    const response =
    await API.post(
        "/notifications",
        data
    );


    return response.data;


};





export const markRead = async(id)=>{


    const response =
    await API.put(
        `/notifications/${id}/read`
    );


    return response.data;


};





export const deleteNotification = async(id)=>{


    const response =
    await API.delete(
        `/notifications/${id}`
    );


    return response.data;


};