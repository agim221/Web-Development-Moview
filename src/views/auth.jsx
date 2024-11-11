import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Circles } from "react-loading-icons";

const AuthCallback = ({ setRole }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const remember_token = urlParams.get("remember_token");
    const date = new Date();

    if (remember_token) {
      localStorage.setItem("remember_token", remember_token);
      const expiry = new Date(date.getTime() + 24 * 60 * 60 * 1000); // 1 day
      localStorage.setItem("remember_token_expiry", expiry);
      // Set role based on token or make an API call to get user role
      setRole("user"); // or 'admin' based on your logic
      navigate("/"); // Redirect to the desired page after login
    } else {
      navigate("/login"); // Redirect to login if no token found
    }
  }, [navigate, setRole]);

  return (
    <div className="flex h-screen justify-center items-center">
      <Circles stroke="#3B82F6" />
    </div>
  );
};

export default AuthCallback;
