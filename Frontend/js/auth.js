document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("registerForm")

    if (!form) return
    form.addEventListener("submit", async function (event) {
        event.preventDefault()

        const username = form.querySelector('[name="name"]').value
        const fullName = form.querySelector('[name="fullName"]').value
        const email = form.querySelector('[name="email"]').value
        const password = form.querySelector('[name="password"]').value
        const confirmpassword = form.querySelector('[name="confirmPassword"]').value

        if (password !== confirmpassword) {
            alert("Passwords do not match")
            return 
        }

        await registerUser(username, fullName, email, password)
    })

    async function registerUser(username, fullName, email, password) {
        try {
            const response = await fetch("https://helpdesk-3b70.onrender.com/api/v1/users/register", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, fullName, email, password })
            })

            const data = await response.json()

            if (!response.ok) {

                if (response.status === 400) {
                    console.log("400 BLOCK RUNNING");

                    alert("Username or email already exists");

                    window.location.replace("./login.html");

                    return;
                }

                alert(data.message || "Something went wrong");
                return;
            }
            else {
                window.location.href = "users/dashboard.html"
            }

        } catch (error) {
            console.error("Network error:", error)
        }
    }

})

document.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.getElementById("loginForm")

    if (!loginForm) return
    loginForm.addEventListener("submit", async function (e) {
        e.preventDefault()

        const email = loginForm.querySelector('[name="email"]').value
        const password = loginForm.querySelector('[name="password"]').value

        await loginUser(email, password)
    })

    async function loginUser(email, password) {
        try {
            const response = await fetch("https://helpdesk-3b70.onrender.com/api/v1/users/login", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            })

            const data = await response.json()


            if (!response.ok) {

                if(response.status === 404){
                    window.location.href = "register.html"
                }

            } else {
                
                console.log("Login successfully:", data)
                loginForm.reset()

                if (data.data.user.role === "Admin") {
                    window.location.href = "admin/dashboard.html";
                } else {
                    window.location.href = "users/dashboard.html";
                }
            }

        } catch (error) {
            console.error("Network error:", error)
            alert("Server is not reachable. Please try again later.")
        }
    }
})
