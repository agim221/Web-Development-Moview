import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  // State untuk menangani input username dan password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lakukan sesuatu dengan data login (e.g., kirim ke server)
    console.log("Username:", username);
    console.log("Password:", password);
    axios
      .post("http://localhost:8000/api/auth/callback/google", {
        username: username,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const handleLoginWithGoogle = () => {
    window.location.href = "http://localhost:8000/api/auth/google";
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center mb-6">Dramaku</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Username"
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
            <button
              type="submit"
              className="w-full py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Sign in
            </button>
          </div>
          <div>
            <button
              type="button"
              className="w-full py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              onClick={() => {
                handleLoginWithGoogle();
              }}
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
