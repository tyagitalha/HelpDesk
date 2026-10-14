import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">

                <div className="footer-main">
                    <div className="footer-brand-section">
                        <Link to="/" className="footer-brand">
                            Resolve<span>X</span>
                        </Link>

                        <p className="footer-description">
                            A simple and reliable way to manage support
                            tickets and resolve issues efficiently.
                        </p>
                    </div>

                    <div className="footer-links-section">
                        <h3>Quick Links</h3>

                        <Link to="/">Home</Link>
                        <Link to="/login">Create Ticket</Link>
                        <Link to="/login">My Tickets</Link>
                    </div>

                    <div className="footer-help-section">
                        <h3>Support</h3>
                        <p>Have an issue?</p>
                        <p>Create a ticket and let our support team help you.</p>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>
                        © {new Date().getFullYear()} ResolveX. All rights reserved.
                    </p>

                    <p>Built to make support simpler.</p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
