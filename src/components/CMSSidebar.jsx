import React from "react";

function CMSSidebar({ onViewChange, view }) {
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("remember_token");
    localStorage.removeItem("remember_token_expiry");
    window.location.href = "/";
  };

  return (
    <aside className="w-64 h-screen bg-gray-800 text-white flex flex-col p-4">
      <h2 className="text-2xl font-semibold mb-6">Moview</h2>

      <nav className="flex-1 space-y-4">
        <div className="mb-4">
          <h3 className="text-lg font-medium">Dramas</h3>
          <ul className="ml-4 space-y-2">
            <li>
              <button
                onClick={() => onViewChange("validate")}
                className={`w-full text-left p-2 rounded hover:bg-gray-700 ${
                  view === "validate" && "bg-gray-700"
                }`}
              >
                Validate
              </button>
            </li>
            <li>
              <button
                onClick={() => onViewChange("input")}
                className={`w-full text-left p-2 rounded hover:bg-gray-700 ${
                  view === "input" && "bg-gray-700"
                }`}
              >
                Input New Drama
              </button>
            </li>
          </ul>
        </div>

        <button
          onClick={() => onViewChange("film")}
          className={`w-full text-left p-2 rounded hover:bg-gray-700 ${
            view === "film" && "bg-gray-700"
          }`}
        >
          Films
        </button>

        <button
          onClick={() => onViewChange("countries")}
          className={`w-full text-left p-2 rounded hover:bg-gray-700 ${
            view === "countries" && "bg-gray-700"
          }`}
        >
          Countries
        </button>

        <button
          onClick={() => onViewChange("awards")}
          className={`w-full text-left p-2 rounded hover:bg-gray-700 ${
            view === "awards" && "bg-gray-700"
          }`}
        >
          Awards
        </button>

        <button
          onClick={() => onViewChange("genres")}
          className={`w-full text-left p-2 rounded hover:bg-gray-700 ${
            view === "genres" && "bg-gray-700"
          }`}
        >
          Genres
        </button>

        <button
          onClick={() => onViewChange("actors")}
          className={`w-full text-left p-2 rounded hover:bg-gray-700 ${
            view === "actors" && "bg-gray-700"
          }`}
        >
          Actors
        </button>

        <button
          onClick={() => onViewChange("comments")}
          className={`w-full text-left p-2 rounded hover:bg-gray-700 ${
            view === "comments" && "bg-gray-700"
          }`}
        >
          Comments
        </button>

        <button
          onClick={() => onViewChange("users")}
          className={`w-full text-left p-2 rounded hover:bg-gray-700 ${
            view === "users" && "bg-gray-700"
          }`}
        >
          Users
        </button>
      </nav>

      <button
        onClick={handleLogout}
        className="mt-auto w-full p-2 rounded bg-red-600 hover:bg-red-700"
      >
        Logout
      </button>
    </aside>
  );
}

export default CMSSidebar;
