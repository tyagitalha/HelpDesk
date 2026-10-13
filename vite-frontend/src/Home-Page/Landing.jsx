import React from 'react'
import NavBar from '../components/NavBar';
import { Link } from 'react-router-dom';
import './Landing.css';
import Footer from '../components/Footer';

const Landing = () => {
    return (
        <div className="landing-page">
            <NavBar
                showLogout={false}
                links={[
                    { name: "Home", path: "/" },
                    { name: "Login", path: "/login" },
                    { name: "Register", path: "/register" }
                ]}
            />

            <main>
                <section className="landing-hero">
                    <div className="hero-content">
                        <span className="hero-tag">
                            SUPPORT MADE SIMPLE
                        </span>

                        <h1>
                            Welcome to <span>ResolveX</span>
                        </h1>

                        <p>
                            Get support and resolve your issues quickly.
                            Create tickets, track progress and stay updated
                            at every step.
                        </p>

                        <Link
                            to="/login"
                            className="btn btn-primary hero-button"
                        >
                            Create Ticket
                        </Link>
                    </div>

                    <div className="hero-image">
                        <img
                            src="/webposter.jpg"
                            alt="People collaborating to resolve issues"
                        />
                    </div>
                </section>

                <section className="project-work">
                    <div className="section-heading">
                        <span>THE PROCESS</span>
                        <h2>How It Works</h2>
                        <p>
                            Three simple steps to get your issue resolved.
                        </p>
                    </div>

                    <div className="work-grid">
                        <article className="work-card">
                            <span className="work-number">01</span>
                            <h3>Create Ticket</h3>
                            <p>
                                Tell us what went wrong and provide the
                                required details.
                            </p>
                        </article>

                        <article className="work-card">
                            <span className="work-number">02</span>
                            <h3>Track Your Ticket</h3>
                            <p>
                                Follow the status and keep up with
                                support updates.
                            </p>
                        </article>

                        <article className="work-card">
                            <span className="work-number">03</span>
                            <h3>Get Support & Resolve</h3>
                            <p>
                                Communicate with support and track your
                                issue until resolution.
                            </p>
                        </article>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Landing;
