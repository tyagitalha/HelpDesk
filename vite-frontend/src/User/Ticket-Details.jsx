import React, { useEffect, useState } from "react";
import TicketCard from "../components/cards";
import { useNavigate } from "react-router-dom";
import "./TicketDetails.css";
import BackLink from "../components/BackLink";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";

const TicketDetails = () => {
  const navigator = useNavigate();

  const [tickets, setTickets] = useState([]);
  const [comments, setComments] = useState([]);
  const [titleInput, setTitleInput] = useState("");
  const [priorityInput, setPriorityInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [createcomment, setCreateComment] = useState("");

  const { ticketId } = useParams();

  async function accessTicket(e) {
    try {
      const response = await fetch(
        `https://helpdesk-3b70.onrender.com/api/v1/ticket/getOneTicket/${ticketId}`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("failed to fetch ticket");
        return;
      }

      const ticket = data?.data?.tickets;

      setTickets(ticket);

      setTitleInput(tickets.title || "");
      setPriorityInput(tickets.priority || "");
      setCategoryInput(tickets.category || "");
      setDescriptionInput(tickets.description || "");

    } catch (error) {
      console.error("Get ticket error", error);
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();

    let title = titleInput.trim();
    let category = categoryInput.trim();
    let description = descriptionInput.trim();
    let priority = priorityInput.trim();


    try {
      const response = await fetch(
        `https://helpdesk-3b70.onrender.com/api/v1/ticket/update/${tickets._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ title, category, description, priority }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("update ticket failed", data);
        return;
      }

      await accessTicket();
    } catch (error) {
      console.error("update failed", error);
    }
  }

  async function deleteTicket() {
    try {
      const response = await fetch(
        `https://helpdesk-3b70.onrender.com/api/v1/ticket/delete/${tickets._id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("not delete ticket", data);
      }

      navigator("/userDashboard");
    } catch (error) {
      console.error("not delete ticket", error);
    }
  }

  async function getAllComment() {

    console.log("id", tickets._id);


    try {
      const response = await fetch(
        `https://helpdesk-3b70.onrender.com/api/v1/comment/getAllComment/${tickets._id}`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("failed of fetch comment", data);
      }
      const comment = data?.data?.Comment;

      setComments(comment);

    } catch (error) {
      console.error("failed fetch all comment", error);
    }
  }

  async function createComment(e) {
    e.preventDefault();

    const message = createcomment.trim();
    if (!message) return;

    try {
      const response = await fetch(
        `https://helpdesk-3b70.onrender.com/api/v1/comment/createComment/${tickets._id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Comment creation failed:", data);
        return;
      }

      setCreateComment("");
      await getAllComment();
    } catch (error) {
      console.error("Comment creation error:", error);
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

      const data = await response.json();

      if (!response.ok) {
        console.error("Delete failed:", data);
        return;
      }

      setComments((previousComments) =>
        previousComments.filter((item) => item._id !== comment._id),
      );
    } catch (error) {
      console.error("Delete comment error:", error);
    }
  }

  useEffect(() => {
    if (tickets?._id) {
      getAllComment();
    }
  }, [tickets?._id]);

  useEffect(() => {
    accessTicket();
  }, []);


  return (
    <div>
      <NavBar
        showLogout={true}
        links={[
          { name: "Home", path: "/userDashboard" },
          { name: "All Ticket", path: "/userTicket" },
        ]}
      />
      <main className="ticket-details-page">
        <div className="ticket-details-container">
          <section className="ticket-info-card">
             <BackLink path={"/userDashboard"} />
            <div className="details-page-header">
              <div>
                <p className="details-eyebrow">SUPPORT TICKET</p>
                <h1>Ticket Details</h1>
              </div>

              <span
                className={`ticket-status status-${tickets.status?.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {tickets.status}
              </span>
            </div>

            <h2 className="details-ticket-title">{tickets.title}</h2>

            <div className="details-meta">
              <div>
                <span>Priority</span>
                <strong
                  className={`ticket-priority priority-${tickets.priority?.toLowerCase()}`}
                >
                  {tickets.priority}
                </strong>
              </div>

              <div>
                <span>Category</span>
                <strong>{tickets.category}</strong>
              </div>

              <div>
                <span>Assigned To</span>
                <strong>{tickets.assignTo?.fullName || "Not assigned"}</strong>
              </div>
            </div>

            <div className="details-description">
              <h3>Description</h3>
              <p>{tickets.description}</p>
            </div>
          </section>

          <section className="ticket-edit-card">
            <h2>Update Ticket</h2>
            <p className="details-subtitle">
              Edit the details of your support ticket.
            </p>

            <form onSubmit={handleUpdate} className="ticket-edit-form">
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  value={titleInput}
                  name="title"
                  id="title"
                  placeholder="Update title"
                  onChange={(e) => setTitleInput(e.target.value)}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="priority">Priority</label>
                  <select
                    name="priority"
                    id="priority"
                    value={priorityInput}
                    onChange={(e) => setPriorityInput(e.target.value)}
                  >
                    <option value="">Select Priority</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <select
                    name="category"
                    id="category"
                    value={categoryInput}
                    onChange={(e) => setCategoryInput(e.target.value)}
                  >
                    <option value="">Select Category</option>
                    <option value="hardware">Hardware</option>
                    <option value="software">Software</option>
                    <option value="network">Network</option>
                    <option value="account">Account</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  id="description"
                  rows={5}
                  value={descriptionInput}
                  onChange={(e) => setDescriptionInput(e.target.value)}
                />
              </div>

              <div className="ticket-form-actions">
                <button type="submit" className="details-primary-btn">
                  Update Ticket
                </button>

                <button
                  type="button"
                  className="details-delete-btn"
                  onClick={deleteTicket}
                >
                  Delete Ticket
                </button>
              </div>
            </form>
          </section>

          <section className="ticket-comments-card">
            <h2>Comments</h2>
            <p className="details-subtitle">
              Follow the conversation about this ticket.
            </p>

            <div className="comments-list">
              {comments.length === 0 ? (
                <p className="comments-empty">No comments yet.</p>
              ) : (
                comments.map((comment) => (
                  <article className="comment-item" key={comment._id}>
                    <h3>{comment.author?.fullName || "User"}</h3>
                    <p>{comment.message}</p>
                    <button
                      type="button"
                      className="comment-delete-btn"
                      onClick={() => deleteComment(comment)}
                    >
                      Delete
                    </button>
                  </article>
                ))
              )}
            </div>

            <form onSubmit={createComment} className="comment-form">
              <label htmlFor="message">Add a comment</label>
              <textarea
                id="message"
                value={createcomment}
                onChange={(e) => setCreateComment(e.target.value)}
                placeholder="Write your comment..."
                rows={3}
                required
              />

              <button type="submit" className="details-primary-btn">
                Send Comment
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default TicketDetails;
