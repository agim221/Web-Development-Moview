import React from "react";

export default function FilmCard({ title, rating, year, posterUrl }) {
  return (
    <div className="h-64 w-48 flex-shrink-0 p-2">
      <img
        className="w-full h-full mx-auto rounded-xl"
        src={posterUrl}
        alt=""
      />
      <p className="break-words">{rating}</p>
      <p className="break-words">{title}</p>
      <p className="break-words">{year}</p>
    </div>
  );
}
