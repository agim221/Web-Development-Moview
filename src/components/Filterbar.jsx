import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

import "../styles/style.css";

import { useNavigate } from "react-router-dom";

function Filterbar({ isOpen, toggleFilterBar, onSubmit }) {
  const [status, setStatus] = useState("");
  const [rating, setRating] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [country, setCountry] = useState("");
  const [sort, setSort] = useState("");
  const [savedValues, setSavedValues] = useState({});

  let [years, setYears] = useState([]);
  let [countries, setCountries] = useState([]);
  let [genres, setGenres] = useState([]);

  const navigate = useNavigate();

  const form = useRef(null);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };

  const handleClose = () => {
    toggleFilterBar();
    setGenre(savedValues.genre);
    setStatus(savedValues.status);
    setRating(savedValues.rating);
    setYear(savedValues.year);
    setCountry(savedValues.country);
    setSort(savedValues.sort);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      status,
      genre,
      rating,
      year,
      country,
      sort,
    };

    navigate("/search");
    toggleFilterBar();
    setSavedValues(formData);
    onSubmit(formData);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setStatus("");
    setGenre("");
    setRating("");
    setYear("");
    setCountry("");
    setSort("");
    form.current.reset();
  };

  useEffect(() => {
    const fetchYears = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/years");
        setYears(response.data);
      } catch (error) {
        console.error("Error fetching years:", error);
      }
    };

    const fetchCountries = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/countries");
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    const fetchGenres = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/genres");
        setGenres(response.data);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
    fetchYears();
    fetchCountries();
  }, []);

  return (
    <section
      className={`filter-sec bg-gray-500/90 h-[600px] w-full absolute z-10 transition-transform duration-500 ease-in-out ${isOpen}`}
    >
      <div className="p-4 flex flex-col w-2/4 mx-auto mt-10">
        <div className="flex flex-row justify-between">
          <h1 className="text-4xl font-bold">Filtered By</h1>
          <svg
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            onClick={() => handleClose()}
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="btn-close size-12 self-center"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          <form onSubmit={handleSubmit} ref={form} className="space-y-4">
            <div className="flex flex-row gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="genre">Genre</label>
                <select
                  name="genre"
                  id="genre"
                  className="border border-gray-300 p-2 rounded-xl"
                  onChange={handleGenreChange}
                  value={genre}
                >
                  <option value="" default></option>
                  {genres.map((genre) => (
                    <option key={genre.id} value={genre.name}>
                      {genre.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="status">Status</label>
                <select
                  name="status"
                  id="status"
                  className="border border-gray-300 p-2 rounded-xl"
                  onChange={handleStatusChange}
                  value={status}
                >
                  <option value="" default></option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              {/* <div className="flex flex-col gap-2">
                <label htmlFor="rating">Rating</label>
                <select
                  name="rating"
                  id="rating"
                  className="border border-gray-300 p-2 rounded-xl"
                  onChange={handleRatingChange}
                  value={rating}
                >
                  <option value="" default></option>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                    <option key={rating} value={rating}>
                      {rating}
                    </option>
                  ))}
                </select>
              </div> */}
              <div className="flex flex-col gap-2">
                <label htmlFor="year">Year</label>
                <select
                  name="year"
                  id="year"
                  className="border border-gray-300 p-2 rounded-xl"
                  onChange={handleYearChange}
                  value={year}
                >
                  <option value="" default></option>
                  {years.map((year) => (
                    <option key={year} value={year.year}>
                      {year.year}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="country">Country</label>
                <select
                  name="country"
                  id="country"
                  className="border border-gray-300 p-2 rounded-xl"
                  onChange={handleCountryChange}
                  value={country}
                >
                  <option value="" default></option>
                  {countries.map((country) => (
                    <option key={country.id} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <h2 className="text-2xl font-bold">Sorted By</h2>
            <div className="flex flex-row gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="sort">Sort</label>
                <select
                  name="sort"
                  id="sort"
                  className="border border-gray-300 p-2 rounded-xl"
                  onChange={handleSortChange}
                  value={sort}
                >
                  <option value="" default></option>
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
            </div>
            <div className="flex flex-row gap-4">
              <button className="bg-orange-500 text-white py-1 px-3 rounded">
                Apply
              </button>
              <button
                className="bg-gray-300 text-white py-1 px-3 rounded"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Filterbar;
