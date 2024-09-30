import React, { useState } from "react";
import CMSTable from "../../components/CMSTable"; // menyesuaikan path komponen CMSTable



function Comments() {
  const [commentsData, setCommentsData] = useState([
    {
      username: "Nasu",
      rating: 5,
      drama: "[2023] Japan - Live Love You",
      comment:
        "I love this drama. It taught me a lot about money and finance. Love is not everything, it’s also about how we handle money. Setting plot is in the real life. What the most thing that I love is about the kindness. Having money is perfect.",
      status: "Unapproved",
    },
    {
      username: "Luffy",
      rating: 2,
      drama: "[2023] Japan - Live Love You",
      comment: "Meh",
      status: "Approved",
    },
  ]);

  const handleDelete = (username) => {
    setCommentsData(commentsData.filter((comment) => comment.username !== username));
  };

  const handleApprove = (username) => {
    setCommentsData(
      commentsData.map((comment) =>
        comment.username === username
          ? { ...comment, status: "Approved" }
          : comment
      )
    );
  };

  function actions(username, status) {
    return (
      <>
        <td>
          <button
            onClick={() => handleApprove(username)}
            className={`hover:underline ${
              status === "Approved" ? "text-gray-500 cursor-not-allowed" : ""
            }`}
            disabled={status === "Approved"}
          >
            Approve
          </button>
          <span className=""> | </span>
          <button onClick={() => handleDelete(username)} className="hover:underline">
            Delete
          </button>
        </td>
      </>
    );
  }

  return (
    <section className="w-full">
      <div className="flex flex-col w-full mx-auto">
        <div className="flex flex-row mb-8 gap-4 bg-slate-100 p-2 rounded">
          <span className="text-sm self-center">Filter by Status</span>
          <select className="bg-slate-300 text-white ml-4">
            <option value="None">None</option>
            <option value="Approved">Approved</option>
            <option value="Unapproved">Unapproved</option>
          </select>
        </div>
        <CMSTable
          headers={["", "Username", "Rating", "Drama", "Comment", "Status", "Action"]}
          datas={commentsData.map((comment, index) => [
            index + 1,
            comment.username,
            <span>{Array(comment.rating).fill("★").join(" ")}</span>, // Menampilkan rating
            comment.drama,
            comment.comment,
            <span
              className={`px-2 py-1 rounded ${
                comment.status === "Unapproved" ? "bg-red-200" : "bg-green-200"
              }`}
            >
              {comment.status}
            </span>,
            actions(comment.username, comment.status),
          ])}
        ></CMSTable>
      </div>
    </section>
  );
}

export default Comments;
