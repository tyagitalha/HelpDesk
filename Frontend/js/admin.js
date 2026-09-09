document.addEventListener("DOMContentLoaded", async () => {

    const total = document.getElementById("totalTickets")
    const open = document.getElementById("openTickets")
    const inProgress = document.getElementById("inProgressTickets")
    const resolve = document.getElementById("resolvedTickets")
    const showTicket = document.getElementById("recentTickets")
    const username = document.getElementById("username")


    let userData
    try {
        const response = await fetch("http://127.0.0.1:8000/api/v1/admins/current-user", {
            method: "GET",
            credentials: "include",
            cache: "no-store"
        })

        if (!response.ok) {
            window.location.href = "../login.html"
            return
        }
        userData = await response.json()

        username.textContent = userData.data.fullName

    } catch (error) {
        console.error("Auth error:", error)
        window.location.href = "../login.html"
        return
    }

    try {
        const response = await fetch("http://127.0.0.1:8000/api/v1/admins/allTicket", {
            method: "GET",
            credentials: "include"
        })

        const data = await response.json()

        if (!response.ok) {
            window.location.href = "../login.html"
            return
        }

        const tickets = data?.data?.Tickets

        open.textContent = tickets.filter(t => t.status === "open").length
        total.textContent = tickets.length
        resolve.textContent = tickets.filter(t => t.status === "resolved").length
        inProgress.textContent = tickets.filter(t => t.status === "in-progress").length

        const recent = [...tickets]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 5)


        showTicket.innerHTML = recent.map(ticket => `
            <div class="recent-ticket">
            <h3>${ticket.title}</h3>
            <h3>${ticket?.createdBy?.fullName}</h3>
            <h3>Assign :${ticket?.assignTo?.fullName}</h3>
            <p>${ticket.category}</p>
            <p>Status : ${ticket.status}</p>
            <p>Priority : ${ticket.priority}</p>
            </div>
            `).join("")

    } catch (error) {
        console.error("Ticket fetch error:", error)
    }
})