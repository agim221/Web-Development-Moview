import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FilmCard from "../components/FilmCard";

function Bookmarks({ filterData, searchText }) {
  const [filmShowed, setFilmShowed] = useState(30);
  const [bookmarks, setBookmarks] = useState([]);
  const [rememberToken, setRememberToken] = useState("");
  const [expiry, setExpiry] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setRememberToken(localStorage.getItem("remember_token"));
    setExpiry(localStorage.getItem("remember_token_expiry"));

    if (rememberToken && expiry) {
      const now = new Date();
      const expiryDate = new Date(expiry);

      if (now > expiryDate) {
        localStorage.removeItem("remember_token");
        localStorage.removeItem("remember_token_expiry");
      } else {
        // Token is still valid, proceed with login
        navigate("/");
      }
    }
  }, [navigate]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!rememberToken) {
        return;
      }

      try {
        const response = await axios.get(
          `https://webdev-production-2eb9.up.railway.app/api/bookmarks/${localStorage.getItem(
            "remember_token"
          )}`
        );
        setBookmarks(response.data);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      }
    };

    fetchBookmarks();
  }, [rememberToken]);

  return (
    <section className="flex flex-col w-4/5 mx-auto">
      <h1 className="text-4xl font-bold p-5">Bookmarks</h1>
      <div className="grid grid-cols-5 gap-x-4 gap-y-24 mb-28">
        {bookmarks.length === 0 ? (
          <p className="text-2xl font-bold p-5">No bookmarks found</p>
        ) : (
          (() => {
            const items = [];
            for (let i = 0; i < Math.min(bookmarks.length, filmShowed); i++) {
              const film = bookmarks[i];
              items.push(
                <div
                  key={i}
                  className="flex flex-col items-center cursor-pointer"
                  onClick={() => navigate(`/MovieDetail/${film.id}`)}
                >
                  <FilmCard
                    title={film.title}
                    rating={film.rating}
                    year={film.release_date}
                    posterUrl={film.image}
                  />
                </div>
              );
            }
            return items;
          })()
        )}
      </div>
      {bookmarks.length >= filmShowed && (
        <button
          className="bg-red-400 text-white font-bold py-2 px-4 w-1/6 rounded self-center mb-10"
          onClick={() => setFilmShowed(filmShowed + 30)}
        >
          Load More
        </button>
      )}
    </section>
  );
}

export default Bookmarks;
