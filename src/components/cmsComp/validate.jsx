import { useState, useEffect, useCallback } from "react";
import CMSTable from "../../components/CMSTable";
import axios from "axios";

function Validate() {
  const [films, setFilms] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [genres, setGenres] = useState([]);
  const [actors, setActors] = useState([]);
  const [awards, setAwards] = useState([]);
  const [country, setCountry] = useState([]);

  const fetchGenres = useCallback(async (id) => {
    try {
      const response = await axios.get(
        `https://webdev-production-2eb9.up.railway.app//api/films_detail/${id}/genres`
      );
      setGenres(response.data);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  }, []);

  const fetchActors = useCallback(async (id) => {
    try {
      const response = await axios.get(
        `https://webdev-production-2eb9.up.railway.app//api/films_detail/${id}/actors`
      );
      setActors(response.data);
    } catch (error) {
      console.error("Error fetching actors:", error);
    }
  }, []);

  const fetchAwards = useCallback(async (id) => {
    try {
      const response = await axios.get(
        `https://webdev-production-2eb9.up.railway.app//api/films_detail/${id}/awards`
      );
      setAwards(response.data);
    } catch (error) {
      console.error("Error fetching awards:", error);
    }
  }, []);

  const fetchCountry = useCallback(async (id) => {
    try {
      const response = await axios.get(
        `https://webdev-production-2eb9.up.railway.app//api/countries/${id}`
      );
      setCountry(response.data);
    } catch (error) {
      console.error("Error fetching country:", error);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://webdev-production-2eb9.up.railway.app//api/films/unverified"
        );

        setFilms(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleValidateClick = (film) => {
    setSelectedFilm(film);
    fetchGenres(film.id);
    fetchActors(film.id);
    fetchAwards(film.id);
    fetchCountry(film.country_id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFilm(null);
  };

  const handleApproveClick = async (id) => {
    try {
      await axios.put(
        `https://webdev-production-2eb9.up.railway.app//api/films/approve/${id}`
      );
      const response = await axios.get(
        "https://webdev-production-2eb9.up.railway.app//api/films/unverified"
      );
      setFilms(response.data);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error approving film:", error);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(
        `https://webdev-production-2eb9.up.railway.app//api/films/${id}`
      );
      const response = await axios.get(
        "https://webdev-production-2eb9.up.railway.app//api/films/unverified"
      );
      setFilms(response.data);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error deleting film:", error);
    }
  };

  function renderActions(film) {
    return (
      <td className="flex gap-1">
        <button
          className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600"
          onClick={() => handleValidateClick(film)}
        >
          Validate
        </button>
        <button
          className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600"
          onClick={() => handleDeleteClick(film.id)}
        >
          Delete
        </button>
      </td>
    );
  }

  return (
    <section className="w-full py-8">
      <div className="flex flex-col w-3/4 mx-auto gap-6 overflow-y-scroll h-[900px]">
        {/* Table Component */}
        <CMSTable
          headers={["No", "Drama", "Synopsis", "Year", "Actions"]}
          datas={films.map((film, index) => [
            index + 1,
            film.title,
            film.description,
            film.release_date,
            renderActions(film),
          ])}
        />
      </div>

      {isModalOpen && selectedFilm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-3/4 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={handleCloseModal}
            >
              &times;
            </button>
            <div className="flex gap-6">
              <div className="flex flex-col items-center w-1/4">
                <img
                  src={selectedFilm.image}
                  alt="Film Cover"
                  className="w-full h-64 object-cover rounded-xl"
                />
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
                      value={selectedFilm.title}
                      readOnly
                    />
                  </div>
                  <div className="w-1/2">
                    <label htmlFor="alt-title">Alternative Title</label>
                    <input
                      type="text"
                      name="alt-title"
                      id="alt-title"
                      className="bg-slate-400 text-white p-2 rounded w-full"
                      value={selectedFilm.altTitle}
                      readOnly
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label htmlFor="year">Year</label>
                    <input
                      type="text"
                      name="year"
                      id="year"
                      className="bg-slate-400 text-white p-2 rounded w-full"
                      value={selectedFilm.release_date}
                      readOnly
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="country">Country</label>
                    <input
                      type="text"
                      name="country"
                      id="country"
                      className="bg-slate-400 text-white p-2 rounded w-full"
                      value={country.name}
                      readOnly
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
                    value={selectedFilm.description}
                    readOnly
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="availability">Availability</label>
                  <input
                    type="text"
                    name="availability"
                    id="availability"
                    className="bg-slate-400 text-white p-2 rounded w-full"
                    value={selectedFilm.availability}
                    readOnly
                  />
                </div>
                <div>
                  <label htmlFor="genre">Genres</label>
                  <input
                    type="text"
                    name="genre"
                    id="genre"
                    className="bg-slate-400 text-white p-2 rounded w-full"
                    value={genres.map((genre) => genre.genre.name).join(", ")}
                    readOnly
                  />
                </div>
                <div>
                  <label htmlFor="actor">Actors</label>
                  <input
                    type="text"
                    name="actor"
                    id="actor"
                    className="bg-slate-400 text-white p-2 rounded w-full"
                    value={actors.map((actor) => actor.name).join(", ")}
                    readOnly
                  />
                </div>
                <div>
                  <label htmlFor="trailer">Trailer</label>
                  <input
                    type="text"
                    name="trailer"
                    id="trailer"
                    className="bg-slate-400 text-white p-2 rounded w-full"
                    value={selectedFilm.trailer}
                    readOnly
                  />
                </div>
                <div>
                  <label htmlFor="award">Awards</label>
                  <input
                    type="text"
                    name="award"
                    id="award"
                    className="bg-slate-400 text-white p-2 rounded w-full"
                    value={awards.map((award) => award.award.name).join(", ")}
                    readOnly
                  />
                </div>
                <div className="flex gap-4 mt-4">
                  <button
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                    onClick={() => handleApproveClick(selectedFilm.id)}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                    onClick={() => handleDeleteClick(selectedFilm.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Validate;
