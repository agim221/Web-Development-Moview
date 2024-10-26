import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  // State untuk menangani input username, email, dan password
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Lakukan sesuatu dengan data sign-up (e.g., kirim ke server)

    try {
      const response = await axios.post(`http://localhost:8000/register`, {
        username: username,
        email: email,
        password: password,
      });
    } catch (error) {
      console.error("Error get csrf token!", error);
    }
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
        navigate("/");
      }
    }
  }, [navigate]);

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
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              Sign up
            </button>
          </div>
          <div>
            Already have an account?
            <Link to="/login" className="text-blue-500">
              {" "}
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
