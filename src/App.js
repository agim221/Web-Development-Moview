import React, { useCallback, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Circles } from "react-loading-icons";
import "./App.css";
import "./styles/style.css";
import Home from "./views/home";
import Login from "./views/login";
import MovieDetail from "./views/MovieDetail";
import Search from "./views/search";
import Navbar from "./components/Navbar";
import Filterbar from "./components/Filterbar";
import CMS from "./views/cms";
import Register from "./views/register";
import Bookmark from "./views/bookmark";
import Account from "./views/account";
import axios from "axios";
import AuthCallback from "./views/auth";
import AddMovie from "./views/addMovie";

function App() {
  const [isOpen, setIsOpen] = useState("-translate-y-full");
  const [filterData, setFilterData] = useState({
    genre: "",
    year: "",
    country: "",
    sort: "",
    award: "",
  });
  const [searchText, setSearchText] = useState("");
  const [searchBy, setSearchBy] = useState("title");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  const toggleFilterBar = useCallback(() => {
    setIsOpen((prev) =>
      prev === "-translate-y-full" ? "translate-y-0" : "-translate-y-full"
    );
  }, []);

  const fetchRole = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://webdev-production-2eb9.up.railway.app/api/role",
        {
          params: {
            remember_token: localStorage.getItem("remember_token"),
          },
        }
      );

      if (response.data === "admin") {
        setRole(response.data);
      }
    } catch (error) {
      console.error("Error fetching role:", error);
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    // const fetchRole = async () => {
    //   try {
    //     const response = await axios.get("https://webdev-production-2eb9.up.railway.app/api/role", {
    //       params: {
    //         remember_token: localStorage.getItem("remember_token"),
    //       },
    //     });

    //     if (response.data === "admin") {
    //       setRole(response.data);
    //     }
    //   } catch (error) {
    //     console.error("Error fetching role:", error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    fetchRole();
  }, []);

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <Circles
  //         height="80"
  //         width="80"
  //         fill="#BCCFC0"
  //         stroke="#0a0a0a"
  //         aria-label="loading"
  //       />
  //     </div>
  //   );
  // }

  return (
    <Router>
      {role === "admin" ? (
        <Routes>
          <Route path="/*" element={<CMS />} />
        </Routes>
      ) : (
        <div className="relative w-full h-full min-h-screen bg-gray-100">
          <Filterbar
            isOpen={isOpen}
            toggleFilterBar={toggleFilterBar}
            onSubmit={setFilterData}
          />
          <div className="w-full">
            <Navbar
              isOpen={isOpen}
              toggleFilterBar={toggleFilterBar}
              setSearchText={setSearchText}
              setFilterData={setFilterData}
              setSearchBy={setSearchBy}
              searchBy={searchBy}
            />
          </div>
          <div className="w-4/5 mx-auto">
            <Routes>
              <Route
                path="/"
                element={
                  <Home filterData={filterData} searchText={searchText} />
                }
              />
              <Route
                path="/search"
                element={
                  <Search
                    filterData={filterData}
                    searchText={searchText}
                    searchBy={searchBy}
                  />
                }
              />
              <Route path="/login" element={<Login setRole={setRole} />} />
              <Route path="/watchlist" element={<Bookmark />} />
              <Route path="/register" element={<Register />} />
              <Route path="/movieDetail/:id" element={<MovieDetail />} />
              <Route path="/account" element={<Account />} />
              <Route path="/add-movie" element={<AddMovie />} />
              <Route
                path="/auth/callback"
                element={<AuthCallback setRole={setRole} />}
              />
            </Routes>
          </div>
        </div>
      )}
    </Router>
  );
}

export default App;
