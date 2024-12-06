import React, { useState, useRef, useEffect } from "react";
import MainSlider from "../components/MainSlider";
import FilmCard from "../components/FilmCard";
import FilmList from "../components/FilmList";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home({ filterData, searchText }) {
  let [scrollLeft, setScrollLeft] = useState(0);
  let [filmShowed, setFilmShowed] = useState(20);
  let [bookmarks, setBookmarks] = useState([]);
  let [rememberToken, setRememberToken] = useState("");
  let [expiry, setExpiry] = useState("");

  const containerRef = useRef(null);

  const navigate = useNavigate();

  const scrollMore = (direction) => {
    const container = containerRef.current;
    const containerScrollAmount = container.scrollWidth - container.clientWidth;
    if (direction === "right") {
      if (scrollLeft < containerScrollAmount) {
        setScrollLeft((prev) => prev + 300);
        container.scrollLeft += 300;
      }
    } else if (direction === "left") {
      if (scrollLeft > 0) {
        setScrollLeft((prev) => prev - 300);
        container.scrollLeft -= 300;
      }
    }
  };

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
          `https://webdev-production-2eb9.up.railway.app//api/bookmarks/${localStorage.getItem(
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
    <>
      <MainSlider />
      <section className="flex flex-col w-4/5 mx-auto mt-16 relative">
        {rememberToken && bookmarks.length !== 0 ? (
          <h1 className="text-4xl font-bold p-5">Watchlist</h1>
        ) : (
          <p></p>
        )}
        {rememberToken && bookmarks.length !== 0 ? (
          <div
            className="flex flex-row gap-4 scroll-smooth overflow-x-scroll no-scrollbar h-96"
            ref={containerRef}
          >
            <div
              title="btn-right"
              onClick={() => scrollMore("right")}
              role="button"
              className="absolute right-0 bottom-1/2 bg-zinc-400/50 rounded p-2 translate-y-1/4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h- text-white font-extrabold"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>

            <div
              title="btn-left"
              onClick={() => scrollMore("left")}
              role="button"
              className="absolute left-0 bottom-1/2 bg-zinc-400/50 rounded p-2 translate-y-1/4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h- text-white font-extrabold"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </div>

            {bookmarks.map((film) => (
              <FilmCard
                key={film.id}
                title={film.title}
                rating={film.rating}
                year={film.release_date}
                posterUrl={film.image}
              />
            ))}
          </div>
        ) : (
          <p></p>
        )}
      </section>

      <section className="flex flex-col w-4/5 mx-auto">
        <FilmList
          filterData={filterData}
          searchText={searchText}
          filmShowed={filmShowed}
          setFilmShowed={setFilmShowed}
          sectionTitle={"More Films"}
        />
      </section>
    </>
  );
}

export default React.memo(Home);
