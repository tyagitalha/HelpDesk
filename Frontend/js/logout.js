document.addEventListener("DOMContentLoaded", () => {

    const logout = document.getElementById("logoutBtn");

    if (!logout) return;

    logout.addEventListener("click", async () => {

        logout.disabled = true;
        logout.textContent = "Logging out...";

        try {

            const response = await fetch(
                "http://127.0.0.1:8000/api/v1/users/logout",
                {
                    method: "POST",
                    credentials: "include"
                }
            );

            const data = await response.json();

            if (!response.ok) {
                logout.disabled = false;
                logout.textContent = "Logout";
                alert(data.message || "Logout failed");
                return;
            }

            window.location.href = "../login.html";

        } catch (error) {

            console.error("Logout error:", error);

            logout.disabled = false;
            logout.textContent = "Logout";
        }
    });
});