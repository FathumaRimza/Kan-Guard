import { useEffect, useState } from "react";
import React from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import {
  getNotifications,
  deleteNotification,
  markRead
} from "../services/notificationService";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const data = await getNotifications();
      console.log("Notifications Array:", data.notifications);
      console.log("Count:", data.count);
      setNotifications(data.notifications || []);
    } catch (error) {
      console.log(error);
    }
  };

  const readNotification = async (id) => {
    await markRead(id);
    loadNotifications();
  };

  const removeNotification = async (id) => {
    await deleteNotification(id);
    loadNotifications();
  };

  return (
    <div>
      <Navbar />

      <div className="row g-0">
        <div className="col-md-3">
          <Sidebar />
        </div>

        <div
          className="col-md-9 p-4"
          style={{
            background: "#F8FAF8",
            minHeight: "100vh"
          }}
        >
          {/* Header Theme Banner */}
          <div
            className="card shadow border-0 mb-4"
            style={{
              borderRadius: "20px",
              background: "linear-gradient(135deg, #4E8F90, #3B6E6F)",
              color: "white"
            }}
          >
            <div className="card-body p-4">
              <h2 className="fw-bold m-0">🔔 Notifications</h2>
              <p className="mb-0 mt-1 opacity-90">
                Stay updated with alerts, reports and important system activities.
              </p>
            </div>
          </div>

          {/* Notification Counter Badge */}
          <div className="mb-4">
            <span
              className="badge rounded-pill"
              style={{
                background: "#F0F7F7",
                color: "#4E8F90",
                padding: "10px 18px",
                fontSize: "15px",
                border: "1px solid rgba(78, 143, 144, 0.2)"
              }}
            >
              Total Notifications : {notifications.length}
            </span>
          </div>

          {/* Main Feed Logic */}
          {notifications.length === 0 ? (
            <div
              className="card shadow border-0 p-5 text-center"
              style={{
                borderRadius: "20px"
              }}
            >
              <h1 style={{ fontSize: "3rem" }}>🔔</h1>
              <h4 className="fw-bold mt-2" style={{ color: "#4E8F90" }}>
                No Notifications
              </h4>
              <p className="text-muted mb-0">You're all caught up.</p>
            </div>
          ) : (
            notifications.map((item) => (
              <div
                key={item._id}
                className="card shadow border-0 p-4 mb-3"
                style={{
                  borderRadius: "20px",
                  borderLeft: item.isRead ? "6px solid #4E8F90" : "6px solid #D6AF5C"
                }}
              >
                <h5
                  className="fw-bold"
                  style={{
                    color: "#4E8F90"
                  }}
                >
                  {item.title}
                </h5>

                <p style={{ color: "#334155", fontSize: "15px" }}>{item.message}</p>

                <p className="text-muted mb-2" style={{ fontSize: "13px" }}>
                  🕒 {new Date(item.createdAt).toLocaleString()}
                </p>

                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mt-3">
                  <p className="mb-0 fw-semibold" style={{ color: "#475569" }}>
                    Status
                    <span
                      className="badge ms-2"
                      style={{
                        padding: "8px 14px",
                        borderRadius: "20px",
                        background: item.isRead ? "#4E8F90" : "#D6AF5C",
                        color: "white"
                      }}
                    >
                      {item.isRead ? "✓ Read" : "🔔 Unread"}
                    </span>
                  </p>

                  <div>
                    {!item.isRead && (
                      <button
                        className="btn btn-sm me-2"
                        style={{
                          background: "#4E8F90",
                          color: "white",
                          borderRadius: "10px",
                          padding: "6px 16px",
                          fontWeight: "600"
                        }}
                        onClick={() => readNotification(item._id)}
                      >
                        Mark Read
                      </button>
                    )}

                    <button
                      className="btn btn-sm"
                      style={{
                        backgroundColor: "#FEE2E2",
                        color: "#991B1B",
                        border: "1px solid #FCA5A5",
                        borderRadius: "8px",
                        padding: "6px 16px"
                      }}
                      onClick={() => removeNotification(item._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Notifications;