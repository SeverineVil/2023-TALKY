import React, { useContext } from "react";
import { AuthContext } from "../contexts/authContext";

function Profile() {
  const { currentUser } = useContext(AuthContext);

  return <div>Profile de {currentUser.username}</div>;
}

export default Profile;
