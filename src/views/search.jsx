import React from "react";
import FilmCard from "../components/FilmCard";

function search() {
  return (
    <>
      <section className="flex flex-col w-4/5 mx-auto">
        <h1 className="text-4xl font-bold p-5">Search</h1>
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

export default React.memo(search);
