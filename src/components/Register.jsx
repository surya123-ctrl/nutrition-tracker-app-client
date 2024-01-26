import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Register = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
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
    console.log(userDetails);
    try {
      await axios
        // .post("http://localhost:8000/register", userDetails)
        .post("https://nutricalc-m5s7.onrender.com/register", userDetails)
        .then((data) => {
          console.log(data.data);
          setMessage({
            type: "success",
            text: data.data.message,
          });
          setUserDetails({
            name: "",
            email: "",
            password: "",
            age: "",
          });
          setTimeout(() => {
            toast.success(data.data.message);
            // window.location.href = "/login";
          }, 2500);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong!");
      setMessage({
        type: "error",
        text: "Something went wrong!",
      });
      console.log("Error in registering the user", error);
    }
  };
  return (
    <section className="container">
      <form action="" className="form" onSubmit={handleSubmit}>
        <h1>Register</h1>
        <input
          type="text"
          placeholder="Enter you Name"
          name="name"
          value={userDetails.name}
          required
          onChange={handleInput}
        />
        <input
          type="email"
          placeholder="Enter you Email"
          name="email"
          value={userDetails.email}
          required
          onChange={handleInput}
        />
        <input
          type="password"
          placeholder="Enter you Password"
          name="password"
          value={userDetails.password}
          required
          minLength={8}
          onChange={handleInput}
        />
        <input
          type="number"
          placeholder="Enter you Age"
          name="age"
          value={userDetails.age}
          required
          min={12}
          max={100}
          onChange={handleInput}
        />
        <button>Submit</button>
        <p>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "red" }}>
            Click here
          </Link>{" "}
          to Login
        </p>
        <p className={message.type}>{message.text}</p>
      </form>
    </section>
  );
};

export default Register;
