import React, { useState, useRef } from "react";
import MainSlider from "../components/MainSlider";
import FilmCard from "../components/FilmCard";
import FilmList from "../components/FilmList";
import film from "../assets/images/main-slider/dummy.json";

function Home({ filterData, searchText, setFilteredSum }) {
  let [scrollLeft, setScrollLeft] = useState(0);
  let [filmShowed, setFilmShowed] = useState(20);

  const containerRef = useRef(null);

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

  return (
    <>
      <MainSlider />
      <section className="flex flex-col w-4/5 mx-auto mt-16 relative">
        <h1 className="text-4xl font-bold p-5">Watchlist</h1>
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
          {film.slice(0, 10).map((film) => (
            <FilmCard
              key={film.id}
              title={film.title}
              rating={film.rating}
              year={film.year}
              image={film.image}
            />
          ))}
        </div>
      </section>

      <section className="flex flex-col w-4/5 mx-auto">
        <FilmList
          filterData={filterData}
          searchText={searchText}
          filmShowed={filmShowed}
          setFilmShowed={setFilmShowed}
          setFilteredSum={setFilteredSum}
          sectionTitle={"More Films"}
        />
      </section>
    </>
  );
}

export default React.memo(Home);
