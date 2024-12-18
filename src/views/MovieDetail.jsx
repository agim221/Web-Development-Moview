import React, { useCallback, useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import Comment from "../components/Comment";
import { useParams } from "react-router-dom";
import axios from "axios"; // Untuk melakukan fetching data
import { useNavigate } from "react-router-dom";
import { Circles } from "react-loading-icons"; // Import Circles

export default function MovieDetail() {
  const [isOpen, setIsOpen] = useState("-translate-y-full");
  const [scrollLeft, setScrollLeft] = useState(0);
  const navigate = useNavigate();

  const { id } = useParams(); // Mengambil ID dari URL
  const [film, setFilm] = useState(null); // State untuk menyimpan data film
  const [actors, setActors] = useState([]); // State untuk menyimpan data aktor
  const [loading, setLoading] = useState(true); // State untuk status loading
  const [error, setError] = useState(null); // State untuk error handling
  const [comments, setComments] = useState([]); // State untuk menyimpan data komentar film
  const [comment, setComment] = useState(""); // State untuk menyimpan komentar yang diinput
  const [rating, setRating] = useState(5); // State untuk menyimpan rating yang diinput
  const [genres, setGenres] = useState([]); // State untuk menyimpan data genre film
  const [isBookmarked, setIsBookmarked] = useState(false);

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
        `https://webdev-production-2eb9.up.railway.app/api/films_detail/${id}`
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
        `https://webdev-production-2eb9.up.railway.app/api/films_detail/${id}/actors`
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
        `https://webdev-production-2eb9.up.railway.app/api/films_detail/${id}/comments`
      );
      console.log("comments", response.data);
      setComments(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching comments:", error);
      setError("Failed to load comments.");
      setLoading(false);
    }
  }, [id]);

  const fetchGenres = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://webdev-production-2eb9.up.railway.app/api/films_detail/${id}/genres`
      );
      setGenres(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching genres:", error);
      setError("Failed to load genres.");
      setLoading(false);
    }
  }, [id]);

  const checkBookmark = useCallback(async () => {
    const data = {
      remember_token: localStorage.getItem("remember_token"),
      film_id: id,
    };

    try {
      const response = await axios.post(
        "https://webdev-production-2eb9.up.railway.app/api/bookmarks/check",
        data
      );
      setIsBookmarked(response.data.exists);
    } catch (error) {
      console.error("Error checking bookmark:", error);
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
      await axios.post(
        "https://webdev-production-2eb9.up.railway.app/api/add-comments",
        data
      );
      fetchComments();
      setComment("");
      setRating(5);
    } catch (error) {
      if (error.response.status === 400) {
        alert("You have already submitted a comment for this film.");
      } else if (error.response.status === 422) {
        alert("You need to login to submit a comment.");
        navigate("/login");
      } else {
        console.error("Error submitting comment:", error);
      }
    } finally {
      fetchFilm();
    }
  };

  const handleAddBookmark = async () => {
    const data = {
      remember_token: localStorage.getItem("remember_token"),
      film_id: id,
    };

    try {
      await axios.post(
        "https://webdev-production-2eb9.up.railway.app/api/bookmarks",
        data
      );
      setIsBookmarked(true);
      alert("Film added to bookmarks!");
    } catch (error) {
      console.error("Error adding bookmark:", error);
      alert("Failed to add bookmark.");
    }
  };

  const handleRemoveBookmark = async () => {
    const data = {
      remember_token: localStorage.getItem("remember_token"),
      film_id: id,
    };

    try {
      await axios.post(
        "https://webdev-production-2eb9.up.railway.app/api/bookmarks/remove",
        data
      );
      setIsBookmarked(false);
      alert("Film removed from bookmarks!");
    } catch (error) {
      console.error("Error removing bookmark:", error);
      alert("Failed to remove bookmark.");
    }
  };

  useEffect(() => {
    fetchGenres();
    fetchComments();
    fetchActor();
    fetchFilm();
    checkBookmark();
  }, [id, fetchGenres, fetchComments, fetchActor, fetchFilm, checkBookmark]); // Tambahkan depedensi fungsi

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Circles
          height="80"
          width="80"
          fill="#BCCFC0"
          stroke="#0a0a0a"
          aria-label="loading"
        />
      </div>
    ); // Tampilkan Circles saat loading
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>; // Tampilkan pesan error
  }

  if (!film) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Circles
          height="80"
          width="80"
          fill="#BCCFC0"
          stroke="#0a0a0a"
          aria-label="loading"
        />
      </div>
    );
  }

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
              {Array.isArray(genres) &&
                genres.map((genre) => genre.genre.name).join(", ")}
            </p>
            <p className="text-gray-700 mb-2">Rating: {film.rating}/5</p>
            <p className="text-gray-700">Availability: {film.availability}</p>
            {isBookmarked ? (
              <button
                onClick={handleRemoveBookmark}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 mt-4"
              >
                Remove Watchlist
              </button>
            ) : (
              <button
                onClick={handleAddBookmark}
                className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 mt-4"
              >
                Add to Watchlist
              </button>
            )}
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
