import React, { useEffect, useState } from "react";
import TicketCard from "../components/cards";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import "./AdminUserTickets.css";

const Tickets = () => {

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [searchticket, setSearchTicket] = useState([]);


  async function adminAllTicket(e) {
    e?.preventDefault();

    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (status) params.append("status", status);
    if (priority) params.append("priority", priority);
    if (category) params.append("category", category);

    try {
      const response = await fetch(
        `https://helpdesk-3b70.onrender.com/api/v1/admins/getTicket?${params.toString()}`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      const data = await response.json();
      console.log(data);


      const tickets = data?.data?.tickets
      console.log("ticktts", tickets);


      if (!response.ok) {
        console.error("Get Ticket Fetch failed");
      }


      setSearchTicket(Array.isArray(tickets) ? tickets : []);
    } catch (error) {
      console.error("failed to fetch all ticket", error);

    }
  }

  useEffect(() => {
    adminAllTicket()
  }, [])

  return (

    <div>
      <NavBar
        showLogout={true}
        links={[
          { name: "Home", path: "/adminDashboard" }
        ]}
      />

      <div className="admin-user-tickets-page">

        <main className="admin-user-tickets-main">
          <Link to="/adminDashboard" className="admin-user-tickets-back">
            ← Back to Dashboard
          </Link>

          <h2 className="admin-user-tickets-heading">User Tickets</h2>

          <form onSubmit={adminAllTicket} className="admin-user-tickets-form">
            <div className="admin-user-tickets-field">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Enter Ticket Title"
              />
            </div>

            <div className="admin-user-tickets-field">
              <label htmlFor="category">Category</label>
              <select
                name=""
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="hardware">Hardware</option>
                <option value="software">Software</option>
                <option value="network">Network</option>
                <option value="account">Account</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="admin-user-tickets-field">
              <label htmlFor="priority">Priority</label>
              <select
                name=""
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="">Select Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="admin-user-tickets-field">
              <label htmlFor="status">Description</label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="open">Open</option>
                <option value="in-progress">InProgress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <button type="submit" className="admin-user-tickets-search-btn">
              Search Ticket
            </button>
          </form>
        </main>

        <section className="admin-user-tickets-results">
          {searchticket.length === 0 ? (
            <p className="admin-user-tickets-empty">No Ticket Found</p>
          ) : (
            searchticket.map((ticket) => (
              <TicketCard
                key={ticket._id}
                ticket={ticket}
                path="/adminticketdetail"
              />
            ))
          )}
        </section>

        <section className="admin-user-tickets-extra"></section>
      </div>
    </div>
  );
};

export default Tickets;
