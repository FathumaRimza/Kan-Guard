import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import React, { useEffect, useState } from "react";

import {
  getReports,
  createReport,
  deleteReport,
  updateReport
} from "../services/reportService";

import { getChildren } from "../services/childService";

import {
  getComments,
  createComment,
  deleteComment,
} from "../services/commentService";

function Report() {
  const emptyForm = {
    child: "",
    title: "",
    category: "Bullying",
    description: "",
    location: "",
    incidentDate: "",
  };

  const [reports, setReports] = useState([]);
  const [children, setChildren] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [isFocused, setIsFocused] = useState(""); 

  // Comment States
  const [selectedReport, setSelectedReport] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    loadReports();
    loadChildren();
  }, []);

  const loadReports = async () => {
    try {
      const data = await getReports();
      setReports(data.reports || []);
    } catch (error) {
      console.log(error);
    }
  };

  const loadChildren = async () => {
    try {
      const data = await getChildren();
      setChildren(data.children || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitReport = async (e) => {
    e.preventDefault();
    console.log("FORM DATA:", form);
    try {
      const response = await createReport(form);
      console.log("SUCCESS RESPONSE:", response);
      alert("Report Submitted");
      setForm(emptyForm);
      loadReports();
    } catch (error) {
      console.log("FULL ERROR:", error);
      console.log("SERVER ERROR:", error.response?.data);
      alert(error.response?.data?.message || "Failed");
    }
  };

  const removeReport = async (id) => {
    if (window.confirm("Delete Report?")) {
      await deleteReport(id);
      loadReports();
    }
  };

  const markSolved = async (id) => {
    try {
      await updateReport(id, { status: "Solved By Parent" });
      alert("Report marked as solved.");
      loadReports();
    } catch (error) {
      console.log(error);
      alert("Failed");
    }
  };

  // ==========================
  // COMMENTS
  // ==========================

  const loadComments = async (reportId) => {
    console.log("Loading comments for:", reportId);
    try {
      const data = await getComments(reportId);
      console.log(data);
      setComments(data.comments || []);
      setSelectedReport(reportId);
    } catch (error) {
      console.log(error);
    }
  };

  const submitComment = async () => {
    if (commentText.trim() === "") return;
    try {
      await createComment({
        report: selectedReport,
        comment: commentText,
      });
      setCommentText("");
      loadComments(selectedReport);
    } catch (error) {
      console.log(error);
    }
  };

  const removeComment = async (id) => {
    if (window.confirm("Delete Comment?")) {
      await deleteComment(id);
      loadComments(selectedReport);
    }
  };

  const changeStatus = async (id, status) => {
    try {
      await updateReport(id, { status });
      loadReports();
      alert("Status Updated");
    } catch (error) {
      console.log(error);
      alert("Failed");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar Section */}
          <div className="col-md-3">
            <Sidebar />
          </div>

          {/* Main Content Section */}
          <div
            className="col-md-9 p-4"
            style={{
              background: "#F8FAF8",
              minHeight: "100vh"
            }}
          >
            <h2 className="fw-bold" style={{ color: "#4E8F90" }}>
              🚨 Safety Reports
            </h2>

            <p style={{ color: "#6B7280" }}>
              Report incidents to help keep children safe.
            </p>

            {/* Create Report Form */}
            <div
              className="card shadow border-0 p-4 mt-3"
              style={{ borderRadius: "20px" }}
            >
              <h4 className="fw-bold" style={{ color: "#4E8F90", fontWeight: "700" }}>
                ➕ Create Safety Report
              </h4>

              <form onSubmit={submitReport}>
                <div className="mb-3">
                  <label className="form-label">Select Child</label>
                  <select
                    className="form-control"
                    name="child"
                    value={form.child}
                    onChange={handleChange}
                    onFocus={() => setIsFocused("child")}
                    onBlur={() => setIsFocused("")}
                    required
                    style={{
                      borderRadius: "12px",
                      padding: "10px",
                      border: isFocused === "child" ? "1px solid #D6AF5C !important" : "1px solid #D6AF5C",
                      borderColor: "#D6AF5C",
                      outline: "none",
                      boxShadow: isFocused === "child" ? "0 0 0 0.25rem rgba(214, 175, 92, 0.4) !important" : "none",
                    }}
                  >
                    <option value="">-- Choose Child --</option>
                    {children.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name || c.fullName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    onFocus={() => setIsFocused("title")}
                    onBlur={() => setIsFocused("")}
                    required
                    style={{
                      borderRadius: "12px",
                      padding: "10px",
                      border: isFocused === "title" ? "1px solid #D6AF5C !important" : "1px solid #D6AF5C",
                      borderColor: "#D6AF5C",
                      outline: "none",
                      boxShadow: isFocused === "title" ? "0 0 0 0.25rem rgba(214, 175, 92, 0.4) !important" : "none",
                    }}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <select
                    className="form-control"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    onFocus={() => setIsFocused("category")}
                    onBlur={() => setIsFocused("")}
                    style={{
                      borderRadius: "12px",
                      padding: "10px",
                      border: isFocused === "category" ? "1px solid #D6AF5C !important" : "1px solid #D6AF5C",
                      borderColor: "#D6AF5C",
                      outline: "none",
                      boxShadow: isFocused === "category" ? "0 0 0 0.25rem rgba(214, 175, 92, 0.4) !important" : "none",
                    }}
                  >
                    <option value="Suspicious Person">Suspicious Person Roaming</option>
                    <option value="Bullying">Bullying</option>
                    <option value="Child Abuse">Child Abuse</option>
                    <option value="CyberBullying">Cyberbullying</option>
                    <option value="Kidnapping Attempt">Kidnapping Attempt</option>
                    <option value="Unsafe Road">Unsafe Road</option>
                    <option value="Drug Activity">Drug Activity</option>
                    <option value="Harassment">Harassment</option>
                    <option value="Fighting">Fighting</option>
                    <option value="Theft">Theft</option>
                    <option value="Medical Emergency">Medical Emergency</option>
                    <option value="Vandalism">Vandalism</option>
                    <option value="Emotional Distress">Emotional Distress</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    onFocus={() => setIsFocused("description")}
                    onBlur={() => setIsFocused("")}
                    required
                    style={{
                      borderRadius: "12px",
                      padding: "10px",
                      border: isFocused === "description" ? "1px solid #D6AF5C !important" : "1px solid #D6AF5C",
                      borderColor: "#D6AF5C",
                      outline: "none",
                      boxShadow: isFocused === "description" ? "0 0 0 0.25rem rgba(214, 175, 92, 0.4) !important" : "none",
                    }}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    onFocus={() => setIsFocused("location")}
                    onBlur={() => setIsFocused("")}
                    style={{
                      borderRadius: "12px",
                      padding: "10px",
                      border: isFocused === "location" ? "1px solid #D6AF5C !important" : "1px solid #D6AF5C",
                      borderColor: "#D6AF5C",
                      outline: "none",
                      boxShadow: isFocused === "location" ? "0 0 0 0.25rem rgba(214, 175, 92, 0.4) !important" : "none",
                    }}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Incident Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="incidentDate"
                    value={form.incidentDate}
                    onChange={handleChange}
                    onFocus={() => setIsFocused("incidentDate")}
                    onBlur={() => setIsFocused("")}
                    required
                    style={{
                      borderRadius: "12px",
                      padding: "10px",
                      border: isFocused === "incidentDate" ? "1px solid #D6AF5C !important" : "1px solid #D6AF5C",
                      borderColor: "#D6AF5C",
                      outline: "none",
                      boxShadow: isFocused === "incidentDate" ? "0 0 0 0.25rem rgba(214, 175, 92, 0.4) !important" : "none",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn"
                  style={{
                    background: "#4E8F90",
                    color: "white",
                    borderRadius: "12px",
                    padding: "10px 28px",
                    fontWeight: "600"
                  }}
                >
                  Submit Report
                </button>
              </form>
            </div>

            {/* Reports List Table */}
            <div
              className="card shadow border-0 p-4 mt-4"
              style={{ borderRadius: "20px" }}
            >
              <h4 style={{ color: "#4E8F90", fontWeight: "700" }}>Existing Reports</h4>
              <table className="table table-hover align-middle mt-3">
                <thead style={{ background: "#4E8F90", color: "white" }}>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((report) => (
                    <React.Fragment key={report._id}>
                      <tr>
                        <td>{report.title}</td>
                        <td>
                          <span
                            className="badge"
                            style={{
                              background: "#D6AF5C",
                              color: "white",
                              padding: "8px 12px",
                              borderRadius: "20px"
                            }}
                          >
                            {report.category}
                          </span>
                        </td>
                        <td>{report.location}</td>
                        <td>
                          {user?.role === "Parent" ? (
                            <span
                              className="badge"
                              style={{
                                background:
                                  report.status === "Resolved" ? "#4E8F90" :
                                  report.status === "Investigating" ? "#D6AF5C" :
                                  report.status === "School Verified" ? "#0F766E" :
                                  report.status === "Community Verified" ? "#8B5E3C" :
                                  "#DC2626",
                                color: "white",
                                padding: "8px 12px",
                                borderRadius: "20px"
                              }}
                            >
                              {report.status}
                            </span>
                          ) : (
                            <select
                              className="form-select form-select-sm"
                              value={report.status}
                              onChange={(e) => changeStatus(report._id, e.target.value)}
                              onFocus={() => setIsFocused(`table-select-${report._id}`)}
                              onBlur={() => setIsFocused("")}
                              style={{
                                borderRadius: "10px",
                                border: isFocused === `table-select-${report._id}` ? "1px solid #D6AF5C !important" : "1px solid #D6AF5C",
                                borderColor: "#D6AF5C",
                                outline: "none",
                                boxShadow: isFocused === `table-select-${report._id}` ? "0 0 0 0.25rem rgba(214, 175, 92, 0.4) !important" : "none",
                              }}
                            >
                              <option>Pending</option>
                              <option>Community Verified</option>
                              <option>School Verified</option>
                              <option>Investigating</option>
                              <option>Resolved</option>
                            </select>
                          )}
                        </td>
                        <td>
                          {report.incidentDate
                            ? new Date(report.incidentDate).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td>
                          <button
                            className="btn btn-sm me-2"
                            style={{
                              background: "#4E8F90",
                              color: "white",
                              borderRadius: "10px"
                            }}
                            onClick={() => {
                              if (selectedReport === report._id) {
                                setSelectedReport(null);
                              } else {
                                loadComments(report._id);
                              }
                            }}
                          >
                            {selectedReport === report._id ? "Hide Comments" : "Comments"}
                          </button>

                          {user?.role !== "Parent" && (
                            <button
                              className="btn btn-sm"
                              style={{
                                background: "#FEE2E2 !important",
                                backgroundColor: "#FEE2E2",
                                color: "#991B1B",
                                border: "1px solid #FCA5A5",
                                borderRadius: "8px",
                                padding: "4px 12px"
                              }}
                              onClick={() => removeReport(report._id)}
                            >
                              Delete
                            </button>
                          )}
                        </td>
                      </tr>

                      {/* Expandable Comments Row */}
                      {selectedReport === report._id && (
                        <tr>
                          <td colSpan="5">
                            <div
                              className="card p-3"
                              style={{
                                background: "#EFF6FF",
                                borderRadius: "15px"
                              }}
                            >
                              <h5>Comments</h5>
                              {comments.length === 0 ? (
                                <p>No comments yet.</p>
                              ) : (
                                comments.map((comment) => (
                                  <div
                                    key={comment._id}
                                    className="border rounded p-2 mb-2 bg-white"
                                  >
                                    <strong>
                                      {comment.user?.fullName || "User"}
                                    </strong>
                                    <br />
                                    {comment.comment}
                                    <br />
                                    <button
                                      className="btn btn-sm"
                                      style={{
                                        background: "#FEE2E2 !important",
                                        backgroundColor: "#FEE2E2",
                                        color: "#991B1B",
                                        border: "1px solid #FCA5A5",
                                        borderRadius: "8px",
                                        padding: "4px 12px"
                                      }}
                                      onClick={() => removeComment(comment._id)}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                ))
                              )}

                              <div className="mt-3">
                                <textarea
                                  className="form-control mb-2"
                                  placeholder="Write a comment..."
                                  value={commentText}
                                  onChange={(e) => setCommentText(e.target.value)}
                                  onFocus={() => setIsFocused(`comment-input-${report._id}`)}
                                  onBlur={() => setIsFocused("")}
                                  style={{
                                    borderRadius: "12px",
                                    border: isFocused === `comment-input-${report._id}` ? "1px solid #D6AF5C !important" : "1px solid #D6AF5C",
                                    borderColor: "#D6AF5C",
                                    outline: "none",
                                    boxShadow: isFocused === `comment-input-${report._id}` ? "0 0 0 0.25rem rgba(214, 175, 92, 0.4) !important" : "none",
                                  }}
                                />
                                <button
                                  className="btn"
                                  onClick={submitComment}
                                  style={{
                                    background: "#4E8F90",
                                    color: "white",
                                    borderRadius: "10px",
                                    padding: "6px 16px"
                                  }}
                                >
                                  Add Comment
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Report;