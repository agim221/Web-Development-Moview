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
  const [text, setText] = useState("");
  const [cookie, setCookie] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [suggestions, setSuggestions] = useState([]); // State for autocomplete suggestions
  const [profileDropdown, setProfileDropdown] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchText(text);
    navigate("/search");
    setShowDropdown(false); // Hide dropdown on submit
  };

  const fetchSuggestionsByTitle = async (query) => {
    try {
      const response = await axios.get(
        `https://webdev-production-2eb9.up.railway.app/api/films/auto-complete/title`,
        {
          params: { title: query },
        }
      );
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching autocomplete suggestions:", error);
    }
  };

  const fetchSuggestionsByActor = async (query) => {
    try {
      const response = await axios.get(
        `https://webdev-production-2eb9.up.railway.app/api/films/auto-complete/actor`,
        {
          params: { name: query },
        }
      );
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching autocomplete suggestions:", error);
    }
  };

  useEffect(() => {
    if (text.length > 0) {
      if (searchBy === "title") fetchSuggestionsByTitle(text);
      else fetchSuggestionsByActor(text);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [text, searchBy]);

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
    <nav className="bg-white py-4 flex items-center justify-between mb-9 px-40">
      <div className="flex items-center space-x-4 gap-10 w-full">
        <span
          role="button"
          className="text-lg font-semibold text-gray-800"
          onClick={handleHome}
        >
          Moview
        </span>
        <div className="w-full flex gap-6 relative">
          <div className="relative w-full">
            <form onSubmit={handleSubmit} className="flex w-full">
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
            {showDropdown && suggestions.length > 0 && (
              <div className="absolute bg-white border border-gray-300 rounded-lg mt-1 w-full max-h-60 overflow-y-auto z-10 left-0 top-full">
                {suggestions.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setText(suggestion.title);
                      setShowDropdown(false);
                      navigate(`/MovieDetail/${suggestion.id}`);
                    }}
                  >
                    <img
                      src={suggestion.image}
                      alt={suggestion.title}
                      className="w-10 h-10 rounded mr-3"
                    />
                    <span>{suggestion.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
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
        {cookie && (
          <button
            onClick={() => navigate("/watchlist")}
            className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
          >
            Watchlist
          </button>
        )}
        {cookie ? (
          <div className="relative">
            <button
              onClick={() => setProfileDropdown(!profileDropdown)}
              className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 flex items-center"
            >
              Profile
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4 ml-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {profileDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                <button
                  onClick={() => navigate("/account")}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Account
                </button>
                <button
                  onClick={() => navigate("/add-movie")}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Add Film
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
