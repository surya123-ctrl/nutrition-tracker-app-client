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
        <button>Track</button>
      </Link>
      <Link to="/trackFoodByDate">
        <button>Track Food By Date</button>
      </Link>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Navbar;
