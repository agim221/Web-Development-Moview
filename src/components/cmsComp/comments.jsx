import React, { useState, useEffect } from "react";
import axios from "axios";
import CMSTable from "../../components/CMSTable";

function Comments() {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchComments();
  }, [filter]);

  const fetchComments = async () => {
    try {
      let response;
      if (filter === "approved") {
        response = await axios.get(
          "https://webdev-production-2eb9.up.railway.app//api/comments/approved"
        );
      } else if (filter === "unapproved") {
        response = await axios.get(
          "https://webdev-production-2eb9.up.railway.app//api/comments/unapproved"
        );
      } else {
        response = await axios.get(
          "https://webdev-production-2eb9.up.railway.app//api/comments"
        );
      }
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const searchComments = async () => {
    try {
      const response = await axios.get(
        "https://webdev-production-2eb9.up.railway.app//api/search/comments",
        {
          params: { query: searchQuery },
        }
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error searching comments:", error);
    }
  };

  const deleteComment = async (id) => {
    try {
      await axios.delete(
        `https://webdev-production-2eb9.up.railway.app//api/comments/${id}`
      );
      setComments(comments.filter((comment) => comment.id !== id));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const approveComment = async (id) => {
    try {
      await axios.put(
        `https://webdev-production-2eb9.up.railway.app//api/comments/approve/${id}`
      );
      setComments(
        comments.map((comment) =>
          comment.id === id ? { ...comment, is_approved: true } : comment
        )
      );
    } catch (error) {
      console.error("Error approving comment:", error);
    }
  };

  // Fungsi untuk mengonversi nilai rate menjadi bintang
  const renderStars = (rate) => {
    return "★".repeat(rate) + "☆".repeat(5 - rate); // menampilkan bintang sesuai rating dari 1 hingga 5
  };

  return (
    <section className="w-full">
      <div className="flex flex-col w-3/4 mx-auto h-[900px] overflow-y-scroll">
        {/* Filter Controls */}
        <div className="flex items-center justify-between mb-6 p-4 bg-slate-100 rounded">
          <div className="flex gap-4 items-center">
            <span>Filter</span>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-slate-300 text-black px-3 py-1 rounded"
            >
              <option value="all">All</option>
              <option value="approved">Approved</option>
              <option value="unapproved">Unapproved</option>
            </select>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center mb-6 p-4 bg-slate-100 rounded">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search comments..."
            className="w-full px-3 py-2 bg-white rounded"
          />
          <button
            className="ml-4 bg-slate-500 text-white text-xs px-3 py-1 rounded hover:bg-slate-600"
            onClick={searchComments}
          >
            Search
          </button>
        </div>

        {/* Comments Table */}
        <CMSTable
          headers={[
            "Username",
            "Rate",
            "Drama",
            "Comments",
            "Approved",
            "Actions",
          ]}
          datas={comments.map((comment, index) => [
            comment.user.username,
            renderStars(comment.rating), // menampilkan rating sebagai bintang
            comment.films.title,
            comment.comment,
            comment.is_approved ? "Yes" : "No", // Menampilkan status approved
            <div className="flex gap-2">
              {!comment.is_approved && (
                <button
                  className="bg-green-500 text-white text-xs px-3 py-1 rounded hover:bg-green-600"
                  onClick={() => approveComment(comment.id)}
                >
                  Approve
                </button>
              )}
              <button
                className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600"
                onClick={() => deleteComment(comment.id)}
              >
                Delete
              </button>
            </div>,
          ])}
        />
      </div>
    </section>
  );
}

export default Comments;
