import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import CMSTable from "../../components/CMSTable"; // Adjusted component path if needed

function Comments() {
  const [commentsData, setCommentsData] = useState([]);
  const [filterStatus, setFilterStatus] = useState("None");

  // Fetching comments with callback
  const fetchCommentsUnapproved = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/comments/unapproved"
      );
      console.log("unapproved comments", response.data);
      setCommentsData(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }, []);

  const fetchCommentsApproved = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/comments/approved"
      );
      console.log("approved comments", response.data);
      setCommentsData(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }, []);

  const fetchAllComments = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/comments");
      console.log("all comments", response.data);
      setCommentsData(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }, []);

  useEffect(() => {
    if (filterStatus === "Unapproved") {
      fetchCommentsUnapproved();
    } else if (filterStatus === "Approved") {
      fetchCommentsApproved();
    } else {
      fetchAllComments();
    }
  }, [filterStatus]);

  // Filter comments based on approval status
  const filteredComments = commentsData.filter(
    (comment) =>
      filterStatus === "None" ||
      (filterStatus === "Approved" && comment.is_approved) ||
      (filterStatus === "Unapproved" && !comment.is_approved)
  );

  // Approve and delete actions
  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:8000/api/comments/approve/${id}`);
      setCommentsData((prevData) =>
        prevData.map((comment) =>
          comment.id === id ? { ...comment, is_approved: true } : comment
        )
      );
    } catch (error) {
      console.error("Error approving comment:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/comments/${id}`);
      setCommentsData((prevData) =>
        prevData.filter((comment) => comment.id !== id)
      );
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  // Actions for each comment row
  function renderActions(comment) {
    return (
      <td className="text-center">
        <button
          onClick={() => handleApprove(comment.id)}
          className={`text-blue-500 hover:underline mr-2 ${
            comment.is_approved ? "text-gray-400 cursor-not-allowed" : ""
          }`}
          disabled={comment.is_approved}
        >
          Approve
        </button>
        <button
          onClick={() => handleDelete(comment.id)}
          className="text-red-500 hover:underline"
        >
          Delete
        </button>
      </td>
    );
  }

  return (
    <section className="w-full p-4">
      <div className="flex flex-col w-11/12 h-[900px] overflow-y-scroll mx-auto bg-white rounded-lg shadow-lg p-4">
        {/* Filter by Status */}
        <div className="flex items-center mb-6">
          <label className="mr-4 font-semibold text-gray-600">
            Filter by Status
          </label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-slate-200 text-gray-700 p-2 rounded-md"
          >
            <option value="None">All</option>
            <option value="Approved">Approved</option>
            <option value="Unapproved">Unapproved</option>
          </select>
        </div>

        {/* Comments Table */}
        <CMSTable
          headers={[
            "No",
            "Username",
            "Rating",
            "Film Title",
            "Comment",
            "Status",
            "Actions",
          ]}
          datas={filteredComments.map((comment, index) => [
            index + 1, // Row number
            comment.user.username, // Username
            <span>
              {Array(parseInt(comment.rating, 10)).fill("★").join(" ")}
            </span>, // Stars for rating
            <span className="font-semibold">{comment.films.title}</span>, // Film title
            <span className="italic">{comment.comment}</span>, // Comment text
            <span
              className={`px-2 py-1 rounded ${
                comment.is_approved
                  ? "bg-green-200 text-green-800"
                  : "bg-red-200 text-red-800"
              }`}
            >
              {comment.is_approved ? "Approved" : "Unapproved"}
            </span>, // Status badge
            renderActions(comment), // Actions (Approve/Delete buttons)
          ])}
        />
      </div>
    </section>
  );
}

export default Comments;
