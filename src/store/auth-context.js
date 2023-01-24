import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  isLogin: (email, password) => {},
  isLogout: () => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logoutHandler = () => {
    localStorage.removeItem("isLogged_in");
    setIsLoggedIn(false);
  };
  const loginHandler = (email, password) => {
    localStorage.setItem("isLogged_in", "1");
    setIsLoggedIn(true);
  };

  useEffect(() => {
    const storedUserIsLoggedInInformation = localStorage.getItem("isLogged_in");

    if (storedUserIsLoggedInInformation === "1") {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogin: loginHandler,
        onLogout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
