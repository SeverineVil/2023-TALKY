import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post(`${import.meta.env.VITE_API_URL}/user/register`, inputs, {
          withCredentials: true,
        })
        .then(() => {
          navigate("/website/profile", {
            replace: true,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (err) {
      console.error(err);
    }
  };

  console.warn(inputs); // TODO à retirer

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Talky.</h1>
          <p>Bienvenue sur Talky ! ici on échange sur nos passions...</p>
          <span>Do you have an account ?</span>
          <Link to="/login">
            <button type="submit">Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
            />
            <button type="submit" onClick={handleRegister}>
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
