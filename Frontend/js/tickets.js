document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("ticketForm")
    const ticketTitle = document.getElementById("title")
    const ticketCategory = document.getElementById("category")
    const ticketPriority = document.getElementById("priority")
    const ticketDescription = document.getElementById("description")

    if (!form) return

    form.addEventListener("submit", async function (event) {

        event.preventDefault()

        const title = ticketTitle.value
        const category = ticketCategory.value
        const priority = ticketPriority.value
        const description = ticketDescription.value

        await createTicket(title, category, priority, description)
    })

    async function createTicket(title, category, priority, description) {

        try {
            const response = await fetch("http://127.0.0.1:8000/api/v1/ticket/createTicket", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title, category, priority, description })
            })

            const data = await response.json()            

            if (!response.ok) {
                console.error("Login failed:", data.message);
                alert(data.message || "Something went wrong")
            } else {
                window.location.href = "tickets.html"
                form.reset()
            }

        } catch (error) {
            console.error("Network error :", error);
            alert("Server is not reachable. Please try again later.")
        }
    }

})
