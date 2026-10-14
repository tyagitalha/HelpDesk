import React from 'react'
import { Link } from "react-router-dom";
import "./BackLink.css";

function BackLink({ path }) {
  return (
    <Link to={path} className="back-link">
      ← Back to Dashboard
    </Link>
  );
}

export default BackLink;