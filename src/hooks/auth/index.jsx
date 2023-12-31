import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const tokenFromStorage = localStorage.getItem("token");
  const [token, setToken] = useState(tokenFromStorage);

  if (token) {
    const decodedToken = jwtDecode(token); // Decode the token
    const currentTime = Date.now() / 1000; // Get the current time in seconds

    if (decodedToken.exp < currentTime) {
      setToken(null);
    }
  }

  const login = async (formData) => {
    const url = "auth/authenticate";
    // console.log("login form data:", formData);
    const { data: res } = await axios.post(url, formData);
    const newToken = res.token;
    localStorage.setItem("token", newToken);
    setToken(newToken);

    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  const value = {
    token,
    login,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useAuth = () => {
  return useContext(UserContext);
};
