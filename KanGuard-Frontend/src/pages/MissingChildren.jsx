import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import {
  getMissingChildren,
  createMissingChild,
  updateMissingChild,
  deleteMissingChild
} from "../services/missingChildService";

function MissingChildren() {
  const emptyForm = {
    child: "",
    lastSeenLocation: "",
    lastSeenDate: "",
    clothes: "",
    description: ""
  };

  const [missing, setMissing] = useState([]);
  const [children, setChildren] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [isFocused, setIsFocused] = useState(""); // Added state hook to manage gold active outlines

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    loadMissing();
  }, []);

  const loadMissing = async () => {
    const data = await getMissingChildren();
    setMissing(data.missing || []);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const submitMissing = async (e) => {
    e.preventDefault();
    await createMissingChild(form);
    alert("Missing child reported");
    setForm(emptyForm);
    loadMissing();
  };

  const markFound = async (id) => {
    await updateMissingChild(id, { status: "Found" });
    loadMissing();
  };

  const removeMissing = async (id) => {
    if (window.confirm("Delete case?")) {
      await deleteMissingChild(id);
      loadMissing();
    }
  };

  const markAsFound = async (id) => {
    try {
      await updateMissingChild(id, { status: "Found" });
      alert("Child marked as Found.");
      loadMissing();
    } catch (error) {
      console.log(error);
      alert("Failed to update status.");
    }
  };

  return (
    <div style={{ background: "#F8FAF8", minHeight: "100vh" }}>
      <Navbar />

      <div className="row">
        <div className="col-md-3">
          <Sidebar />
        </div>

        <div className="col-md-9 p-4" style={{ background: "#F8FAFC", minHeight: "100vh" }}>
          <div>
            <div className="card-body p-4">
              <h2 className="fw-bold mb-2" style={{ color: "#4E8F90" }}>
                🚨 Missing Children
              </h2>
              <p style={{ color: "#6B7280" }}>
                Report, track and help reunite missing children with their families.
              </p>
            </div>
          </div>

          <div className="card shadow-lg border-0 p-4" style={{ borderRadius: "18px", transition: "0.3" }}>
            <h4 className="fw-bold mb-4" style={{ color: "#4E8F90", fontWeight: "700" }}>
              ➕ Report Missing Child
            </h4>

            <form onSubmit={submitMissing}>
              <input
                className="form-control mb-3"
                name="child"
                placeholder="Child ID"
                value={form.child}
                onChange={handleChange}
                onFocus={() => setIsFocused("child")}
                onBlur={() => setIsFocused("")}
                style={{
                  borderRadius: "12px",
                  border: "1px solid #D6AF5C",
                  padding: "10px",
                  boxShadow: isFocused === "child" ? "0 0 0 0.25rem rgba(214, 175, 92, 0.25)" : "none",
                  borderColor: "#D6AF5C"
                }}
              />

              <input
                className="form-control mb-3"
                name="lastSeenLocation"
                placeholder="Last Seen Location"
                value={form.lastSeenLocation}
                onChange={handleChange}
                onFocus={() => setIsFocused("lastSeenLocation")}
                onBlur={() => setIsFocused("")}
                style={{
                  borderRadius: "12px",
                  border: "1px solid #D6AF5C",
                  padding: "10px",
                  boxShadow: isFocused === "lastSeenLocation" ? "0 0 0 0.25rem rgba(214, 175, 92, 0.25)" : "none",
                  borderColor: "#D6AF5C"
                }}
              />

              <input
                type="date"
                className="form-control mb-3"
                name="lastSeenDate"
                value={form.lastSeenDate}
                onChange={handleChange}
                onFocus={() => setIsFocused("lastSeenDate")}
                onBlur={() => setIsFocused("")}
                style={{
                  borderRadius: "12px",
                  border: "1px solid #D6AF5C",
                  padding: "10px",
                  boxShadow: isFocused === "lastSeenDate" ? "0 0 0 0.25rem rgba(214, 175, 92, 0.25)" : "none",
                  borderColor: "#D6AF5C"
                }}
              />

              <input
                className="form-control mb-3"
                name="clothes"
                placeholder="Clothes description"
                value={form.clothes}
                onChange={handleChange}
                onFocus={() => setIsFocused("clothes")}
                onBlur={() => setIsFocused("")}
                style={{
                  borderRadius: "12px",
                  border: "1px solid #D6AF5C",
                  padding: "10px",
                  boxShadow: isFocused === "clothes" ? "0 0 0 0.25rem rgba(214, 175, 92, 0.25)" : "none",
                  borderColor: "#D6AF5C"
                }}
              />

              <textarea
                className="form-control mb-3"
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                onFocus={() => setIsFocused("description")}
                onBlur={() => setIsFocused("")}
                style={{
                  borderRadius: "12px",
                  border: "1px solid #D6AF5C",
                  padding: "10px",
                  boxShadow: isFocused === "description" ? "0 0 0 0.25rem rgba(214, 175, 92, 0.25)" : "none",
                  borderColor: "#D6AF5C"
                }}
              />

              <button
                className="btn"
                style={{
                  background: "#4E8F90",
                  color: "white",
                  padding: "10px 28px",
                  borderRadius: "12px",
                  fontWeight: "600"
                }}
              >
                Submit Report
              </button>
            </form>
          </div>

          <div className="card shadow-lg border-0 p-4 mt-4" style={{ borderRadius: "20px" }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="fw-bold" style={{ color: "#4E8F90" }}>
                📋 Missing Cases
              </h4>
              <span
                className="badge rounded-pill"
                style={{
                  background: "#D6AF5C",
                  color: "white",
                  fontSize: "15px",
                  padding: "10px 15px"
                }}
              >
                Total : {missing.length}
              </span>
            </div>

            <table className="table table-hover align-middle mt-3">
              <thead style={{ background: "#4E8F90", color: "white" }}>
                <tr>
                  <th>Child</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {missing.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-5">
                      <h1>🔍</h1>
                      <h5>No Missing Cases</h5>
                      <p className="text-muted">All children are currently safe.</p>
                    </td>
                  </tr>
                ) : (
                  missing.map((item) => (
                    <tr key={item._id}>
                      <td>{item.child?.fullName || "Unknown"}</td>
                      <td>{item.lastSeenLocation}</td>
                      <td>{new Date(item.lastSeenDate).toLocaleDateString()}</td>
                      <td>
                        <span
                          className={item.status === "Missing" ? "badge bg-danger" : "badge bg-success"}
                          style={{
                            padding: "10px 15px",
                            fontSize: "13px",
                            borderRadius: "10px"
                          }}
                        >
                          {item.status === "Missing" ? "🚨 Missing" : "✅ Found"}
                        </span>
                      </td>
                      <td>
                        {user?.role !== "Parent" && item.status === "Missing" && (
                          <button
                            className="btn btn-sm me-2"
                            style={{
                              background: "#4E8F90",
                              color: "white",
                              borderRadius: "10px"
                            }}
                            onClick={() => markAsFound(item._id)}
                          >
                            Mark as Found
                          </button>
                        )}
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
                          onClick={() => removeMissing(item._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MissingChildren;