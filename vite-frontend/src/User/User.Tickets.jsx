import React, { useEffect, useState } from 'react'
import TicketCard from '../components/cards'
import "./UserTicket.css"
import NavBar from '../components/NavBar'

const UserTickets = () => {

  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")
  const [priority, setPriority] = useState("")
  const [status, setStatus] = useState("")
  const [tickets, setTickets] = useState([])


  async function handleTicket(e) {
    e?.preventDefault()

    try {


      const params = new URLSearchParams()
      if (search.trim()) params.append("search", search.trim())
      if (category) params.append("category", category)
      if (priority) params.append("priority", priority)
      if (status) params.append("status", status.toLowerCase())


      const response = await fetch(`https://helpdesk-3b70.onrender.com/api/v1/ticket/getTicket?${params.toString()}`, {
        method: "GET",
        credentials: "include"
      })
      const data = await response.json()

      if (!response.ok) {
        console.error("failed All ticket fetch", data);
        return
      }

      const ticket = data?.data?.ticket

      setTickets(Array.isArray(ticket) ? ticket : [])

    } catch (error) {
      console.error("auth error", error);

    }
  }

  useEffect(() => {
    handleTicket()
  }, [])

  return (

    <div>
      <NavBar
        showLogout={true}
        links={[
          { name: "Home", path: "/userDashboard" },
          { name: "Create Ticket", path: "/createTicket" }
        ]} />

      <div>
        <main className='user-ticket'>
          <h2>Search Ticket</h2>
          <form onSubmit={handleTicket} >
            <label htmlFor="title">Title</label>
            <input type="text" name="title" value={search} id="title" placeholder='Enter Ticket Title' onChange={(e) => setSearch(e.target.value)} />

            <label htmlFor="category">Category</label>
            <select name="" id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Select Category</option>
              <option value="hardware">Hardware</option>
              <option value="software">Software</option>
              <option value="network">Network</option>
              <option value="account">Account</option>
              <option value="other">Other</option>
            </select>

            <label htmlFor="priority">Priority</label>
            <select name="" id="priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="">Select Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <label htmlFor="status" >Status</label>
            <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} >
              <option value="">Select Status</option>
              <option value="open">Open</option>
              <option value="in-progress">InProgress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>

            <button type="submit">Search Ticket</button>

          </form>
        </main>
        <section>
          {tickets.length === 0 ? (
            <p>No Ticket Found</p>
          ) : (
            tickets.map((ticket) => (
              <TicketCard
                key={ticket._id}
                ticket={ticket}
                path={"/userTicketDetail"}
              />
            ))
          )}
        </section>
      </div>
    </div>
  )
}

export default UserTickets
