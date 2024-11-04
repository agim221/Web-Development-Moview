// import React, { useEffect, useState } from "react";
// import CMSTable from "../../components/CMSTable";
// import axios from "axios";

// function Movies() {
//   const [movies, setMovies] = useState([]);

//   function renderActions() {
//     return (
//       <td>
//         <button className="hover:underline">Edit</button>
//         <span className="mx-2">|</span>
//         <button className="hover:underline">Delete</button>
//       </td>
//     );
//   }

//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         // Fetch movies from the API
//         const response = await axios.get("http://localhost:8000/api/films");
//         setMovies(response.data);
//       } catch (error) {
//         console.error("Error fetching movies:", error);
//       }
//     };

//     fetchMovies();
//   }, []);

//   // Map the movies data to only include id, image, title, and release_date
//   const formattedMovies = movies.map((movie, index) => [
//     index, // ID
//     <img src={movie.image} alt={movie.title} width="50" />, // Image thumbnail
//     movie.title, // Title
//     movie.release_date, // Year
//     renderActions(), // Actions
//   ]);

//   return (
//     <section className="w-full h-screen flex flex-col">
//       <div className="flex flex-col w-3/4 mx-auto bg-white rounded-lg shadow-lg p-4 overflow-y-auto">
//         {/* Form layout for adding a new user */}
//         <div className="flex flex-row mb-8 gap-4 bg-slate-100 p-4 rounded">
//           <div className="flex flex-col">
//             <label className="text-sm">Username</label>
//             <input
//               type="text"
//               name="username"
//               id="username"
//               className="bg-slate-300 text-black p-2 rounded w-full"
//             />
//           </div>
//           <div className="flex flex-col">
//             <label className="text-sm">Email</label>
//             <input
//               type="email"
//               name="email"
//               id="email"
//               className="bg-slate-300 text-black p-2 rounded w-full"
//             />
//           </div>
//           <button className="bg-orange-500 text-white text-xs p-2 rounded hover:text-black hover:bg-white mt-6">
//             Submit
//           </button>
//         </div>
//       </div>

//       <div className="flex flex-col w-3/4 mx-auto h-full bg-white rounded-lg shadow-lg p-4 overflow-y-auto">
//         {/* Table layout for displaying movies */}
//         <div className="overflow-y-auto">
//           <CMSTable
//             headers={["No", "Image", "Title", "Year", "Actions"]}
//             datas={formattedMovies}
//           />
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Movies;

import React, { useState, useEffect } from "react";
import CMSTable from "../../components/CMSTable";
import axios from "axios";
import Select from "react-select";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [newFilm, setNewFilm] = useState({
    title: "",
    altTitle: "",
    year: "",
    country: null,
    synopsis: "",
    availability: "",
    trailer: "",
  });
  const [years, setYears] = useState([]);
  const [countries, setCountries] = useState([]);
  const [actors, setActors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [awards, setAwards] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedActors, setSelectedActors] = useState([]);
  const [selectedAwards, setSelectedAwards] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [yearsRes, countriesRes, genresRes, awardsRes, actorsRes] =
          await Promise.all([
            axios.get("http://localhost:8000/api/years"),
            axios.get("http://localhost:8000/api/countries"),
            axios.get("http://localhost:8000/api/genres"),
            axios.get("http://localhost:8000/api/awards"),
            axios.get("http://localhost:8000/api/actors"),
          ]);
        setYears(
          yearsRes.data.map((year) => ({ value: year.year, label: year.year }))
        );
        setCountries(
          countriesRes.data.map((country) => ({
            value: country.id,
            label: country.name,
          }))
        );
        setGenres(
          genresRes.data.map((genre) => ({
            value: genre.id,
            label: genre.name,
          }))
        );
        setAwards(
          awardsRes.data.map((award) => ({
            value: award.id,
            label: award.name,
          }))
        );
        setActors(
          actorsRes.data.map((actor) => ({
            value: actor.id,
            label: actor.name,
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleEditClick = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/films_detail/${id}`
      );
      const movie = response.data;
      console.log(movie);

      setSelectedMovie(movie);
      setNewFilm({
        title: movie.title,
        altTitle: "Test",
        year: movie.release_date,
        country: countries.find((c) => c.value === movie.country_id),
        synopsis: movie.description,
        availability: movie.availability,
        trailer: movie.trailer,
      });
      setSelectedGenres(
        movie.genres.map((genre) => ({
          value: genre.id,
          label: genre.name,
        }))
      );
      setSelectedActors(
        movie.actors.map((actor) => ({
          value: actor.id,
          label: actor.name,
        }))
      );
      setSelectedAwards(
        movie.awards.map((award) => ({
          value: award.id,
          label: award.name,
        }))
      );
      setSelectedImage(movie.image);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const convertImageToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    };
    try {
      const base64Image = selectedImage
        ? await convertImageToBase64(selectedImage)
        : null;
      const filmData = {
        title: newFilm.title,
        image: base64Image,
        description: newFilm.synopsis,
        release_date: newFilm.year,
        country_id: newFilm.country.value,
        trailer: newFilm.trailer,
        availability: newFilm.availability,
        actors: selectedActors.map((actor) => actor.value),
        genres: selectedGenres.map((genre) => genre.value),
        awards: selectedAwards.map((award) => award.value),
      };
      await axios.put(
        `http://localhost:8000/api/films/${selectedMovie.id}`,
        filmData
      );
      setIsModalOpen(false);
      setSelectedMovie(null);
      // Refresh the movies list
      const response = await axios.get("http://localhost:8000/api/films");
      setMovies(response.data);
    } catch (error) {
      console.error("Error updating film:", error);
    }
  };

  function renderActions(movie) {
    return (
      <td>
        <button
          className="hover:underline"
          onClick={() => handleEditClick(movie.id)}
        >
          Edit
        </button>
        <span className="mx-2">|</span>
        <button className="hover:underline">Delete</button>
      </td>
    );
  }

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/films");
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <section className="w-full h-screen flex flex-col">
      <div className="flex flex-col w-3/4 mx-auto bg-white rounded-lg shadow-lg p-4 overflow-y-auto">
        <CMSTable
          headers={["No", "Title", "Year", "Actions"]}
          datas={movies.map((movie, index) => [
            index + 1,
            movie.title,
            movie.year,
            renderActions(movie),
          ])}
        />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-3/4 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={handleCloseModal}
            >
              &times;
            </button>
            <form onSubmit={handleSubmit} className="flex gap-6">
              <div className="flex flex-col items-center w-1/4">
                {!selectedImage ? (
                  <label
                    htmlFor="image-upload"
                    className="w-full h-64 rounded-xl cursor-pointer bg-slate-500 flex items-center justify-center"
                  >
                    <input
                      type="file"
                      id="image-upload"
                      className="hidden"
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                    <span className="text-white text-lg font-bold">
                      Upload Photo
                    </span>
                  </label>
                ) : (
                  <label
                    htmlFor="image-upload"
                    className="relative w-full h-64 rounded-xl cursor-pointer"
                  >
                    <input
                      type="file"
                      id="image-upload"
                      className="hidden"
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                    <img
                      src={
                        typeof selectedImage === "string"
                          ? selectedImage
                          : URL.createObjectURL(selectedImage)
                      }
                      alt="Film Cover"
                      className="w-full h-64 object-cover rounded-xl"
                    />
                  </label>
                )}
              </div>
              <div className="flex flex-col w-3/4 gap-4">
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="bg-slate-400 text-white p-2 rounded w-full"
                      value={newFilm.title}
                      onChange={(e) =>
                        setNewFilm({ ...newFilm, title: e.target.value })
                      }
                    />
                  </div>
                  <div className="w-1/2">
                    <label htmlFor="alt-title">Alternative Title</label>
                    <input
                      type="text"
                      name="alt-title"
                      id="alt-title"
                      className="bg-slate-400 text-white p-2 rounded w-full"
                      value={newFilm.altTitle}
                      onChange={(e) =>
                        setNewFilm({ ...newFilm, altTitle: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label htmlFor="year">Year</label>
                    <Select
                      name="year"
                      id="year"
                      className="text-black w-full mt-2"
                      options={years}
                      value={years.find((y) => y.value === newFilm.year)}
                      onChange={(selectedOption) =>
                        setNewFilm({ ...newFilm, year: selectedOption.value })
                      }
                      placeholder="Select Year"
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="country">Country</label>
                    <Select
                      name="country"
                      id="country"
                      className="text-black w-full mt-2"
                      options={countries}
                      value={newFilm.country}
                      onChange={(selectedOption) =>
                        setNewFilm({ ...newFilm, country: selectedOption })
                      }
                      placeholder="Select Country"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="synopsis">Synopsis</label>
                  <textarea
                    name="synopsis"
                    id="synopsis"
                    className="bg-slate-400 text-white p-2 rounded w-full"
                    rows="4"
                    value={newFilm.synopsis}
                    onChange={(e) =>
                      setNewFilm({ ...newFilm, synopsis: e.target.value })
                    }
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="available">Availability</label>
                  <input
                    type="text"
                    name="available"
                    id="available"
                    className="bg-slate-400 text-white p-2 rounded w-full"
                    value={newFilm.availability}
                    onChange={(e) =>
                      setNewFilm({ ...newFilm, availability: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="genre">Select Genre(s)</label>
                  <Select
                    options={genres}
                    isMulti
                    value={selectedGenres}
                    onChange={setSelectedGenres}
                    className="text-black w-full mt-2"
                    placeholder="Choose genres..."
                  />
                </div>
                <div>
                  <label htmlFor="actor">Select Actor(s) (Up to 9)</label>
                  <Select
                    options={actors}
                    isMulti
                    value={selectedActors}
                    onChange={setSelectedActors}
                    className="text-black w-full mt-2"
                    placeholder="Choose actors..."
                  />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label htmlFor="trailer">Link Trailer</label>
                    <input
                      type="text"
                      name="trailer"
                      id="trailer"
                      className="bg-slate-400 text-white p-2 rounded w-full"
                      value={newFilm.trailer}
                      onChange={(e) =>
                        setNewFilm({ ...newFilm, trailer: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="award">Award</label>
                    <Select
                      name="award"
                      id="award"
                      isMulti
                      className="text-black w-full mt-2"
                      options={awards}
                      value={selectedAwards}
                      onChange={setSelectedAwards}
                      placeholder="Select Award"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-4 bg-slate-500 text-white rounded-lg w-2/5 h-10"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default Movies;
