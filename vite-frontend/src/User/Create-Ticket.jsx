import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./CreateTicket.css";
import NavBar from '../components/NavBar';
import BackLink from '../components/BackLink';

const CreateTicket = () => {

    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [priority, setPriority] = useState("")
    const [description, setDescription] = useState("")

    const navigator = useNavigate()

    async function createTicket(e) {
        e.preventDefault()

        try {
            const response = await fetch("https://helpdesk-3b70.onrender.com/api/v1/ticket/createTicket", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title, category, priority, description })
            })

            const data = await response.json()


            if (!response.ok) {
                console.error("Login Failed" || data.message);

            } else {
                setTitle("");
                setCategory("");
                setPriority("");
                setDescription("");
            }

            navigator("/UserDashboard")
        } catch (error) {
            console.error("Network Error", error);

        }
    }



    return (

        <div>
            <NavBar
                showLogout={true}
                links={[
                    { name: "Home", path: "/userDashboard" },
                    { name: "All Ticket", path: "/userTicket" }
                ]} />

            <BackLink path={"/userDashboard"} />

            <div className="create-ticket-page">

                <main className="create-ticket-box">

                    <div className="create-ticket-header">
                        <span className="create-ticket-badge">RESOLVEX SUPPORT</span>
                        <h2>Create a Ticket</h2>
                        <p>Describe your issue and our team will help you resolve it.</p>
                    </div>

                    <form
                        onSubmit={createTicket}
                        className="create-ticket-form"
                    >
                        <div className="create-ticket-field">
                            <label htmlFor="title">Ticket Title</label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                placeholder="e.g. Laptop not connecting to Wi-Fi"
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div className="create-ticket-row">
                            <div className="create-ticket-field">
                                <label htmlFor="category">Category</label>
                                <select
                                    name="category"
                                    id="category"
                                    defaultValue=""
                                    onChange={(e) => setCategory(e.target.value)}
                                    required
                                >
                                    <option value="" disabled>Select category</option>
                                    <option value="hardware">Hardware</option>
                                    <option value="software">Software</option>
                                    <option value="network">Network</option>
                                    <option value="account">Account</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div className="create-ticket-field">
                                <label htmlFor="priority">Priority</label>
                                <select
                                    name="priority"
                                    id="priority"
                                    defaultValue="medium"
                                    onChange={(e) => setPriority(e.target.value)}
                                >
                                    <option value="">Select Status</option>
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>
                        </div>

                        <div className="create-ticket-field">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                rows="6"
                                placeholder="Explain the issue, what happened, and any steps you have already tried..."
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                            <span className="create-ticket-hint">
                                Include details that can help the support team understand the problem.
                            </span>
                        </div>

                        <button type="submit" className="create-ticket-submit">
                            Create Ticket <span aria-hidden="true">→</span>
                        </button>

                        <p className="create-ticket-footer">
                            Please provide accurate details so your issue can be resolved faster.
                        </p>
                    </form>
                </main>
            </div>
        </div>
    )
}

export default CreateTicket
