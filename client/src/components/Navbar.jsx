import React, { useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function Navbar() {
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const out = async () => {
    console.warn("Début du logout");
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/user/logout`, {
        withCredentials: true,
      });
      console.warn("Requête de déconnexion réussie");

      Cookies.remove("accessToken");
      console.warn("Cookie supprimé");

      // Supprimer la donnée currentUser du localStorage
      localStorage.removeItem("user");
      console.warn("Suppression de currentUser du localStorage");

      // Vérifier si currentUser a été supprimé du localStorage
      const isCurrentUserRemoved = !localStorage.getItem("user");
      console.warn("isCurrentUserRemoved:", isCurrentUserRemoved);

      console.warn("Redirection vers la page d'accueil");
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Erreur lors de la déconnexion :", err);
    }
  };

  return (
    <div className="navbar">
      <div className="left">
        <NavLink to="/website">
          <div className="logo">
            <h1>Talky.</h1>
          </div>
        </NavLink>
        <HomeOutlinedIcon />
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <NavLink to="/website/profile">
          <PersonOutlinedIcon />
        </NavLink>
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <div className="user">
          <img src={currentUser.profilePic} alt="me" />
          <span>{currentUser.username}</span>
        </div>

        <LogoutIcon
          className="logout"
          style={{ cursor: "pointer" }}
          onClick={out}
        />
      </div>
    </div>
  );
}

export default Navbar;
