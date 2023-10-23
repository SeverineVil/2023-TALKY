import React, { useState, useContext } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function Login() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const authContext = useContext(AuthContext); // Utilisation du contexte

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await authContext.login(inputs); // Utilisation de la fonction du contexte
      navigate("/website", { replace: true });
    } catch (err) {
      console.error(err);
    }
  };
  // console.warn(inputs);

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Talky.</h1>
          <p>Bienvenue sur Talky ! ici on échange sur nos passions...</p>
          <span>Do you have an account ?</span>
          <Link to="/register">
            <button type="submit">Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <button type="submit" onClick={handleLogin}>
              Login
            </button>
          </form>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Login;
