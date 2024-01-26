import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Navbar = () => {
  const loggedInDetails = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("nutrition-tracker-user");
    loggedInDetails.setIsLoggedIn(null);
    navigate("/login");
  };
  return (
    <div className="navbar-container">
      <Link to="/track">
        <button className="nav-items">Track</button>
      </Link>
      <Link to="/trackFoodByDate">
        <button className="nav-items">Track Food By Date</button>
      </Link>
      <Link to="/login">
        <button
          className="nav-items"
          onClick={handleLogout}
          style={{ backgroundColor: "red", color: "white" }}
        >
          Logout
        </button>
      </Link>
    </div>
  );
};

export default Navbar;
