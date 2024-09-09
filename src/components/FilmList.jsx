import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import FilmCard from "./FilmCard";
import films from "../assets/images/main-slider/dummy.json";

function FilmList({
  filterData,
  searchText,
  filmShowed,
  setFilmShowed,
  sectionTitle,
  setFilteredSum,
  increment = 20,
}) {
  const [filteredFilms, setFilteredFilms] = useState([]);
  const navigate = useNavigate();

  const filterFilms = () => {
    let filteredFilms = films.filter((film) => {
      return (
        film.title.toLowerCase().includes(searchText.toLowerCase()) &&
        (film.status === filterData.status || filterData.status === "") &&
        (film.genre === filterData.genre || filterData.genre === "") &&
        (film.rating === filterData.rating || filterData.rating === "") &&
        (film.year === filterData.year || filterData.year === "") &&
        (film.country === filterData.country || filterData.country === "")
      );
    });

    setFilteredFilms(filteredFilms);
    setFilteredSum(filteredFilms.length);
  };

  const loadMore = useCallback(() => {
    setFilmShowed((prev) => prev + increment);
  }, []);

  useEffect(() => {
    filterFilms();
  }, [filterData, searchText]);

  const handleFilmClick = (id) => {
    navigate(`/MovieDetail/${id}`);
  }

  return (
    <>
      {filteredFilms.length === 0 ? (
        <p className="text-2xl font-bold p-5">No films found</p>
      ) : (
        <h1 className="text-4xl font-bold p-5">{sectionTitle}</h1>
      )}
      <div className="grid grid-cols-5 gap-x-4 gap-y-24 mb-28">
        {filteredFilms.slice(0, filmShowed).map((film) => (
          <div key={film.id} onClick={() => handleFilmClick(film.id)}>
            <FilmCard
              key={film.id}
              title={film.title}
              description={film.description}
              posterUrl={film.image}
              year={film.year}
              rating={film.rating}
              country={film.country}
              status={film.status}
              genre={film.genre}
            />
          </div>
        ))}
      </div>
      <button
        className={`bg-red-400 text-white font-bold py-2 px-4 w-1/6 rounded self-center ${
          filteredFilms.length <= filmShowed ? "hidden" : ""
        }`}
        onClick={loadMore}
      >
        Load More
      </button>
    </>
  );
}

export default FilmList;
