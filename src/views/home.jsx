import React, { useState, useRef } from "react";
import MainSlider from "../components/MainSlider";
import FilmCard from "../components/FilmCard";

function Home() {
  let [scrollLeft, setScrollLeft] = useState(0);
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
            className="absolute right-0 bottom-1/2 bg-zinc-400/50 rounded p-2"
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
            className="absolute left-0 bottom-1/2 bg-zinc-400/50 rounded p-2"
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
          <FilmCard />
          <FilmCard />
          <FilmCard />
          <FilmCard />
          <FilmCard />
          <FilmCard />
          <FilmCard />
          <FilmCard />
          <FilmCard />
        </div>
      </section>

      <section className="flex flex-col w-4/5 mx-auto">
        <h1 className="text-4xl font-bold p-5">More</h1>
        <div className="grid grid-cols-5 gap-x-4 gap-y-24 mb-28">
          <FilmCard />
          <FilmCard />
          <FilmCard />
          <FilmCard />
          <FilmCard />
          <FilmCard />
          <FilmCard />
          <FilmCard />
          <FilmCard />
          <FilmCard />
        </div>
      </section>
    </>
  );
}

export default React.memo(Home);
