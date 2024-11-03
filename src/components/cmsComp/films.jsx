import React, { useEffect, useState } from "react";
import CMSTable from "../../components/CMSTable";
import axios from "axios";

function Movies() {
  const [movies, setMovies] = useState([]);

  function renderActions() {
    return (
      <td>
        <button className="hover:underline">Edit</button>
        <span className="mx-2">|</span>
        <button className="hover:underline">Delete</button>
      </td>
    );
  }

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Fetch movies from the API
        const response = await axios.get("http://localhost:8000/api/films");
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  // Map the movies data to only include id, image, title, and release_date
  const formattedMovies = movies.map((movie, index) => [
    index, // ID
    <img src={movie.image} alt={movie.title} width="50" />, // Image thumbnail
    movie.title, // Title
    movie.release_date, // Year
    renderActions(), // Actions
  ]);

  return (
    <section className="w-full h-screen flex flex-col">
      <div className="flex flex-col w-3/4 mx-auto bg-white rounded-lg shadow-lg p-4 overflow-y-auto">
        {/* Form layout for adding a new user */}
        <div className="flex flex-row mb-8 gap-4 bg-slate-100 p-4 rounded">
          <div className="flex flex-col">
            <label className="text-sm">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              className="bg-slate-300 text-black p-2 rounded w-full"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-slate-300 text-black p-2 rounded w-full"
            />
          </div>
          <button className="bg-orange-500 text-white text-xs p-2 rounded hover:text-black hover:bg-white mt-6">
            Submit
          </button>
        </div>
      </div>

      <div className="flex flex-col w-3/4 mx-auto h-full bg-white rounded-lg shadow-lg p-4 overflow-y-auto">
        {/* Table layout for displaying movies */}
        <div className="overflow-y-auto">
          <CMSTable
            headers={["No", "Image", "Title", "Year", "Actions"]}
            datas={formattedMovies}
          />
        </div>
      </div>
    </section>
  );
}

export default Movies;
