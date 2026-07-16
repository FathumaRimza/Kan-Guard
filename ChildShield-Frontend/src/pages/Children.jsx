import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import {
  getChildren,
  addChild,
  updateChild,
  deleteChild
} from "../services/childService";

function Children() {
  const emptyForm = {
    fullName: "",
    age: "",
    gender: "Male",
    dateOfBirth: "",
    school: "",
    grade: "",
    bloodGroup: "",
    allergies: "",
    emergencyContact: "",
    address: "",
    photo: ""
  };

  const [children, setChildren] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(""); // This tracks the active input's name

  useEffect(() => {
    loadChildren();
  }, []);

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
      [e.target.name]: e.target.value
    });
  };

  const submitChild = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateChild(editId, form);
        alert("Child updated");
      } else {
        await addChild(form);
        alert("Child added");
      }
      setForm(emptyForm);
      setEditId(null);
      loadChildren();
    } catch (error) {
      console.log(error);
      alert("Failed to save child");
    }
  };

  const editChild = (child) => {
    setForm({
      fullName: child.fullName,
      age: child.age,
      gender: child.gender,
      dateOfBirth: child.dateOfBirth?.substring(0, 10),
      school: child.school,
      grade: child.grade,
      bloodGroup: child.bloodGroup,
      allergies: child.allergies,
      emergencyContact: child.emergencyContact,
      address: child.address,
      photo: child.photo
    });
    setEditId(child._id);
  };

  const removeChild = async (id) => {
    if (window.confirm("Delete this child?")) {
      await deleteChild(id);
      loadChildren();
    }
  };

  const filteredChildren = children.filter((child) =>
    child.fullName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ background: "#F8FAF8", minHeight: "100vh" }}>
      <Navbar />

      <div className="row">
        <div className="col-md-3">
          <Sidebar />
        </div>

        <div className="col-md-9 p-4" style={{ background: "#F8FAFC", minHeight: "100vh" }}>
          <h2 className="fw-bold mb-4" style={{ color: "#4E8F90" }}>
            👧 Child Management
          </h2>

          <p style={{ color: "#6B7280" }}>
Manage and monitor registered children with care and confidence.          </p>

          <div className="card shadow border-0 p-4 mt-3" style={{ borderRadius: "20px" }}>
            <h4 className="fw-bold" style={{ color: "#4E8F90" }}>
              {editId ? "✏️ Update Child" : "➕ Add Child"}
            </h4>

            <form onSubmit={submitChild}>
              <input
                className="form-control mb-2"
                name="fullName"
                placeholder="Full Name"
                value={form.fullName}
                onChange={handleChange}
                onFocus={() => setIsFocused("fullName")}
                onBlur={() => setIsFocused("")}
                style={{
                  borderRadius: "12px",
                  padding: "10px",
                  border: "1px solid #D6AF5C",
                  boxShadow: isFocused === "fullName" ? "0 0 0 0.25rem rgba(214, 175, 92, 0.25)" : "none",
                  borderColor: "#D6AF5C"
                }}
              />

              <input
                className="form-control mb-2"
                name="age"
                type="number"
                placeholder="Age"
                value={form.age}
                onChange={handleChange}
                onFocus={() => setIsFocused("age")}
                onBlur={() => setIsFocused("")}
                style={{
                  borderRadius: "12px",
                  padding: "10px",
                  border: "1px solid #D6AF5C",
                  boxShadow: isFocused === "age" ? "0 0 0 0.25rem rgba(214, 175, 92, 0.25)" : "none",
                  borderColor: "#D6AF5C"
                }}
              />

              <select
                className="form-control mb-2"
                name="gender"
                value={form.gender}
                onChange={handleChange}
                onFocus={() => setIsFocused("gender")}
                onBlur={() => setIsFocused("")}
                style={{
                  borderRadius: "12px",
                  padding: "10px",
                  border: "1px solid #D6AF5C",
                  boxShadow: isFocused === "gender" ? "0 0 0 0.25rem rgba(214, 175, 92, 0.25)" : "none",
                  borderColor: "#D6AF5C"
                }}
              >
                <option>Female</option>
                <option>Male</option>
              </select>

              <input
                className="form-control mb-2"
                type="date"
                name="dateOfBirth"
                value={form.dateOfBirth}
                onChange={handleChange}
                onFocus={() => setIsFocused("date")}
                onBlur={() => setIsFocused("")}
                style={{
                  borderRadius: "12px",
                  padding: "10px",
                  border: "1px solid #D6AF5C",
                  boxShadow: isFocused === "date" ? "0 0 0 0.25rem rgba(214, 175, 92, 0.25)" : "none",
                  borderColor: "#D6AF5C"
                }}
              />

              <input
                className="form-control mb-2"
                name="school"
                placeholder="School"
                value={form.school}
                onChange={handleChange}
                onFocus={() => setIsFocused("school")}
                onBlur={() => setIsFocused("")}
                style={{
                  borderRadius: "12px",
                  padding: "10px",
                  border: "1px solid #D6AF5C",
                  boxShadow: isFocused === "school" ? "0 0 0 0.25rem rgba(214, 175, 92, 0.25)" : "none",
                  borderColor: "#D6AF5C"
                }}
              />

              <input
                className="form-control mb-2"
                name="grade"
                placeholder="Grade"
                value={form.grade}
                onChange={handleChange}
                onFocus={() => setIsFocused("grade")}
                onBlur={() => setIsFocused("")}
                style={{
                  borderRadius: "12px",
                  padding: "10px",
                  border: "1px solid #D6AF5C",
                  boxShadow: isFocused === "grade" ? "0 0 0 0.25rem rgba(214, 175, 92, 0.25)" : "none",
                  borderColor: "#D6AF5C"
                }}
              />

              <input
                className="form-control mb-2"
                name="bloodGroup"
                placeholder="Blood Group"
                value={form.bloodGroup}
                onChange={handleChange}
                onFocus={() => setIsFocused("bloodGroup")}
                onBlur={() => setIsFocused("")}
                style={{
                  borderRadius: "12px",
                  padding: "10px",
                  border: "1px solid #D6AF5C",
                  boxShadow: isFocused === "bloodGroup" ? "0 0 0 0.25rem rgba(214, 175, 92, 0.25)" : "none",
                  borderColor: "#D6AF5C"
                }}
              />

              <input
                className="form-control mb-2"
                name="allergies"
                placeholder="Allergies"
                value={form.allergies}
                onChange={handleChange}
                onFocus={() => setIsFocused("allergies")}
                onBlur={() => setIsFocused("")}
                style={{
                  borderRadius: "12px",
                  padding: "10px",
                  border: "1px solid #D6AF5C",
                  boxShadow: isFocused === "allergies" ? "0 0 0 0.25rem rgba(214, 175, 92, 0.25)" : "none",
                  borderColor: "#D6AF5C"
                }}
              />

              <input
                className="form-control mb-2"
                name="emergencyContact"
                placeholder="Emergency Contact"
                value={form.emergencyContact}
                onChange={handleChange}
                onFocus={() => setIsFocused("emergencyContact")}
                onBlur={() => setIsFocused("")}
                style={{
                  borderRadius: "12px",
                  padding: "10px",
                  border: "1px solid #D6AF5C",
                  boxShadow: isFocused === "emergencyContact" ? "0 0 0 0.25rem rgba(214, 175, 92, 0.25)" : "none",
                  borderColor: "#D6AF5C"
                }}
              />

              <textarea
                className="form-control mb-2"
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
                onFocus={() => setIsFocused("address")}
                onBlur={() => setIsFocused("")}
                style={{
                  borderRadius: "12px",
                  padding: "10px",
                  border: "1px solid #D6AF5C",
                  boxShadow: isFocused === "address" ? "0 0 0 0.25rem rgba(214, 175, 92, 0.25)" : "none",
                  borderColor: "#D6AF5C"
                }}
              />

              <input
                className="form-control mb-2"
                name="photo"
                placeholder="Photo URL"
                value={form.photo}
                onChange={handleChange}
                onFocus={() => setIsFocused("photo")}
                onBlur={() => setIsFocused("")}
                style={{
                  borderRadius: "12px",
                  padding: "10px",
                  border: "1px solid #D6AF5C",
                  boxShadow: isFocused === "photo" ? "0 0 0 0.25rem rgba(214, 175, 92, 0.25)" : "none",
                  borderColor: "#D6AF5C"
                }}
              />

              <button
                className="btn"
                style={{
                  background: "#4E8F90",
                  color: "white",
                  borderRadius: "12px",
                  padding: "8px 28px",
                  fontWeight: "600"
                }}
              >
                {editId ? "Update" : "Add"}
              </button>
            </form>
          </div>

          <div className="card shadow border-0 p-4 mt-4" style={{ color: "#4E8F90", fontWeight: "700" }}>
            <h4>Children List</h4>

            <input
              className="form-control mb-3"
              name="search"
              placeholder="Search child..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setIsFocused("search")}
              onBlur={() => setIsFocused("")}
              style={{
                borderRadius: "12px",
                padding: "10px",
                border: "1px solid #D6AF5C",
                boxShadow: isFocused === "search" ? "0 0 0 0.25rem rgba(214, 175, 92, 0.25)" : "none",
                borderColor: "#D6AF5C",
                transition: "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out"
              }}
            />

            <table className="table table-hover align-middle">
              <thead style={{ background: "#4E8F90", color: "white" ,
             fontWeight: "600",
    borderTopLeftRadius: "12px",
    borderTopRightRadius: "12px"   
              }}>
               <tr>
    <th style={{ padding: "12px" }}>Name</th>
    <th style={{ padding: "12px" }}>Age</th>
    <th style={{ padding: "12px" }}>School</th>
    <th style={{ padding: "12px" }}>Grade</th>
    <th style={{ padding: "12px" }}>Action</th>
  </tr>
              </thead>
              <tbody>
                {filteredChildren.map((child) => (
                  <tr key={child._id}>
                    <td style={{fontWeight:"400"}}>{child.fullName}</td>
                    <td style={{fontWeight:"400"}}>{child.age}</td>
                    <td style={{fontWeight:"400"}}>{child.school}</td>
                    <td style={{fontWeight:"400"}}>{child.grade}</td>
                    <td>
                      <button
                        className="btn btn-sm me-2"
                        style={{
                          background: "#FDF8EE",
                          color: "#D6AF5C",
                          borderRadius: "8px",
                          border: "1px solid #D6AF5C"
                        }}
                        onClick={() => editChild(child)}
                      >
                        Edit
                      </button>
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
                        onClick={() => removeChild(child._id)}
                      >
                        Delete
                      </button>
                    </td>
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

export default Children;