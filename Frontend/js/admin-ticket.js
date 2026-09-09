document.addEventListener("DOMContentLoaded", () => {
    const searchText = document.getElementById("searchInput")
    const statusText = document.getElementById("statusFilter")
    const priorityText = document.getElementById("priorityFilter")
    const categoryText = document.getElementById("categoryFilter")
    const applyBtn = document.getElementById("applybtn")
    const List = document.getElementById("ticketsList")

    getTicket("", "", "", "")

    if (!List) return

    applyBtn.addEventListener("click", async function (e) {

        let search = searchText.value.trim()
        let status = statusText.value
        let priority = priorityText.value
        let category = categoryText.value

        await getTicket(search, status, priority, category)
    })

    async function getTicket(search, status, priority, category) {
        const params = new URLSearchParams()
        if (search) params.append("search", search)
        if (status) params.append("status", status)
        if (priority) params.append("priority", priority)
        if (category) params.append("category", category)

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/admins/getTicket?${params.toString()}`, {
                method: "GET",
                credentials: "include"
            })

            const data = await response.json()

            const tickets = data?.data?.tickets ?? []

            if(!response.ok){
                console.error("Get Ticket Fetch failed");         
            }

            renderTicket(tickets)


        } catch (error) {

        }
    }

    function renderTicket(tickets) {
        List.innerHTML = ""

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
        }
        )
    }
})