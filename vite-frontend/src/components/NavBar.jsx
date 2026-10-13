import React from 'react'
import { Link } from 'react-router-dom';
import Logout from './Logout';
import "./NavBar.css";

const NavBar = ({ links =[] , showLogout = false  }) => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="" className="navbar-brand">
                    Resolve<span>X</span>
                </Link>

                <ul className="navbar-links">
                    {links.map((link) => (
                        <li key={link.path}>
                            <Link
                                to={link.path}
                                className="navbar-link"
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}

                    {showLogout && (
                        <li>
                            <Logout />
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;