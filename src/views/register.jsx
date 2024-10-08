import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SignUpPage = () => {
  // State untuk menangani input username, email, dan password
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lakukan sesuatu dengan data sign-up (e.g., kirim ke server)
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const response = axios.get(`http://localhost:8000/api/account/register`, {
        params: {
          username: username,
          email: email,
          password: password,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error("There was an error fetching the filtered films!", error);
    }
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
            <button
              type="button"
              className="w-full py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              onClick={() => {
                console.log("Sign up with Google clicked");
              }}
            >
              Sign up with Google
            </button>
          </div>
          <div>
            Already have an account?
            <Link to="/login" className="text-blue-500">
              {" "}
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
