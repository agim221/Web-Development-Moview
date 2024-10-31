import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import FilmCard from "./FilmCard";
import axios from "axios";

function FilmList({
  filterData,
  searchText,
  filmShowed,
  setFilmShowed,
  sectionTitle,
  increment = 20,
  searchBy,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMore = useCallback(() => {
    setFilmShowed((prev) => prev + increment);
  }, []);

  useEffect(() => {
    const fetchFilteredFilms = async () => {
      try {
        let response;
        if (searchBy === "title") {
          response = await axios.get(
            `http://localhost:8000/api/films/search/${
              filmShowed - (filmShowed - 1)
            }/${filmShowed}`,
            {
              params: {
                title: searchText,
                filterData: Object.values(filterData),
              },
            }
          );
        } else {
          response = await axios.get(
            `http://localhost:8000/api/films/search/actor/${
              filmShowed - (filmShowed - 1)
            }/${filmShowed}`,
            {
              params: {
                name: searchText,
                filterData: Object.values(filterData),
              },
            }
          );
        }
        setFilms(response.data);
        setLoading(false);
      } catch (error) {
        console.error("There was an error fetching the filtered films!", error);
      }
    };

    const fetchFilms = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/films/range/${
            filmShowed - (filmShowed - 1)
          }/${filmShowed}`
        );
        setFilms(response.data);
        setLoading(false);
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      }
    };

    if (
      searchText !== "" ||
      Object.values(filterData).some((value) => value !== "")
    ) {
      fetchFilteredFilms();
    } else {
      fetchFilms();
    }
  }, [searchText, filmShowed, filterData]);

  const handleFilmClick = (id) => {
    navigate(`/MovieDetail/${id}`);
  };

  return (
    <>
      {films.length === 0 ? (
        <p className="text-2xl font-bold p-5">
          {loading ? "" : "No films found"}
        </p>
      ) : (
        (console.log(films.length),
        (<h1 className="text-4xl font-bold p-5">{sectionTitle}</h1>))
      )}
      <div className="grid grid-cols-5 gap-x-4 gap-y-24 mb-28 ">
        {location.pathname === "/search" &&
        (filterData.genre !== "" ||
          filterData.year !== "" ||
          filterData.country !== "" ||
          searchBy === "actor")
          ? films.slice(0, filmShowed).map((film) => (
              <div
                key={film.film_id}
                onClick={() => handleFilmClick(film.film_id)}
              >
                <FilmCard
                  key={film.film_id}
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
            ))
          : films.slice(0, filmShowed).map((film) => (
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
      {films.length >= filmShowed ? (
        <button
          className="bg-red-400 text-white font-bold py-2 px-4 w-1/6 rounded self-center mb-10"
          onClick={loadMore}
        >
          Load More
        </button>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default FilmList;
