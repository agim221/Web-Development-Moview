import React, { useState } from "react";
import 'tailwindcss/tailwind.css';
import Comment from "../components/Comment";
import { useParams } from "react-router-dom";
import films from "../assets/images/main-slider/dummy.json";
import image from "../assets/images/main-slider/download.jpeg";

export default function MovieDetail() {
  let [isOpen, setIsOpen] = useState("-translate-y-full");
  let [scrollLeft, setScrollLeft] = useState(0);

  const { id } = useParams();
  const film = films.find((film) => film.id === parseInt(id));

  if (!film) {
    return <p>Film not found</p>;
  }

  const toggleFilterBar = () => {
    setIsOpen((prev) =>
      prev === "-translate-y-full" ? "translate-y-0" : "-translate-y-full"
    );
  };

  const scrollMore = (direction) => {
    const container = document.querySelector(".watch-list");
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
      {/* Main Content */}
      <main className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Poster */}
          <div className="lg:col-span-1">
            <img src={film.image} alt={film.title} className="bg-gray-200 h-80 rounded-lg" />
          </div>

          {/* Drama Information */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-4">{film.title}</h2>
            <p className="text-sm text-gray-600 mb-2">Other titles: {Array.isArray(film.otherTitles) ? film.otherTitles.join(", ") : film.otherTitles}</p>
            <p className="text-sm text-gray-600 mb-2">Year: {film.year}</p>
            <p className="text-gray-700 mb-4">{film.description}</p>
            <p className="text-gray-700 mb-2">Genres: {Array.isArray(film.genre) ? film.genre.join(", ") : film.genre}</p>
            <p className="text-gray-700 mb-2">Rating: {film.rating}/5</p>
            <p className="text-gray-700">Availability: {film.availability}</p>
          </div>
        </div>

        {/* Actor List */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {Array.isArray(film.actors) && film.actors.map((actor, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="bg-gray-200 h-24 w-24 rounded-lg"></div>
              <div className="text-center mt-2">{actor}</div>
            </div>
          ))}
        </div>

        {/* Video Section */}
        <div className="mt-8 bg-gray-200 h-64 rounded-lg flex items-center justify-center">
          <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm-2-11.5v7l6-3.5-6-3.5z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {/* Comments Section */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">({Array.isArray(film.comments) ? film.comments.length : 0}) People think about this drama</h3>
            <div className="flex items-center space-x-2">
              <span className="text-gray-700">Filtered by:</span>
              <select className="border border-gray-300 rounded py-2 px-4">
                <option value="all">All Reviews</option>
                <option value="5">★★★★★</option>
                <option value="4">★★★★☆</option>
                <option value="3">★★★☆☆</option>
                <option value="2">★★☆☆☆</option>
                <option value="1">★☆☆☆☆</option>
              </select>
              <button className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600">
                Filter
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {Array.isArray(film.comments) && film.comments.map((comment, idx) => (
              <Comment key={idx} name={comment.name} date={comment.date} rating={comment.rating} comment={comment.comment} />
            ))}
          </div>
        </div>

        {/* Add Comment Section */}
        <div className="mt-8">
          <h3 className="text-lg font-bold mb-4">Add yours!</h3>
          <form className="space-y-4">
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="Name"
                className="w-1/3 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <select className="w-1/3 border border-gray-300 rounded py-2 px-4">
                <option value="5">★★★★★</option>
                <option value="4">★★★★☆</option>
                <option value="3">★★★☆☆</option>
                <option value="2">★★☆☆☆</option>
                <option value="1">★☆☆☆☆</option>
              </select>
            </div>
            <textarea
              placeholder="Your thoughts"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            ></textarea>
            <div className="text-sm text-gray-500">You can only submit your comment once.</div>
            <button
              type="submit"
              className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
            >
              Submit
            </button>
          </form>
        </div>
      </main>
    </>
  );
}