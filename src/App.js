import React, { useCallback, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "./styles/style.css";
import Home from "./views/home";
import Login from "./views/login";
import Search from "./views/search";
import Navbar from "./components/Navbar";
import Filterbar from "./components/Filterbar";
import Footer from "./components/Footer";

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

  const toggleFilterBar = useCallback(() => {
    setIsOpen((prev) =>
      prev === "-translate-y-full" ? "translate-y-0" : "-translate-y-full"
    );
  }, []);

  useEffect(() => {
    console.log(filterData);
    console.log("ineffect");
  }, [filterData]);

  return (
    <Router>
      <div className="relative w-full h-full">
        <Filterbar
          isOpen={isOpen}
          toggleFilterBar={toggleFilterBar}
          onSubmit={setFilterData}
        />
        <div className="w-4/5 mx-auto">
          <Navbar isOpen={isOpen} toggleFilterBar={toggleFilterBar} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/search"
              element={<Search filterData={filterData} />}
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
