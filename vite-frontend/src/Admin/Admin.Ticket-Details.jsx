import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./AdminTicketDetails.css"
// import {NavBar} from 
import NavBar from "../components/NavBar";

const AdminTicketDetails = () => {
  const [ticketstatus, setTicketStatus] = useState("");
  const [ticketpriority, setTicketPriority] = useState("");
  const [alladmin, setAllAdmin] = useState([]);
  const [assigned, setAssigned] = useState("");
  const [getComment, setGetComment] = useState([]);
  const [newComment, setNewComment] = useState("");

  const [tickets, setTickets] = useState([]);

  const { ticketId } = useParams();

  async function oneticket() {
    try {
      const response = await fetch(
        `https://helpdesk-3b70.onrender.com/api/v1/admins/oneTicket/${ticketId}`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("failed to fetch one ticket", data);
      }

      const result = data?.data?.Tickets[0];

      setTickets(result);
      setTicketStatus(result.status || "");
      setTicketPriority(result.priority || "");

    } catch (error) {
      console.error("error", error);
    }
  }

  async function allAdmin() {
    try {
      const response = await fetch(
        "https://helpdesk-3b70.onrender.com/api/v1/admins/allAdmin",
        {
          method: "GET",
          credentials: "include",
        },
      );

      const data = await response.json();

      const admins = data?.data?.Admin;

      if (!response.ok) {
        console.error("All ticket fetch failed", data.message);
      }

      setAllAdmin(admins);
    } catch (error) {
      console.error("error", error);

    }
  }

  async function updateTicket(e) {
    e.preventDefault();

    const status = ticketstatus;
    const priority = ticketpriority;
    const assignTo = assigned;

    try {
      const response = await fetch(
        `https://helpdesk-3b70.onrender.com/api/v1/admins/updateStatus/${tickets._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ status, priority, assignTo }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("ticket update failed", data);
        return;
      }

      await oneticket();
    } catch (error) {

      console.error("error", error);

    }
  }

  async function allComment() {
    try {
      const response = await fetch(
        `https://helpdesk-3b70.onrender.com/api/v1/comment/getAllComment/${ticketId}`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      const data = await response.json();

      const comments = data?.data?.Comment ?? [];

      if (!response.ok) {
        console.error(
          "Get Comment Failed:",
          data.message || "Unable to fetch comment",
        );
      }
      setGetComment(comments);

    } catch (error) {
      console.error("get all comment error:", error);
    }
  }

  async function deleteComment(comment) {

    try {
      const response = await fetch(
        `https://helpdesk-3b70.onrender.com/api/v1/comment/deleteComment/${comment._id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (!response.ok) {
        console.error(data.message);
        return;
      }
      const data = await response.json();
      await allComment()
    } catch (error) {
      console.error("Delete comment error:", error);
    }
  }

  async function createnewComment(e) {
    e.preventDefault();

    const message = newComment.trim();
    try {
      const response = await fetch(
        `https://helpdesk-3b70.onrender.com/api/v1/comment/createComment/${ticketId}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: message }),
        },
      );

      const data = await response.json();

      setNewComment("");
      if (!response.ok) {
        console.error("Comment failed:", data.message);
        return;
      }
      await allComment()
    } catch (error) {
      console.error("error", error);

    }
  }

  useEffect(() => {
    oneticket();
  }, [ticketId]);

  useEffect(() => {
    allAdmin();
  }, []);

  useEffect(() => {
    allComment();
  }, []);


  return (

    <div>
      <NavBar
        showLogout={true}
        links={[
          { name: "All Ticket", path: "/allTicket" }
        ]} />
      <div className="admin-ticket-details-page">

        <div className="admin-ticket-details-container">
          <div className="admin-detail-card">
            <Link to="/adminDashboard" className="admin-back-link">
              ← Back to Dashboard
            </Link>

            <div className="admin-ticket-info">
              <h2 className="admin-detail-heading">Ticket Details</h2>

              <h2 className="admin-ticket-title">{tickets?.title}</h2>
              <p className="admin-ticket-author">
                Created by: {tickets?.createdBy?.fullName}
              </p>

              <div className="admin-ticket-badges">
                <span
                  className={`admin-ticket-priority priority-${tickets?.priority}`}
                >
                  {tickets?.priority}
                </span>

                <span className={`admin-ticket-status status-${tickets?.status}`}>
                  {tickets?.status}
                </span>
              </div>

              <p className="admin-ticket-description">{tickets?.description}</p>

              <p className="admin-assigned-info">
                Assign To:{" "}
                {alladmin.find(
                  (admin) =>
                    admin._id === (tickets?.assignTo?._id || tickets?.assignTo),
                )?.fullName || "Not assigned"}
              </p>
            </div>

            <form onSubmit={updateTicket} className="admin-update-form">
              <div className="admin-form-group">
                <label htmlFor="status">Status</label>
                <select
                  name="status"
                  id="status"
                  value={ticketstatus}
                  onChange={(e) => setTicketStatus(e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div className="admin-form-group">
                <label htmlFor="priority">Priority</label>
                <select
                  name="priority"
                  id="priority"
                  value={ticketpriority}
                  onChange={(e) => setTicketPriority(e.target.value)}
                >
                  <option value="">Select Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="admin-form-group">
                <label htmlFor="admin">Assign Admin</label>
                <select
                  name="admin"
                  id="admin"
                  value={assigned}
                  onChange={(e) => setAssigned(e.target.value)}
                >
                  <option value="">Select Admin</option>
                  {alladmin.map((admin) => (
                    <option key={admin._id} value={admin._id}>
                      {admin.fullName}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="admin-update-btn">
                Update Ticket
              </button>
            </form>
          </div>

          <div className="admin-comments-card">
            <h2 className="admin-detail-heading">Comments</h2>

            <section className="admin-comments-list">
              {getComment.length === 0 ? (
                <p className="admin-empty-comments">No comments yet.</p>
              ) : (
                getComment.map((comment) => (
                  <div className="admin-comment" key={comment._id}>
                    <div className="admin-comment-header">
                      <h3>{comment.author?.fullName}</h3>
                      <button
                        type="button"
                        className="admin-delete-comment"
                        onClick={() => deleteComment(comment)}
                      >
                        Delete
                      </button>
                    </div>

                    <p>{comment.message}</p>
                  </div>
                ))
              )}
            </section>

            <section className="admin-comment-form-section">
              <form onSubmit={createnewComment} className="admin-comment-form">
                <label htmlFor="message">Add a comment</label>
                <textarea
                  placeholder="Write your comment..."
                  name="comment"
                  id="message"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={3}
                  required
                />

                <button type="submit" className="admin-update-btn">
                  Send Comment
                </button>
              </form>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTicketDetails;
