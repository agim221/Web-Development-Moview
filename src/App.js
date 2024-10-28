import React, { useCallback, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "./styles/style.css";
import Home from "./views/home";
import Login from "./views/login";
import MovieDetail from "./views/MovieDetail";
import Search from "./views/search";
import Navbar from "./components/Navbar";
import Filterbar from "./components/Filterbar";
import Footer from "./components/Footer";
import CMS from "./views/cms";
import Register from "./views/register";
import Bookmark from "./views/bookmark";

function App() {
  let [isOpen, setIsOpen] = useState("-translate-y-full");

  const [filterData, setFilterData] = useState({
    genre: "",
    year: "",
    country: "",
    sort: "",
  });
  let [searchText, setSearchText] = useState("");
  let [filteredSum, setFilteredSum] = useState(1);
  let [searchBy, setSearchBy] = useState("title");

  const toggleFilterBar = useCallback(() => {
    setIsOpen((prev) =>
      prev === "-translate-y-full" ? "translate-y-0" : "-translate-y-full"
    );
  }, []);

  useEffect(() => {}, []);

  return (
    <Router>
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
                <Home
                  filterData={filterData}
                  searchText={searchText}
                  setFilteredSum={setFilteredSum}
                />
              }
            />
            <Route
              path="/search"
              element={
                <Search
                  filterData={filterData}
                  searchText={searchText}
                  setFilteredSum={setFilteredSum}
                  searchBy={searchBy}
                />
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/watchlist" element={<Bookmark />} />
            <Route path="/cms" element={<CMS />} />
            <Route path="/register" element={<Register />} />
            <Route path="/movieDetail/:id" element={<MovieDetail />} />
          </Routes>
        </div>
        {/* <Footer filteredSum={filteredSum} /> */}
      </div>
    </Router>
  );
}

export default App;
