import { useMemo, useState, createContext } from "react";
import React, { useEffect } from "react";
import getCommonOptions from "src/helpers/axios/getCommonOptions";
import axios from "axios";
import PropTypes from "prop-types";

export const AuthContext = createContext({
  isAuthenticated: null,
  setIsAuthenticated: () => {},
  user: null,
  setUser: () => {},
});

export default function AuthContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);

  const loadAuthUser = () => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      setIsAuthenticated(false);
      return;
    }

    axios
      .get("/api/auth/users/me", getCommonOptions())
      .then((res) => {
        setUser(res.data);
        setIsAuthenticated(true);
      })
      .catch(() => {
        setIsAuthenticated(false);
      });
  };

  const providerValue = useMemo(() => {
    return {
      isAuthenticated,
      setIsAuthenticated,
      user,
      setUser,
    };
  }, [isAuthenticated, setIsAuthenticated, user, setUser]);

  useEffect(() => {
    if (!user && (isAuthenticated === null || isAuthenticated === true)) {
      loadAuthUser();
    }
  }, [user, isAuthenticated]);

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
}

AuthContextProvider.propTypes = {
  children: PropTypes.node,
};
