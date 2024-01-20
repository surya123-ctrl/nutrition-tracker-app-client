import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
const Login = () => {
  const navigate = useNavigate();

  const loggedInDetails = useContext(AuthContext);

  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const handleInput = (event) => {
    setUserDetails((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios
        .post("http://localhost:8000/login", userDetails)
        .then((data) => {
          console.log(data.data);
          console.log(data.status);
          setTimeout(() => {
            toast.success(`Welcome ${data.data.name}!`);
          }, 2500);
          setMessage({
            type: "success",
            text: `Welcome ${data.data.name}!`,
          });
          setUserDetails({
            email: "",
            password: "",
          });
          localStorage.setItem("nutrition-tracker-user", JSON.stringify(data));
          loggedInDetails.setIsLoggedIn({
            isLoggedIn: data.data,
            // details: data.data,
          });
          navigate("/track");
        })
        .catch((error) => {
          console.log(error.response.data.message);
          setMessage({
            type: "error",
            text: `${error.response.data.message}!`,
          });
          setTimeout(() => {
            toast.error(`${error.response.data.message}!`);
            // window.location.href = "/login";
          }, 2500);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          type="email"
          placeholder="Enter you Email"
          name="email"
          value={userDetails.email}
          onChange={handleInput}
        />
        <input
          type="password"
          placeholder="Enter you Password"
          name="password"
          value={userDetails.password}
          onChange={handleInput}
        />
        <button>Login</button>
        <p>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "red" }}>
            Click here
          </Link>{" "}
          to Register
        </p>
        <p className={message.type}>{message.text}</p>
      </form>
    </section>
  );
};

export default Login;
