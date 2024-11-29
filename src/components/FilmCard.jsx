import React from "react";

export default function FilmCard({ title, rating, year, posterUrl }) {
  return (
    <div className="h-64 w-48 flex-shrink-0 p-2 group">
      <div className="relative overflow-hidden rounded-xl">
        <img
          className="w-full h-full mx-auto rounded-xl transform transition-transform duration-300 ease-in-out group-hover:scale-110"
          src={posterUrl}
          alt={title}
          loading="lazy"
        />
      </div>
      <p className="break-words mt-2">{rating} / 5</p>
      <p className="break-words">{title}</p>
      <p className="break-words">{year}</p>
    </div>
  );
}
