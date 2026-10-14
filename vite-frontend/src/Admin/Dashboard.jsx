import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";
import TicketCard from "../components/cards";

const Dashboard = () => {
  const navigator = useNavigate();

  const [username, setUsername] = useState("");
  const [allticket, setAllTicket] = useState("");
  const [allopen, setAllOpen] = useState("");
  const [allinProgress, setAllInProgress] = useState("");
  const [allResolved, setAllResolved] = useState("");
  const [allClosed, setAllClosed] = useState("");
  const [AllTotal, setAllTotal] = useState("");
 

  async function currentUser() {
    try {
      const response = await fetch(
        "https://helpdesk-3b70.onrender.com/api/v1/admins/current-user",
        {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("user not active", data);
        navigator("/login");
        return;
      }

      setUsername(data.data.fullName);
    } catch (error) {
      console.error("error auth", error);
      navigator("/login");
    }
  }

  async function accessAllTicket() {
    try {
      const response = await fetch(
        "https://helpdesk-3b70.onrender.com/api/v1/admins/allTicket",
        {
          method: "GET",
          credentials: "include",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("failed to fetch all ticket", data);
        return;
      }

      const ticket = data?.data?.Tickets;

      setAllTicket(ticket);
      setAllTotal(ticket.length);
      setAllOpen(ticket.filter((t) => t.status === "open").length);
      setAllClosed(ticket.filter((t) => t.status === "closed").length);
      setAllInProgress(ticket.filter((t) => t.status === "in-progress").length);
      setAllResolved(ticket.filter((t) => t.status === "resolved").length);

    } catch (error) {
      console.error("error",error);
      
    }
  }

  useEffect(() => {
    currentUser();
  }, []);

  useEffect(() => {
    accessAllTicket();
  }, []);

  return (
    <div>
      <NavBar 
      showLogout= {true}
      links={[{ name: "All Ticket", path: "/allTicket" }]} />
     

      <main className="admin-dashboard">
        <section className="admin-welcome">
          <div>
            <span className="admin-eyebrow">ADMIN PANEL</span>
            <h1>Welcome Admin, {username}</h1>
            <p>Monitor tickets and track your support team's progress.</p>
          </div>
        </section>

        <section className="admin-stats">
          <div className="admin-stat-card">
            <span className="admin-stat-label">Total Tickets</span>
            <h2>{AllTotal}</h2>
            <p>All support requests</p>
          </div>

          <div className="admin-stat-card admin-stat-open">
            <span className="admin-stat-label">Open</span>
            <h2>{allopen}</h2>
            <p>Awaiting action</p>
          </div>

          <div className="admin-stat-card admin-stat-progress">
            <span className="admin-stat-label">In Progress</span>
            <h2>{allinProgress}</h2>
            <p>Currently being handled</p>
          </div>

          <div className="admin-stat-card admin-stat-resolved">
            <span className="admin-stat-label">Resolved</span>
            <h2>{allResolved}</h2>
            <p>Successfully resolved</p>
          </div>

          <div className="admin-stat-card admin-stat-closed">
            <span className="admin-stat-label">Closed</span>
            <h2>{allClosed}</h2>
            <p>Closed requests</p>
          </div>
        </section>

        <section className="admin-ticket-section">
          <div className="admin-ticket-heading">
            <div>
              <h2>Support Tickets</h2>
              <p>Review and manage user requests.</p>
            </div>
            <span className="admin-ticket-count">
              {allticket.length} Tickets
            </span>
          </div>

          <div className="admin-ticket-list">
            {allticket.length === 0 ? (
              <p className="admin-no-tickets">No tickets found</p>
            ) : (
              allticket.map((ticket) => (
                <TicketCard
                  key={ticket._id}
                  ticket={ticket}
                  path="/adminticketdetail"
                />
              ))
            )}
          </div>
        </section>
      </main>
      
    </div>
  );
};

export default Dashboard;
