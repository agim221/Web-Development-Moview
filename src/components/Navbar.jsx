import React, { useEffect, useState } from "react";
import "../styles/style.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar({
  toggleFilterBar,
  setSearchText,
  setFilterData,
  searchBy,
  setSearchBy,
}) {
  let [text, setText] = useState("");
  const [cookie, setCookie] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchText(text);
    navigate("/search");
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
        setCookie("");
      } else {
        setCookie(rememberToken);
      }
    }
  }, [cookie, navigate]);

  const handleSearchBy = (e) => {
    setSearchBy(e.target.value);
    console.log(e.target.value);
  };

  const handleLogout = (e) => {
    e.preventDefault();

    localStorage.removeItem("remember_token");
    localStorage.removeItem("remember_token_expiry");

    setCookie("");
    window.location.href = "/";
  };

  const handleHome = () => {
    setSearchText("");
    setFilterData({
      genre: "",
      year: "",
      country: "",
      sort: "",
      award: "",
    });
    setSearchBy("title");
    window.location.href = "/";
  };

  return (
    <>
      <nav className="bg-white py-4 flex items-center justify-between mb-9 px-40">
        <div className="flex items-center space-x-4 gap-10 w-full">
          <span
            role="button"
            className="text-lg font-semibold text-gray-800"
            onClick={handleHome}
          >
            Moview
          </span>
          <div className="w-full flex gap-6">
            <form onSubmit={handleSubmit} className="flex w-4/5">
              <input
                type="text"
                className="border border-gray-300 p-2 rounded-xl w-full"
                placeholder="Search"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                role="button"
                strokeWidth="1.5"
                stroke="currentColor"
                className="btn-search size-6 self-center w-10 h-10 -mx-12"
                type="submit"
                onClick={handleSubmit}
              >
                <path
                  className="text-gray-800"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </form>
            <select
              className="bg-orange-500 rounded text-white"
              value={searchBy}
              onChange={handleSearchBy}
            >
              <option value="title">Title</option>
              <option value="actor">Actor</option>
            </select>
            <svg
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              onClick={() => toggleFilterBar()}
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="btn-filter size-6 self-center bg-orange-500 rounded text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
              />
            </svg>
          </div>
        </div>
        <div className="flex space-x-2 justify-end w-1/4">
          {cookie !== "" ? (
            <>
              <div
                className="flex flex-row bg-orange-500 rounded px-2"
                onClick={() => navigate("/watchlist")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#fff"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 self-center text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                  />
                </svg>
                <button className="text-white py-1 px-3 rounded">
                  watchlist
                </button>
              </div>
              <div className="flex flex-row bg-orange-500 rounded px-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 self-center text-white stroke-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                <button className="text-white py-1 px-3 rounded">
                  Profile
                </button>
              </div>
              <button
                className="bg-orange-500 text-white py-1 px-3 rounded"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <button
              className="bg-orange-500 text-white py-1 px-3 rounded"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </div>
      </nav>
    </>
  );
}

export default React.memo(Navbar);
