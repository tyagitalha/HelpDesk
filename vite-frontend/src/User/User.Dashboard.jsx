import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import { Link, useNavigate } from 'react-router-dom'
import TicketCard from '../components/cards'
import "./UserDashboard.css";
import "../index.css"

const UserDashboard = () => {

  const navigate = useNavigate()

  const [fullName, setFullName] = useState("")
  const [totalTicket, setTotalTicket] = useState("")
  const [open, setOpen] = useState("")
  const [closed, setClosed] = useState("")
  const [title, setTitle] = useState("")
  const [tickets, setTickets] = useState([])
  const [] = useState("")
  const [] = useState("")

  async function handleCurrentUser(e) {

    try {

      const response = await fetch("https://helpdesk-3b70.onrender.com/api/v1/users/current-user", {
        method: "GET",
        credentials: "include"
      })

      const data = await response.json()

      if (!response.ok) {
        navigate("/login")
        return
      }

      setFullName(data.data.fullName)
    } catch (error) {

      console.error("error auth", error);
      navigate("/login")

    }
  }



  async function handleAllTicket() {

    try {

      const response = await fetch("https://helpdesk-3b70.onrender.com/api/v1/ticket/getAllTicket", {
        method: "GET",
        credentials: "include",

      })

      const data = await response.json()

      if (!response.ok) {
        console.error("failed to fetch all ticket");
        return

      }

      setTotalTicket(data.data.length)
      setOpen(data.data.filter(tickets => tickets.status === "open").length)
      setClosed(data.data.filter(tickets => tickets.status === "closed").length)
      setTickets(data.data)

    } catch (error) {
      console.error("error", error);

    }
  }
  useEffect(() => {
    handleCurrentUser()
  }, [])
  useEffect(() => {
    handleAllTicket()
  }, [])

  return (


    <div className="user-dashboard">
      <NavBar
        showLogout={true}
        links={[
          { name: "Create Ticket", path: "/createTicket" },
          { name: "All Tickets", path: "/userTicket" },

        ]}
      />

      <div className="dashboard-container">
        <section className="dashboard-welcome">
          <div>
            <p className="dashboard-eyebrow">USER DASHBOARD</p>
            <h1>
              Welcome, <span>{fullName}</span>
            </h1>
            <p className="dashboard-subtitle">
              Manage and track your support tickets.
            </p>
          </div>

          <Link to="/createTicket" className="btn btn-primary">
            + Create Ticket
          </Link>
        </section>

        <section className="dashboard-stats">
          <div className="stat-card">
            <p className="stat-label">Total Tickets</p>
            <h2>{totalTicket}</h2>
            <span className="stat-indicator">All your tickets</span>
          </div>

          <div className="stat-card">
            <p className="stat-label">Open Tickets</p>
            <h2>{open}</h2>
            <span className="stat-indicator">Awaiting resolution</span>
          </div>

          <div className="stat-card">
            <p className="stat-label">Closed Tickets</p>
            <h2>{closed}</h2>
            <span className="stat-indicator">Resolved tickets</span>
          </div>
        </section>

        <section className="dashboard-tickets">
          <div className="tickets-section-header">
            <div>
              <h2>Recent Tickets</h2>
              <p>Check the latest updates on your tickets.</p>
            </div>

            <Link to="/userTicket" className="view-all-link">
              View All
            </Link>
          </div>

          <div className="dashboard-ticket-list">
            {tickets.length === 0 ? (
              <div className="dashboard-empty">
                <h3>No tickets yet</h3>
                <p>Create a ticket to get support.</p>
                <Link to="/createTicket" className="btn btn-primary">
                  Create Your First Ticket
                </Link>
              </div>
            ) : (
              tickets.map((ticket) => (
                <div className="dashboard-ticket-item" key={ticket._id}>
                  <TicketCard
                    key={ticket._id}
                    ticket={ticket}
                    path="/userTicketDetail"
                  />
                </div>
              ))
            )}
          </div>
        </section>
      </div>


    </div>

  )
}

export default UserDashboard
