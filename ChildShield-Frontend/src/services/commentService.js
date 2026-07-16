import API from "../api/axios";

// Get comments for a report
export const getComments = async (reportId) => {
  const response = await API.get(`/comments/report/${reportId}`);
  return response.data;
};

// Create comment
export const createComment = async (data) => {
  const response = await API.post("/comments", data);
  return response.data;
};

// Delete comment
export const deleteComment = async (id) => {
  const response = await API.delete(`/comments/${id}`);
  return response.data;
};