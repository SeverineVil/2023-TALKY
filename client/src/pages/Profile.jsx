import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

function Profile() {
  const { currentUser } = useContext(AuthContext);

  return <div>Profil de {currentUser.username}</div>;
}

export default Profile;
