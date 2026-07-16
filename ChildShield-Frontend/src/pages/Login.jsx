import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../services/authService";
import logo from "../assets/logo.jpeg";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(""); // Track focused element IDs

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser({
        email,
        password
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login successful");
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#4E8F90,#2F6F73)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "25px"
      }}
    >
      <div
        className="card shadow-lg border-0"
        style={{
          width: "500px",
          borderRadius: "20px",
          overflow: "hidden"
        }}
      >
        <div
          className="text-center py-2"
          style={{
            background: "#F8FAF8",
            borderBottom: "9px solid #D6AF5C"
          }}
        >
          <img
            src={logo}
            alt="Kan-Guard"
            style={{
              width: "110px",
              height: "100px",
              borderRadius: "10px",
              marginBottom: "12px"
            }}
          />

          <h2
            className="fw-bold mb-0"
            style={{
              color: "#4E8F90"
            }}
          >
            Kan-Guard
          </h2>

          <p
            className="mb-0"
            style={{
              color: "#6B7280",
              fontSize: "15px"
            }}
          >
            Safe Childhood • Stronger Tomorrow
          </p>
        </div>

        <div className="p-4">
          <h4
            className="text-center fw-bold mb-4"
            style={{
              color: "#4E8F90"
            }}
          >
            Welcome
          </h4>

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label
                className="form-label fw-semibold"
                style={{
                  color: "#4E8F90"
                }}
              >
                Email Address
              </label>

              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsFocused("email")}
                onBlur={() => setIsFocused("")}
                required
                style={{
                  borderRadius: "12px",
                  padding: "10px",
                  border: isFocused === "email" ? "1px solid #D6AF5C !important" : "1px solid #D6AF5C",
                  borderColor: "#D6AF5C",
                  outline: "none",
                  boxShadow: isFocused === "email" ? "0 0 0 0.25rem rgba(214, 175, 92, 0.4) !important" : "none"
                }}
              />
            </div>

            <div className="mb-4">
              <label
                className="form-label fw-semibold"
                style={{
                  color: "#4E8F90"
                }}
              >
                Password
              </label>

              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsFocused("password")}
                  onBlur={() => setIsFocused("")}
                  required
                  style={{
                    borderRadius: "12px 0 0 12px",
                    padding: "10px",
                    border: isFocused === "password" ? "1px solid #D6AF5C !important" : "1px solid #D6AF5C",
                    borderColor: "#D6AF5C",
                    borderRight: "none",
                    outline: "none",
                    boxShadow: isFocused === "password" ? "0 0 0 0.25rem rgba(214, 175, 92, 0.4) !important" : "none"
                  }}
                />

                <button
                  type="button"
                  className="btn"
                  style={{
                    background: "#D6AF5C",
                    color: "white",
                    borderRadius: "0 12px 12px 0",
                    border: isFocused === "password" ? "1px solid #D6AF5C !important" : "1px solid #D6AF5C",
                    borderColor: "#D6AF5C",
                    borderLeft: "none",
                    boxShadow: isFocused === "password" ? "0 0 0 0.25rem rgba(214, 175, 92, 0.4) !important" : "none"
                  }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn w-100"
              style={{
                background: "#4E8F90",
                color: "white",
                padding: "10px",
                borderRadius: "12px",
                fontWeight: "600",
                fontSize: "16px"
              }}
            >
              Login
            </button>
          </form>

          <hr
            style={{
              margin: "25px 0",
              borderColor: "#D6AF5C"
            }}
          />

          <p
            className="text-center mb-0"
            style={{
              color: "#6B7280"
            }}
          >
            Don't have an account?
            <span
              style={{
                cursor: "pointer",
                color: "#4E8F90",
                fontWeight: "700",
                marginLeft: "4px"
              }}
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;