import React, { useCallback, useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import Comment from "../components/Comment";
import { useParams } from "react-router-dom";
import axios from "axios"; // Untuk melakukan fetching data

export default function MovieDetail() {
  let [isOpen, setIsOpen] = useState("-translate-y-full");
  let [scrollLeft, setScrollLeft] = useState(0);

  const { id } = useParams(); // Mengambil ID dari URL
  const [film, setFilm] = useState(null); // State untuk menyimpan data film
  const [actors, setActors] = useState([]); // State untuk menyimpan data aktor
  const [loading, setLoading] = useState(true); // State untuk status loading
  const [error, setError] = useState(null); // State untuk error handling
  const [comments, setComments] = useState([]); // State untuk menyimpan data komentar film
  const [comment, setComment] = useState(""); // State untuk menyimpan komentar yang diinput
  const [rating, setRating] = useState(5); // State untuk menyimpan rating yang diinput

  const formatDate = useCallback((dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }, []);

  const fetchFilm = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/films_detail/${id}`
      );
      setFilm(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching film details:", error);
      setError("Failed to load film details.");
      setLoading(false);
    }
  }, [id]);

  const fetchActor = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/films_detail/${id}/actors`
      );
      setActors(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching actor details:", error);
      setError("Failed to load actor details.");
      setLoading(false);
    }
  }, [id]);

  const fetchComments = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/films_detail/${id}/comments`
      );
      setComments(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching comments:", error);
      setError("Failed to load comments.");
      setLoading(false);
    }
  }, [id]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    const form = e.target;

    const data = {
      remember_token: localStorage.getItem("remember_token"),
      film_id: id,
      rating: rating,
      comment: comment,
    };

    try {
      await axios.post("http://localhost:8000/api/add-comments", data);
      fetchComments();
      setComment("");
      setRating(5);
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  useEffect(() => {
    fetchComments();
    fetchActor();
    fetchFilm();
  }, [id]); // useEffect akan berjalan setiap kali id berubah

  if (loading) {
    return <p>Loading...</p>; // Tampilkan pesan loading ketika data belum siap
  }

  if (error) {
    return <p>{error}</p>; // Tampilkan pesan error jika gagal fetching
  }

  if (!film) {
    return <p>Film not found</p>; // Tampilkan pesan jika film tidak ditemukan
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
            <img
              src={film.image} // Gunakan gambar dari data film atau gambar default
              alt={film.title}
              className="bg-gray-200 h-80 rounded-lg"
            />
          </div>

          {/* Drama Information */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-4">{film.title}</h2>
            <p className="text-sm text-gray-600 mb-2">
              Other titles:{" "}
              {Array.isArray(film.otherTitles)
                ? film.otherTitles.join(", ")
                : film.otherTitles}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              Year: {film.release_date}
            </p>
            <p className="text-gray-700 mb-4">{film.description}</p>
            <p className="text-gray-700 mb-2">
              Genres:{" "}
              {Array.isArray(film.genre) ? film.genre.join(", ") : film.genre}
            </p>
            <p className="text-gray-700 mb-2">Rating: {film.rating}/10</p>
            <p className="text-gray-700">Availability: {film.availability}</p>
          </div>
        </div>

        <div className="text-center mt-8">
          <h2 className="text-2xl font-bold">Actor</h2>
        </div>
        {/* Actor List */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {Array.isArray(actors) &&
            actors.map((actor, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <img
                  src={actor.photo_url}
                  alt={actor.name}
                  className="h-32 w-24 rounded-lg"
                />
                <div className="text-center mt-2">{actor.name}</div>
              </div>
            ))}
        </div>

        {/* Video Section */}
        <div
          className="mt-8 bg-gray-200 h-64 rounded-lg flex items-center justify-center"
          style={{ height: "609px" }}
        >
          {film.trailer ? (
            <iframe
              width="100%"
              height="100%"
              src={film.trailer}
              title={film.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <svg
              className="w-16 h-16 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm-2-11.5v7l6-3.5-6-3.5z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>

        {/* Comments Section */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">
              ({comments.length}) People think about this drama
            </h3>
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
            {comments.map((comment, idx) => (
              <Comment
                key={idx}
                name={comment.user.username}
                date={formatDate(comment.created_at)}
                rating={comment.rating}
                comment={comment.comment}
              />
            ))}
          </div>
        </div>

        {/* Add Comment Section */}
        <div className="mt-8">
          <h3 className="text-lg font-bold mb-4">Add yours!</h3>
          <form className="space-y-4" onSubmit={handleSubmitComment}>
            <div className="flex space-x-4">
              <select
                className="w-1/3 border border-gray-300 rounded py-2 px-4"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
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
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <div className="text-sm text-gray-500">
              You can only submit your comment once.
            </div>
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
