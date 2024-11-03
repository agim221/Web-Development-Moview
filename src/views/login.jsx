import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Circles } from "react-loading-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setRole }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmitLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setMessage("Email or password is required");
      return;
    }

    setLoading(true);

    axios
      .post("http://localhost:8000/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        if (
          response.data.error === "User not found" ||
          response.data.error === "Invalid password"
        ) {
          setMessage("Email or password is incorrect");
        } else {
          const now = new Date();

          const rememberToken = response.data.remember_token;
          if (remember) {
            const expiry = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
            localStorage.setItem("remember_token", rememberToken);
            localStorage.setItem("remember_token_expiry", expiry);
          } else {
            const expiry = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 1 day
            localStorage.setItem("remember_token", rememberToken);
            localStorage.setItem("remember_token_expiry", expiry);
          }

          if (response.data.role === "admin") {
            setRole("admin");
            navigate("/cms");
          } else {
            setRole("user");
            navigate("/");
          }
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        setMessage("Email or password is incorrect");
        console.error("There was an error!", error);
      });
  };

  const handleLoginWithGoogle = () => {
    window.location.href = "http://localhost:8000/api/auth/google";
  };

  useEffect(() => {
    const rememberToken = localStorage.getItem("remember_token");
    const expiry = localStorage.getItem("remember_token_expiry");

    if (rememberToken && expiry) {
      const now = new Date();
      const expiryDate = new Date(expiry);

      if (now > expiryDate) {
        localStorage.removeItem("remember_token");
        localStorage.removeItem("remember_token_expiry");
      } else {
        // Token is still valid, proceed with login
        navigate("/");
      }
    }
  }, [navigate]);

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center mb-6">Dramaku</h1>
        <form onSubmit={handleSubmitLogin} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="username"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <p className="text-red-500 text-sm">{message}</p>
          </div>
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={remember}
                onChange={() => setRemember(!remember)}
              />
              <span>Remember me</span>
            </label>
          </div>
          {loading ? (
            <div className="flex justify-center items-center rounded bg-yellow-500 py-2 w-full hover:bg-yellow-600">
              <Circles
                height="25"
                width="25"
                fill="#FFFFFF"
                stroke="#0a0a0a"
                aria-label="loading"
              />
            </div>
          ) : (
            <button
              type="submit"
              className="w-full py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Sign in
            </button>
          )}
          {/* <button
            type="submit"
            className="w-full py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Sign in
          </button> */}
          <div>
            <button
              type="button"
              className="w-full py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              onClick={handleLoginWithGoogle}
            >
              Sign in with Google
            </button>
          </div>
          <div>
            Don't have an account?
            <Link to="/register" className="text-blue-500">
              {" "}
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
