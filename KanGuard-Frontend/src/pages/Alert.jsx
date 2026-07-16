import { useEffect, useState } from "react";
import React from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import {
  getAlerts,
  createAlert,
  updateAlert,
  deleteAlert,
} from "../services/alertService";

function Alert() {
  const emptyForm = {
    title: "",
    message: "",
    location: "",
    level: "Low",
  };
  const user = JSON.parse(localStorage.getItem("user"));
  const [alerts, setAlerts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [isFocused, setIsFocused] = useState(""); 

  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = async () => {
    try {
      const data = await getAlerts();
      setAlerts(data.alerts || []);
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

  const submitAlert = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await updateAlert(editId, form);
        alert("Alert updated successfully");
      } else {
        await createAlert(form);
        alert("Alert created successfully");
      }

      setForm(emptyForm);
      setEditId(null);

      loadAlerts();
    } catch (error) {
      console.log(error);
      alert("Failed");
    }
  };

  const editAlert = (alertItem) => {
    setEditId(alertItem._id);

    setForm({
      title: alertItem.title,
      message: alertItem.message,
      location: alertItem.location,
      level: alertItem.level,
    });
  };

  const removeAlert = async (id) => {
    if (window.confirm("Delete alert?")) {
      await deleteAlert(id);
      loadAlerts();
    }
  };

  return (
    <div
      style={{
        background: "#F8FAF8",
        minHeight: "100vh"
      }}
    >
      <Navbar />

      <div className="row g-0">
        <div className="col-md-3">
          <Sidebar />
        </div>

        <div className="col-md-9 p-4">
          <h2
            className="fw-bold"
            style={{
              color: "#4E8F90"
            }}
          >
            🚨 Community Alerts
          </h2>


<p
style={{
color:"#6B7280"
}}
>
Stay informed with important safety alerts issued by authorities.
</p>
          {user?.role !== "Parent" && (
            <div
              className="card shadow border-0 p-4 mt-3"
              style={{
                borderRadius: "20px"
              }}
            >
              <h4 className="fw-bold" style={{ color: "#4E8F90", fontWeight: "700" }}>
                {editId ? "Update Alert" : "Create Alert"}
              </h4>

              <form onSubmit={submitAlert}>
                <input
                  className="form-control mb-2"
                  name="title"
                  placeholder="Alert Title"
                  value={form.title}
                  onChange={handleChange}
                  onFocus={() => setIsFocused("title")}
                  onBlur={() => setIsFocused("")}
                  style={{
                    borderRadius: "12px",
                    padding: "10px",
                    border: isFocused === "title" ? "1px solid #D6AF5C !important" : "1px solid #D6AF5C",
                    borderColor: "#D6AF5C",
                    outline: "none",
                    boxShadow: isFocused === "title" ? "0 0 0 0.25rem rgba(214, 175, 92, 0.4) !important" : "none",
                  }}
                />

                <textarea
                  className="form-control mb-2"
                  name="message"
                  placeholder="Alert Message"
                  value={form.message}
                  onChange={handleChange}
                  onFocus={() => setIsFocused("message")}
                  onBlur={() => setIsFocused("")}
                  style={{
                    borderRadius: "12px",
                    padding: "10px",
                    border: isFocused === "message" ? "1px solid #D6AF5C !important" : "1px solid #D6AF5C",
                    borderColor: "#D6AF5C",
                    outline: "none",
                    boxShadow: isFocused === "message" ? "0 0 0 0.25rem rgba(214, 175, 92, 0.4) !important" : "none",
                  }}
                />

                <input
                  className="form-control mb-2"
                  name="location"
                  placeholder="Location"
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

                <select
                  className="form-control mb-3"
                  name="level"
                  value={form.level}
                  onChange={handleChange}
                  onFocus={() => setIsFocused("level")}
                  onBlur={() => setIsFocused("")}
                  style={{
                    borderRadius: "12px",
                    padding: "10px",
                    border: isFocused === "level" ? "1px solid #D6AF5C !important" : "1px solid #D6AF5C",
                    borderColor: "#D6AF5C",
                    outline: "none",
                    boxShadow: isFocused === "level" ? "0 0 0 0.25rem rgba(214, 175, 92, 0.4) !important" : "none",
                  }}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>

                <button
                  type="submit"
                  className="btn"
                  style={{
                    background: "#4E8F90",
                    color: "white",
                    borderRadius: "12px",
                    padding: "10px 25px",
                    fontWeight: "600"
                  }}
                >
                  {editId ? "Update Alert" : "Create Alert"}
                </button>
              </form>
            </div>
          )}

          {user?.role === "Parent" && (
            <div
              className="card shadow-sm border-0 mb-4 mt-3"
              style={{
                background: "#EFF6FF",
                borderRadius: "20px"
              }}
            >
              <div className="card-body p-4">
                <h4
                  style={{
                    color: "#4E8F90",
                    fontWeight: "700"
                  }}
                >
                  📢 Safety Alerts
                </h4>
                <p
                  className="mb-0"
                  style={{
                    color: "#6B7280"
                  }}
                >
                  Alerts issued by Police and School Administration.
                </p>
              </div>
            </div>
          )}

          <div
            className="card shadow border-0 p-4 mt-4"
            style={{
              borderRadius: "20px"
}}
          >
            <h4
              style={{
                color: "#4E8F90",
                fontWeight: "700"
              }}
            >
              📢 All Alerts
            </h4>

            <table className="table table-hover align-middle mt-3">
              <thead style={{ background: "#4E8F90", color: "white" }}>
                <tr>
                  <th>Title</th>
                  <th>Location</th>
                  <th>Level</th>
                  <th>Created By</th>
                  {user?.role !== "Parent" && <th>Action</th>}
                </tr>
              </thead>

              <tbody>
                {alerts.map((alert) => (
                  <tr key={alert._id}>
                    <td>{alert.title}</td>
                    <td>{alert.location}</td>
                    <td>
                      <span
                        className="badge"
                        style={{
                          background:
                            alert.level === "High"
                              ? "#DC2626"
                              : alert.level === "Medium"
                              ? "#D6AF5C"
                              : "#4E8F90",
                          color: "white",
                          padding: "8px 14px",
                          borderRadius: "10px"
                        }}
                      >
                        {alert.level}
                      </span>
                    </td>
                    <td>{alert.createdBy?.fullName || "System Admin"}</td>

                    {user?.role !== "Parent" && (
                      <td>
                        <button
                          className="btn btn-sm me-2"
                        style={{
                          background: "#FDF8EE",
                          color: "#D6AF5C",
                          borderRadius: "8px",
                          border: "1px solid #D6AF5C"
                        }}
                          onClick={() => editAlert(alert)}
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-sm"
                          style={{
                            backgroundColor: "#FEE2E2",
                            color: "#991B1B",
                            border: "1px solid #FCA5A5",
                            borderRadius: "8px",
                            padding: "4px 12px"
                          }}
                          onClick={() => removeAlert(alert._id)}
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Alert;