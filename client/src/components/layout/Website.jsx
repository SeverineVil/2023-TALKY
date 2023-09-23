import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";

function Website() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Website;
