document.addEventListener("DOMContentLoaded", async () => {
    const username = document.getElementById("username")
    const totalTicket = document.getElementById("totalTicket")
    const openTicket = document.getElementById("openTicket")
    const resolveTicket = document.getElementById("resolveTicket")
    const recentTicket = document.getElementById("recentTicket")

    if (!username) return


    let userData
    try {
        const response = await fetch("https://helpdesk-3b70.onrender.com/api/v1/users/current-user", {
            method: "GET",
            credentials: "include"
        })
        alert("current-user status: " + response.status);
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
        const ticketResponse = await fetch("https://helpdesk-3b70.onrender.com/api/v1/ticket/getAllTicket", {
            method: "GET",
            credentials: "include"
        })

        if (!ticketResponse.ok) {
            console.error("Failed to fetch tickets")
            return
        }

        const ticketData = await ticketResponse.json()

        const tickets = ticketData.data


        totalTicket.textContent = tickets.length
        openTicket.textContent = tickets.filter(t => t.status === "open").length
        resolveTicket.textContent = tickets.filter(t => t.status === "Resolved").length

        const recent = [...tickets]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 5)

        recentTicket.innerHTML = recent.map(ticket => `
            <div class="ticket-item">
                <p><strong>${ticket.title}</strong></p>
                <p>Name: ${ticket.createdBy?.fullName}</p>
                <p>Status: <span class="status-${ticket.status}">${ticket.status}</span></p>
                <p><span>${ticket.priority}</span></p>
            </div>
        `).join("")

    } catch (error) {
        console.error("Ticket fetch error:", error)
    }
})

document.addEventListener("DOMContentLoaded", () => {
    const logout = document.getElementById("logoutBtn")
    if (!logout) return

    logout.addEventListener("click", async () => {
        try {
            const response = await fetch("https://helpdesk-3b70.onrender.com/api/v1/users/logout", {
                method: "POST",
                credentials: "include"
            })

            if (!response.ok) {
                const data = await response.json()
                alert(data.message || "Logout failed")
                return
            }

            window.location.href = "../login.html"

        } catch (error) {
            console.error("Logout error:", error)
            alert("Server is not reachable. Please try again later.")
        }
    })
})