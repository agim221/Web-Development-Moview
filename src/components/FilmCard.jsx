import React from "react";
import film from "../assets/images/main-slider/download.jpeg";

export default function FilmCard({ title, rating, year, image }) {
  return (
    <>
      <div className="h-64 flex-shrink-0">
        <img className="w-full h-full mx-auto rounded-xl" src={film} alt="" />
        <p className="">{rating}</p>
        <p className="">{title}</p>
        <p className="">{year}</p>
      </div>
    </>
  );
}
