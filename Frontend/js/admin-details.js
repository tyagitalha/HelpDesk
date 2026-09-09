document.addEventListener("DOMContentLoaded", () => {
    const ticketDetails = document.getElementById("ticketDetails")
    const statusText = document.getElementById("statusSelect")
    const priorityText = document.getElementById("prioritySelect")
    const assignedTo = document.getElementById("assignedTo")
    const updateBtn = document.getElementById("updateTicketBtn")

    const commentList = document.getElementById("commentsList")
    const commentForm = document.getElementById("commentForm")
    const commentInput = document.getElementById("commentInput")


    const params = new URLSearchParams(window.location.search)
    const ticketId = params.get("id")

    async function getOneTicket() {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/admins/oneTicket/${ticketId}`, {
                method: "GET",
                credentials: "include"
            })

            const data = await response.json()

            const tickets = data?.data?.Tickets[0]

            if (!response.ok) {
                console.error("one Ticket fetch fail", data.message);

            }

            renderTicket(tickets)

            await getAdmin()

            updateDetail(tickets)
            await getComment(tickets)

        } catch (error) {

        }
    }
    function renderTicket(tickets) {

        ticketDetails.innerHTML = `
        <div class="ticket-info">

            <div class="ticket-id">
                #${tickets._id}
            </div>

            <h2>${tickets.title}</h2>

            <p>${tickets.description}</p>

            <div class="ticket-meta">

                <span class="badge badge-category">
                    ${tickets.category}
                </span>

                <span class="badge badge-${tickets.priority}">
                    ${tickets.priority}
                </span>

                <span class="badge badge-${tickets.status}">
                    ${tickets.status}
                </span>

            </div>

        </div>
    `;
    }

    async function getAdmin() {
        try {
            const response = await fetch(
                "http://127.0.0.1:8000/api/v1/admins/allAdmin",
                {
                    method: "GET",
                    credentials: "include"
                }
            );

            const data = await response.json();

            const admins = data?.data?.Admin;

            if(!response.ok){
                console.error("All ticket fetch failed",data.message);
                
            }

            admins.forEach(admin => {
                const option = document.createElement("option")
                option.value = admin._id;
                option.textContent = admin.fullName
                assignedTo.appendChild(option)
            })

        } catch (error) {
            console.error("Get admin error:", error);
        }
    }


    function updateDetail(tickets) {
        statusText.value = tickets.status || ""
        priorityText.value = tickets.priority || ""
        assignedTo.value = tickets.assignTo || ""

    }

    updateBtn.addEventListener("click", async function () {
        const status = statusText.value
        const priority = priorityText.value
        const assignTo = assignedTo.value

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/admins/updateStatus/${ticketId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ status, priority, assignTo })
            })

            const data = await response.json()

            if (!response.ok) {
                console.error("Ticket Update unsuccessFull",data.message);
            }


        } catch (error) {
            console.error("ticket update failed:", error)
        }
    })


    async function getComment() {
        try {
            const response = await fetch(
                `http://127.0.0.1:8000/api/v1/comment/getAllComment/${ticketId}`,
                {
                    method: "GET",
                    credentials: "include"
                }
            );

            const data = await response.json()
      
            const comments = data?.data?.Comment
           
            if (!response.ok) {
                console.error(
                    "Get Comment Failed:",
                    data.message || "Unable to fetch comment"
                );

            }

            renderComments(comments)
        } catch (error) {
            console.error("get all comment error:", error)
        }
    }

    function renderComments(comments) {
        commentList.innerHTML = ""
        if (comments.length === 0) {

            commentList.innerHTML = `
            <p>No comments yet.</p>
        `;

            return;
        }

        comments.forEach(comment => {
            const commentBox = document.createElement("div")
            commentBox.classList.add("comment")

            commentBox.innerHTML = `
            <h4>${comment.author?.fullName}</h4>
            <p>${comment.message}</p>
            <small>${new Date(comment.createdAt).toLocaleString()}</small>
            <button type="button" class="delete-comment">Delete</button>
            `

            const deleteBtn = commentBox.querySelector(".delete-comment")

            deleteBtn.addEventListener("click", () => {
                deleteComment(comment._id)
            })

            commentList.appendChild(commentBox)
        })
    }


    async function deleteComment(commentId) {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/comment/deleteComment/${commentId}`, {
                method: "DELETE",
                credentials: "include"
            })
            if (!response.ok) {
                console.error(data.message);
                return;
            }
            const data = await response.json()

            await getComment()

        } catch (error) {
            console.error("Delete comment error:", error);
        }
    }

    commentForm.addEventListener("submit", async (e) => {
        e.preventDefault()

        const message = commentInput.value
        await createComment(message)
    })
    async function createComment(message) {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/comment/createComment/${ticketId}`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ message: message })
            })

            const data = await response.json()
            console.log("Create comment:", data);

            if (!response.ok) {
                console.error("Comment failed:", data.message);
                return;
            }

            commentInput.value = "";
            await getComment()
        } catch (error) {

        }
    }
    getOneTicket()

})