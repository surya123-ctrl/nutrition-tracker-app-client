import React from "react";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="not-found-container">
      <p>
        Oops! Page Not Found 🫠.
        <br />
        <Link to="/register" style={{ color: "red" }}>
          Register
        </Link>{" "}
        now to use app.
      </p>
    </div>
  );
};

export default NotFound;
