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
import Validate from "./views/cms/validate";
import Country from "./views/cms/countries";
import Genre from "./views/cms/genres";

function App() {
  let [isOpen, setIsOpen] = useState("-translate-y-full");

  const [filterData, setFilterData] = useState({
    status: "",
    genre: "",
    rating: "",
    year: "",
    country: "",
    sort: "",
  });
  let [searchText, setSearchText] = useState("");
  let [filteredSum, setFilteredSum] = useState(0);

  const toggleFilterBar = useCallback(() => {
    setIsOpen((prev) =>
      prev === "-translate-y-full" ? "translate-y-0" : "-translate-y-full"
    );
  }, []);

  return (
    // <div className="relative w-full h-full">
    //   {/* <Home /> */}
    //   {/* <Login /> */}
    //   {/*<MovieDetail />*/}
    // </div>
    <Router>
      <div className="relative w-full h-full min-h-screen">
        <Filterbar
          isOpen={isOpen}
          toggleFilterBar={toggleFilterBar}
          onSubmit={setFilterData}
        />
        <div className="w-4/5 mx-auto">
          <Navbar
            isOpen={isOpen}
            toggleFilterBar={toggleFilterBar}
            setSearchText={setSearchText}
          />
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
                />
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/validate" element={<Validate />} />
            <Route path="/country" element={<Country />} />
            <Route path="/genre" element={<Genre />} />
            <Route
              path="/MovieDetail/:id"
              element={<MovieDetail filterData={filterData} />} />
          </Routes>
        </div>
        <Footer filteredSum={filteredSum} />
      </div>
    </Router>
  );
}

export default App;
