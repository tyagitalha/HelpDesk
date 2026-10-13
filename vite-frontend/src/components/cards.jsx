import React from "react";

import { useNavigate } from "react-router-dom";
import "./TicketCard.css";

const TicketCard = ({ ticket, path }) => {
  const navigate = useNavigate();

  const statusClass = ticket.status
    ?.toLowerCase()
    .replace(/\s+/g, "-");

  const priorityClass = ticket.priority?.toLowerCase();

  return (
    <article className="ticket-card">
      <div className="ticket-card-header">
        <h3 className="ticket-title">{ticket.title}</h3>

        <span className={`ticket-status status-${statusClass}`}>
          {ticket.status}
        </span>
      </div>

      <p className="ticket-created-by">
        Created by: {ticket.createdBy?.fullName || "You"}
      </p>

      <p className="ticket-description">
        {ticket.description}
      </p>

      <div className="ticket-meta">
        <div className="ticket-meta-item">
          <span>Category</span>
          <strong>{ticket.category}</strong>
        </div>

        <div className="ticket-meta-item">
          <span>Priority</span>
          <strong className={`ticket-priority priority-${priorityClass}`}>
            {ticket.priority}
          </strong>
        </div>

        <div className="ticket-meta-item">
          <span>Assigned To</span>
          <strong>{ticket.assignTo?.fullName || "Not assigned"}</strong>
        </div>
      </div>

      <div className="ticket-card-footer">
        <button
          type="button"
          className="ticket-view-btn"
          onClick={() => navigate(`${path}/${ticket._id}`)}
        >
          View Ticket →
        </button>
      </div>
    </article>
  );
};

export default TicketCard;
