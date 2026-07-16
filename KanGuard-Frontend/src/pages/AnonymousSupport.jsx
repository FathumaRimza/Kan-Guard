import { useEffect, useState } from "react";
import React from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import timeAgo from "../utils/timeAlgo";

import {
  createAnonymousPost,
  getAnonymousPosts,
  addAnonymousReply,
  likeReply
} from "../services/anonymousService";

function AnonymousSupport() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [posts, setPosts] = useState([]);
  const [problem, setProblem] = useState("");
  const [reply, setReply] = useState({});
  const [isFocused, setIsFocused] = useState(""); // Track focused element IDs

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const data = await getAnonymousPosts();
      setPosts(data.posts || []);
    } catch (error) {
      console.log(error);
    }
  };

  const submitProblem = async () => {
    if (problem === "") return;
    await createAnonymousPost({
      problem
    });
    setProblem("");
    loadPosts();
  };

  const sendReply = async (id) => {
    if (!reply[id]) return;
    await addAnonymousReply(id, {
      message: reply[id]
    });
    setReply({
      ...reply,
      [id]: ""
    });
    loadPosts();
  };

  const helpfulReply = async (postId, replyId) => {
    try {
      await likeReply(postId, replyId);
      loadPosts();
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    }
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
          <h2
            className="fw-bold mb-4"
            style={{
              color: "#4E8F90"
            }}
          >
            💬 Anonymous Support Community
          </h2>

          {/* Create Post Card */}
          <div
            className="card shadow border-0 p-4 mb-4"
            style={{
              borderRadius: "20px"
            }}
          >
            <h5 className="fw-bold mb-3" style={{ color: "#4E8F90" }}>
              Share your problem anonymously
            </h5>

            <textarea
              className="form-control"
              rows="3"
              placeholder="Write your problem..."
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              onFocus={() => setIsFocused("main-problem")}
              onBlur={() => setIsFocused("")}
              style={{
                borderRadius: "12px",
                padding: "10px",
                border: isFocused === "main-problem" ? "1px solid #D6AF5C !important" : "1px solid #D6AF5C",
                borderColor: "#D6AF5C",
                outline: "none",
                boxShadow: isFocused === "main-problem" ? "0 0 0 0.25rem rgba(214, 175, 92, 0.4) !important" : "none",
              }}
            />

            <div>
              <button
                className="btn mt-3"
                style={{
                  background: "#4E8F90",
                  color: "white",
                  borderRadius: "12px",
                  padding: "10px 25px",
                  fontWeight: "600"
                }}
                onClick={submitProblem}
              >
                Post Anonymously
              </button>
            </div>
          </div>

          {/* Posts Feed */}
          {posts.map((post) => (
            <div
              className="card shadow border-0 p-4 mb-4"
              key={post._id}
              style={{
                borderRadius: "20px"
              }}
            >
              <h5
                className="fw-bold"
                style={{
                  color: "#D6AF5C"
                }}
              >
                🕵️ Anonymous User
              </h5>

              <p
                style={{
                  fontSize: "16px",
                  color: "#334155"
                }}
              >
                {post.problem}
              </p>

              <small className="text-muted">
                🕒 {timeAgo(post.createdAt)}
              </small>

              <hr style={{ borderTop: "1px solid #E5E7EB" }} />

              <h6
                className="fw-bold mb-3"
                style={{
                  color: "#4E8F90"
                }}
              >
                💡 Community Suggestions
              </h6>

              {/* Replies Mapping */}
              {post.replies.map((r, index) => (
                <div
                  key={index}
                  className="p-3 mb-3"
                  style={{
                    background: "#F0F7F7",
                    borderRadius: "12px",
                    borderLeft: "4px solid #4E8F90"
                  }}
                >
                  <p className="mb-1">
                    <span
                      style={{
                        color: "#334155",
                        fontSize: "15px"
                      }}
                    >
                      🗨️ {r.message}
                    </span>
                  </p>

                  <div className="d-flex align-items-center mt-2">
                    <small className="text-muted me-3">
                      🕒 {timeAgo(r.createdAt)}
                    </small>

                    <button
                      onClick={() => helpfulReply(post._id, r._id)}
                      style={{
                        border: "none",
                        background: "transparent",
                        fontSize: "13px",
                        cursor: "pointer",
                        color: r.likedBy?.some((id) => id._id === user?.id) ? "#DC2626" : "#6B7280"
                      }}
                    >
                      {r.likedBy?.some((id) => id._id === user?.id) ? "❤️" : "♡"}{" "}
                      <span className="text-muted">{r.helpful || 0}</span>
                    </button>
                  </div>
                </div>
              ))}

              {/* Reply Box Section */}
              <textarea
                className="form-control mt-3"
                placeholder="Give your idea..."
                value={reply[post._id] || ""}
                onChange={(e) =>
                  setReply({
                    ...reply,
                    [post._id]: e.target.value
                  })
                }
                onFocus={() => setIsFocused(`reply-${post._id}`)}
                onBlur={() => setIsFocused("")}
                style={{
                  borderRadius: "12px",
                  padding: "10px",
                  border: isFocused === `reply-${post._id}` ? "1px solid #D6AF5C !important" : "1px solid #D6AF5C",
                  borderColor: "#D6AF5C",
                  outline: "none",
                  boxShadow: isFocused === `reply-${post._id}` ? "0 0 0 0.25rem rgba(214, 175, 92, 0.4) !important" : "none",
                }}
              />

              <div>
                <button
                  className="btn mt-2"
                  style={{
                    background: "#4E8F90",
                    color: "white",
                    borderRadius: "12px",
                    padding: "6px 20px",
                    fontWeight: "600"
                  }}
                  onClick={() => sendReply(post._id)}
                >
                  Send Advice
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AnonymousSupport;