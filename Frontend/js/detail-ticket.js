document.addEventListener("DOMContentLoaded", async () => {

    const ticketDetails = document.getElementById("ticketDetails");

    const titleInput = document.getElementById("title");
    const descriptionInput = document.getElementById("description");
    const priorityInput = document.getElementById("priority");
    const categoryInput = document.getElementById("category");

    const updateBtn = document.getElementById("updateBtn");
    const deletebtn = document.getElementById("deleteBtn")

    const commentForm = document.getElementById("commentForm");
    const commentInput = document.getElementById("commentInput");
    const commentsList = document.getElementById("commentsList");

    const params = new URLSearchParams(window.location.search);

    const ticketId = params.get("id");

    if (!ticketId) {
        ticketDetails.innerHTML = "<p>Ticket ID not found</p>";
        return;
    }

    // GET ONE TICKET

    async function getOneTicket() {

        try {

            const response = await fetch(
                `http://127.0.0.1:8000/api/v1/ticket/getOneTicket/${ticketId}`,
                {
                    method: "GET",
                    credentials: "include"
                }
            );


            if (!response.ok) {
                throw new Error("Failed to fetch ticket");
            }


            const result = await response.json();

            const ticket = result?.data?.tickets;


            if (!ticket) {
                ticketDetails.innerHTML = "<p>Ticket not found</p>";
                return;
            }


            renderTicket(ticket);


            fillUpdateForm(ticket);


            getComments(ticket);


        } catch (error) {

            console.error("Get ticket error:", error);

            ticketDetails.innerHTML =
                "<p>Something went wrong while loading ticket.</p>";
        }
    }


    // RENDER TICKET DETAILS

    function renderTicket(ticket) {

        ticketDetails.innerHTML = `
            <div class="ticket-detail-card">
                <div class="ticket-header">
                    <div>
                        <p>
                            Ticket ID: #${ticket._id}
                        </p>
                        <h1>
                            ${ticket.title}
                        </h1>
                    </div>

                    <div class="ticket-badges">
                        <span>
                            ${ticket.category}
                        </span>
                        <span>
                            ${ticket.priority}
                        </span>
                        <span>
                            ${ticket.status}
                        </span>
                    </div>
                </div>

                <div class="ticket-info">
                    <p>
                        <strong>Created:</strong>
                        ${ticket.createdAt
                ? new Date(ticket.createdAt).toLocaleString()
                : "N/A"
            }
                    </p>
                </div>


                <div class="ticket-description">

                    <h3>Description</h3>

                    <p>
                        ${ticket.description}
                    </p>

                </div>

            </div>
        `;
    }



    //delete ticket

    deletebtn.addEventListener("click", async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `http://127.0.0.1:8000/api/v1/ticket/delete/${ticketId}`,
                {
                    method: "DELETE",
                    credentials: "include"
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Ticket delete failed");
                return;
            }

            window.location.href = "tickets.html";

        } catch (error) {
            console.error("Delete ticket error:", error);
        }
    });


    // FORM MEIN TICKET DATA

    function fillUpdateForm(ticket) {

        titleInput.value = ticket.title || "";

        descriptionInput.value = ticket.description || "";

        priorityInput.value = ticket.priority || "";

        categoryInput.value = ticket.category || "";
    }


    // UPDATE TICKET

    updateBtn.addEventListener("click", async function () {

        // e.defaultPrevented()

        const title = titleInput.value.trim();

        const description = descriptionInput.value.trim();

        const priority = priorityInput.value;

        const category = categoryInput.value;


        if (!title || !description) {

            alert("Title and description are required");

            return;
        }


        const updatedData = {

            title,
            description,
            priority,
            category

        };


        try {

            const response = await fetch(
                `http://127.0.0.1:8000/api/v1/ticket/update/${ticketId}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify(updatedData)
                }
            );


            if (!response.ok) {
                const errorData = await response.json();

                throw new Error(
                    errorData?.message || "Failed to update ticket"
                );
            }


            const result = await response.json();

            alert("Ticket updated successfully");

            await getOneTicket();

        } catch (error) {
            console.error("Update ticket error:", error);

            alert(error.message);
        }

    });

    async function getComments() {

        try {

            const response = await fetch(
                `http://127.0.0.1:8000/api/v1/comment/getAllComment/${ticketId}`,
                {
                    method: "GET",
                    credentials: "include"
                }
            );

            const data = await response.json();
            if (!response.ok) {
                console.error(
                    "Get comments failed:",
                    data.message || "Unable to fetch comments"
                );
                return;
            }

            const comments = data?.data?.Comment || [];

            renderComments(comments);

        } catch (error) {

            console.error("Get comments error:", error);
        }
    }


    //  RENDER COMMENTS

    function renderComments(comments) {

        commentsList.innerHTML = "";

        if (comments.length === 0) {

            commentsList.innerHTML = `
            <p>No comments yet.</p>
        `;

            return;
        }

        comments.forEach(comment => {

            const commentBox = document.createElement("div");

            commentBox.classList.add("comment");

            commentBox.innerHTML = `
            <h4>
                ${comment.author?.fullName || "Unknown User"}
            </h4>

            <p>
                ${comment.message}
            </p>

            <small>
                ${new Date(comment.createdAt).toLocaleString()}
            </small>
            <button type="button" class="delete-comment">Delete</button>
        `;

            const deleteBtn = commentBox.querySelector(".delete-comment")

            deleteBtn.addEventListener("click", () => {
                deleteComment(comment._id)
            })

            commentsList.appendChild(commentBox);
        });
    }

    async function deleteComment(commentId) {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/comment/deleteComment/${commentId}`, {
                method: "DELETE",
                credentials: "include"
            })

            const data = await response.json()

            if (!response.ok) {
                console.error(data.message);
                return;
            }


            await getComments()

        } catch (error) {
            console.error("Delete comment error:", error);
        }
    }




    //   CREATE COMMENT

    commentForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const message = commentInput.value.trim();

        if (!message) {
            return;
        }

        await createComment(message);
    });


    async function createComment(message) {

        try {

            const response = await fetch(
                `http://127.0.0.1:8000/api/v1/comment/createComment/${ticketId}`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    credentials: "include",

                    body: JSON.stringify({
                        message
                    })
                }
            );

            const data = await response.json();


            if (!response.ok) {

                console.error(
                    "Create comment failed:",
                    data.message || "Unable to create comment"
                );

                return;
            }


            commentInput.value = "";

            await getComments();

        } catch (error) {

            console.error("Create comment error:", error);
        }
    };

    getOneTicket();

});