import React, { useState, useEffect } from "react";
import axios from "axios";
import CMSTable from "../../components/CMSTable";

function Comments() {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("None");
  const [showCount, setShowCount] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/comments");
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const searchComments = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/search/comments", {
        params: { query: searchQuery }
      });
      setComments(response.data);
    } catch (error) {
      console.error("Error searching comments:", error);
    }
  };

  const deleteComment = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/comments/${id}`);
      setComments(comments.filter((comment) => comment.id !== id));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  // Fungsi untuk mengonversi nilai rate menjadi bintang
  const renderStars = (rate) => {
    return "★".repeat(rate) + "☆".repeat(5 - rate); // menampilkan bintang sesuai rating dari 1 hingga 5
  };

  return (
    <section className="w-full">
      <div className="flex flex-col w-3/4 mx-auto">
        {/* Filter and Show Controls */}
        <div className="flex items-center justify-between mb-6 p-4 bg-slate-100 rounded">
          <div className="flex gap-4 items-center">
            <span>Shows</span>
            <select
              value={showCount}
              onChange={(e) => setShowCount(e.target.value)}
              className="bg-slate-300 text-black px-3 py-1 rounded"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
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
          headers={["Username", "Rate", "Drama", "Comments", "Actions"]}
          datas={comments.slice(0, showCount).map((comment, index) => [
            comment.username,
            renderStars(comment.rate), // menampilkan rating sebagai bintang
            comment.film,
            comment.comment,
            <button
              className="text-red-600 hover:underline"
              onClick={() => deleteComment(comment.id)}
            >
              Delete
            </button>
          ])}
        />
      </div>
    </section>
  );
}

export default Comments;
