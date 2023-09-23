import axios from "axios";
import { createContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await axios.post("http://localhost:5000/user/login", inputs, {
      withCredentials: true,
    });

    setCurrentUser(res.data);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  const authContextValue = useMemo(
    () => ({ currentUser, login }),
    [currentUser, login]
  );

  return (
    // <AuthContext.Provider key={currentUser.userId} value={authContextValue}>
    //   {children}
    // </AuthContext.Provider>
    <AuthContext.Provider value={authContextValue}>
      {currentUser ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
}

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContextProvider;
