import API from "../api/axios";

export const getReports = async () => {
    const response = await API.get("/reports");
    return response.data;
};

export const createReport = async (reportData) => {
    const response = await API.post("/reports", reportData);
    return response.data;
};

export const updateReport = async (id, reportData) => {
    const response = await API.put(`/reports/${id}`, reportData);
    return response.data;
};

export const deleteReport = async (id) => {
    const response = await API.delete(`/reports/${id}`);
    return response.data;
};