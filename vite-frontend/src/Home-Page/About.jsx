import React from "react";
import { Link } from "react-router-dom";
import "./About.css";
import BackLink from "../components/BackLink";

function About() {
    const features = [
        {
            icon: "🎫",
            title: "Ticket Management",
            description:
                "Create, view, update and manage support tickets from one place.",
        },
        {
            icon: "🔐",
            title: "Secure Authentication",
            description:
                "User registration, login and role-based access for users and admins.",
        },
        {
            icon: "⚙️",
            title: "Admin Dashboard",
            description:
                "Admins can manage tickets, update status and assign tickets to admins.",
        },
        {
            icon: "💬",
            title: "Comments & Updates",
            description:
                "Communicate through ticket comments and keep track of support progress.",
        },
        {
            icon: "🔎",
            title: "Search & Filters",
            description:
                "Find tickets using search and filters such as category, priority and status.",
        },
        {
            icon: "📱",
            title: "Responsive Interface",
            description:
                "Use the application on desktop, tablet and mobile screens.",
        },
    ];

    const technologies = [
        "React",
        "JavaScript",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Mongoose",
        "CSS",
        "REST API",
    ];

    return (
        <div className="about-page">
            <div className="about-container">
                <BackLink path="/" />

                <section className="about-hero">
                    <span className="about-label">ABOUT THE PROJECT</span>

                    <h1>
                        Meet <span>ResolveX</span>
                    </h1>

                    <p className="about-hero-description">
                        A simple and practical Helpdesk Ticket Management System
                        designed to make support requests easier to manage, track
                        and resolve.
                    </p>

                    <div className="about-hero-actions">
                        <Link to="/login" className="about-primary-btn">
                            Create a Ticket
                        </Link>

                        <Link to="/login" className="about-secondary-btn">
                            View My Tickets
                        </Link>
                    </div>
                </section>

                <section className="about-intro">
                    <div className="about-section-heading">
                        <span className="about-label">THE IDEA</span>
                        <h2>What is ResolveX?</h2>
                    </div>

                    <p>
                        ResolveX is a full-stack web application built to organize
                        support requests in one place. Users can create tickets,
                        track their status and communicate through comments, while
                        administrators can review, assign and manage those tickets.
                    </p>

                    <p>
                        The goal is to make support workflows more organized,
                        transparent and easier to follow.
                    </p>
                </section>

                <section className="about-features">
                    <div className="about-section-heading">
                        <span className="about-label">WHAT IT OFFERS</span>
                        <h2>Key Features</h2>
                        <p>
                            The core features that make ResolveX useful for support
                            management.
                        </p>
                    </div>

                    <div className="about-feature-grid">
                        {features.map((feature) => (
                            <article className="about-feature-card" key={feature.title}>
                                <div className="about-feature-icon">{feature.icon}</div>
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="about-tech">
                    <div className="about-section-heading">
                        <span className="about-label">BUILT WITH</span>
                        <h2>Technology Stack</h2>
                        <p>
                            Technologies used to build the frontend and backend.
                        </p>
                    </div>

                    <div className="about-tech-list">
                        {technologies.map((tech) => (
                            <span className="about-tech-badge" key={tech}>
                                {tech}
                            </span>
                        ))}
                    </div>
                </section>

                <section className="about-goal">
                    <span className="about-label">PROJECT GOAL</span>
                    <h2>Built to Learn. Designed to Solve.</h2>
                    <p>
                        ResolveX is a practical project focused on applying web
                        development concepts to a real-world problem, including
                        frontend development, API integration, authentication,
                        database operations and role-based workflows.
                    </p>
                </section>

                <footer className="about-footer">
                    <h3>ResolveX</h3>
                    <p>Support requests, organized.</p>
                </footer>
            </div>
        </div>
    );
}

export default About;