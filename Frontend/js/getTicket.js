document.addEventListener("DOMContentLoaded", () => {

    const searchTicket = document.getElementById("search")
    const categoryTicket = document.getElementById("category")
    const priorityTicket = document.getElementById("priority")
    const statusTicket = document.getElementById("status")
    const apply = document.getElementById("applyFilters")
    const List = document.getElementById("ticketList")

    fetchTicket("", "", "", "")

    if (!List) return
    apply.addEventListener("click", async function (e) {
        e.preventDefault()
        let search = searchTicket.value
        let category = categoryTicket.value
        let priority = priorityTicket.value
        let status = statusTicket.value

        await fetchTicket(search, category, priority, status)
    })

    async function fetchTicket(search, category, priority, status) {
        const params = new URLSearchParams()
        if (search) params.append("search", search)
        if (category) params.append("category", category)
        if (priority) params.append("priority", priority)
        if (status) params.append("status", status)


        try {

            const response = await fetch(`https://helpdesk-3b70.onrender.com/api/v1/ticket/getTicket?${params.toString()}`, {
                method: "GET",
                credentials: "include"
            })

            if (!response.ok) {
                console.error("Error fetching ticket", response.status)
                List.innerHTML = "<p>Something went wrong. Please try again.</p>"
                return
            }

            const result = await response.json()

            const tickets = result?.data?.ticket

            renderTicket(tickets)

        } catch (error) {
            console.log("Fetch fail", error);
            List.innerHTML = "<p>Something went wrong</p>"

        }
    }

    function renderTicket(tickets) {
        List.innerHTML = ""

        if (tickets.length === 0) {
            List.innerHTML = "<p>No tickets found</p>"
            return
        }

        tickets.forEach(ticket => {
            const card = document.createElement("div")
            card.classList.add("ticket-card")

            card.innerHTML = `
            <div class="ticket-info">
            <div class="ticket-id">#${ticket._id}</div>
            <div class="ticket-title">${ticket.title}</div>
            <div class="ticket-description">${ticket.description}</div>
            </div>
            <div class="ticket-meta">
            <span class="ticket-badge badge-category">${ticket.category}</span>
            <span class="ticket-badge badge-${ticket.priority}">${ticket.priority}</span>
            <span class="ticket-badge badge-${ticket.status}">${ticket.status}</span>
            <button type="button" class="ticket-view">View</button>
            </div>
            `

            const viewButton = card.querySelector(".ticket-view")
            viewButton.addEventListener("click", () => {
                window.location.href = `ticket-details.html?id=${ticket._id}`
            })

            List.appendChild(card)

        });
    }

})