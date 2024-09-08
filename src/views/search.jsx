import React, { useState, useEffect, useCallback } from "react";
import FilmCard from "../components/FilmCard";
import films from "../assets/images/main-slider/dummy.json";

function Search({ filterData, searchText, setFilteredSum }) {
  const [filteredFilms, setFilteredFilms] = useState([]);
  const [filmShowed, setFilmShowed] = useState(30);

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
    setFilmShowed((prev) => prev + 30);
  }, []);

  useEffect(() => {
    filterFilms();
  }, [filterData, searchText]);

  return (
    <>
      <section className="flex flex-col w-4/5 mx-auto">
        {filteredFilms.length === 0 ? (
          <p className="text-2xl font-bold p-5">No films found</p>
        ) : (
          <h1 className="text-4xl font-bold p-5">Search</h1>
        )}
        <div className="grid grid-cols-5 gap-x-4 gap-y-24 mb-28">
          {filteredFilms.slice(0, filmShowed).map((film) => (
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
      </section>
    </>
  );
}

export default Search;
