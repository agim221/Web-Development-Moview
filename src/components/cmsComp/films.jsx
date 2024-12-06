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
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [yearsRes, countriesRes, genresRes, awardsRes, actorsRes] =
          await Promise.all([
            axios.get(
              "https://webdev-production-2eb9.up.railway.app//api/years"
            ),
            axios.get(
              "https://webdev-production-2eb9.up.railway.app//api/countries"
            ),
            axios.get(
              "https://webdev-production-2eb9.up.railway.app//api/genres"
            ),
            axios.get(
              "https://webdev-production-2eb9.up.railway.app//api/awards"
            ),
            axios.get(
              "https://webdev-production-2eb9.up.railway.app//api/actors"
            ),
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

  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        "https://webdev-production-2eb9.up.railway.app//api/films/verified"
      );
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const searchMovies = async () => {
    try {
      const response = await axios.get(
        "https://webdev-production-2eb9.up.railway.app//api/search/films",
        {
          params: { query: searchQuery },
        }
      );
      setMovies(response.data);
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };

  const handleEditClick = async (id) => {
    try {
      const response = await axios.get(
        `https://webdev-production-2eb9.up.railway.app//api/films_detail/${id}`
      );
      const movie = response.data;

      const [actorsRes, genresRes, awardsRes] = await Promise.all([
        axios.get(
          `https://webdev-production-2eb9.up.railway.app//api/films_detail/${id}/actors`
        ),
        axios.get(
          `https://webdev-production-2eb9.up.railway.app//api/films_detail/${id}/genres`
        ),
        axios.get(
          `https://webdev-production-2eb9.up.railway.app//api/films_detail/${id}/awards`
        ),
      ]);

      setSelectedMovie(movie);
      setNewFilm({
        title: movie.title,
        altTitle: movie.altTitle || "",
        year: movie.release_date,
        country: countries.find((c) => c.value === movie.country_id),
        synopsis: movie.description,
        availability: movie.availability,
        trailer: movie.trailer,
      });

      setSelectedGenres(
        genresRes.data.map((genre) => ({
          value: genre.genre.id,
          label: genre.genre.name,
        }))
      );
      setSelectedActors(
        actorsRes.data.map((actor) => ({ value: actor.id, label: actor.name }))
      );
      setSelectedAwards(
        awardsRes.data.map((award) => ({
          value: award.award.id,
          label: award.award.name,
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
    if (file) setSelectedImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const convertImageToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    };

    try {
      let image;
      if (selectedImage && typeof selectedImage !== "string") {
        // Jika selectedImage adalah file baru, konversi ke Base64
        image = await convertImageToBase64(selectedImage);
      } else {
        // Jika selectedImage adalah path yang sudah ada, gunakan path tersebut
        image = selectedImage;
      }

      const filmData = {
        title: newFilm.title,
        image: image,
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
        `https://webdev-production-2eb9.up.railway.app//api/films/${selectedMovie.id}/update`,
        filmData
      );
      setIsModalOpen(false);
      setSelectedMovie(null);

      fetchMovies();
    } catch (error) {
      console.error("Error updating film:", error);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(
        `https://webdev-production-2eb9.up.railway.app//api/films/${id}`
      );
      fetchMovies();
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  function renderActions(movie) {
    return (
      <td>
        <button
          className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600"
          onClick={() => handleEditClick(movie.id)}
        >
          Edit
        </button>
        <span className="mx-2"></span>
        <button
          className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600"
          onClick={() => handleDeleteClick(movie.id)}
        >
          Delete
        </button>
      </td>
    );
  }

  return (
    <section className="w-full h-screen flex flex-col">
      <div className="flex flex-col w-3/4 mx-auto bg-white rounded-lg shadow-lg p-4 overflow-y-auto">
        {/* Search Bar */}
        <div className="flex items-center mb-6 p-4 bg-slate-100 rounded">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search films..."
            className="w-full px-3 py-2 bg-white rounded"
          />
          <button
            className="ml-4 bg-slate-500 text-white text-xs px-3 py-1 rounded hover:bg-slate-600"
            onClick={searchMovies}
          >
            Search
          </button>
        </div>

        <CMSTable
          headers={["No", "Title", "Year", "Actions"]}
          datas={movies.map((movie, index) => [
            index + 1,
            movie.title,
            movie.release_date,
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
                    className="w-full h-full rounded-xl cursor-pointer bg-slate-500 flex items-center justify-center"
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
                    className="relative w-full h-auto rounded-xl cursor-pointer"
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
                      className="w-full h-auto object-cover rounded-xl"
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
                      options={years}
                      value={
                        newFilm.year
                          ? { value: newFilm.year, label: newFilm.year }
                          : null
                      }
                      onChange={(selectedOption) =>
                        setNewFilm({ ...newFilm, year: selectedOption.value })
                      }
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="country">Country</label>
                    <Select
                      options={countries}
                      value={newFilm.country}
                      onChange={(selectedOption) =>
                        setNewFilm({ ...newFilm, country: selectedOption })
                      }
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="synopsis">Synopsis</label>
                  <textarea
                    name="synopsis"
                    id="synopsis"
                    className="bg-slate-400 text-white p-2 rounded w-full h-32"
                    value={newFilm.synopsis}
                    onChange={(e) =>
                      setNewFilm({ ...newFilm, synopsis: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="trailer">Trailer</label>
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
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label htmlFor="actors">Actors</label>
                    <Select
                      isMulti
                      options={actors}
                      value={selectedActors}
                      onChange={setSelectedActors}
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="genres">Genres</label>
                    <Select
                      isMulti
                      options={genres}
                      value={selectedGenres}
                      onChange={setSelectedGenres}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="awards">Awards</label>
                  <Select
                    isMulti
                    options={awards}
                    value={selectedAwards}
                    onChange={setSelectedAwards}
                  />
                </div>
                <div>
                  <label htmlFor="availability">Availability</label>
                  <input
                    type="text"
                    name="availability"
                    id="availability"
                    className="bg-slate-400 text-white p-2 rounded w-full"
                    value={newFilm.availability}
                    onChange={(e) =>
                      setNewFilm({ ...newFilm, availability: e.target.value })
                    }
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
                >
                  Save
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
