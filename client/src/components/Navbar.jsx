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

import { AuthContext } from "../contexts/authContext";

function Navbar() {
  const { currentUser } = useContext(AuthContext);
  const isLoggedIn = !!currentUser;

  const navigate = useNavigate();

  const out = async () => {
    await axios
      .post(`${import.meta.env.VITE_API_URL}/user/logout`, {
        withCredentials: true,
      })
      .then(() => {
        Cookies.remove("accessToken");
      })
      .then(() => navigate("/", { replace: true }))

      .catch((err) => console.warn(err));
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
        {isLoggedIn ? (
          <>
            <NavLink to="/website/profile">
              <PersonOutlinedIcon />
            </NavLink>
            <EmailOutlinedIcon />
            <NotificationsOutlinedIcon />
            <div className="user">
              <img src={currentUser.profilePic} alt="me" />
              <span>{currentUser.username}</span>
            </div>
          </>
        ) : (
          <span>Guest</span>
        )}
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
