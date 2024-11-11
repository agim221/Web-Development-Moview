import React, { useState, useEffect } from "react";
import axios from "axios";
import CMSTable from "../../components/CMSTable";

function Genres() {
  const [genres, setGenres] = useState([]);
  const [newGenre, setNewGenre] = useState("");
  const [editingGenre, setEditingGenre] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/genres");
      setGenres(response.data);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  const searchGenres = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/search/genres", {
        params: { query: searchQuery }
      });
      setGenres(response.data);
    } catch (error) {
      console.error("Error searching genres:", error);
    }
  };

  const addGenre = async () => {
    try {
      if (!newGenre) return;
      const response = await axios.post("http://localhost:8000/api/genres", {
        name: newGenre,
      });
      setGenres([...genres, response.data]);
      setNewGenre("");
    } catch (error) {
      console.error("Error adding genre:", error);
    }
  };

  const deleteGenre = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/genres/${id}`);
      setGenres(genres.filter((genre) => genre.id !== id));
    } catch (error) {
      console.error("Error deleting genre:", error);
    }
  };

  const updateGenre = async (id) => {
    try {
      if (!editingGenre) return;
      await axios.put(`http://localhost:8000/api/genres/${id}`, {
        name: editingGenre.name,
      });
      setGenres(
        genres.map((genre) =>
          genre.id === id ? { ...genre, name: editingGenre.name } : genre
        )
      );
      setEditingGenre(null);
    } catch (error) {
      console.error("Error updating genre:", error);
    }
  };

  const startEditing = (genre) => {
    setEditingGenre({ ...genre });
  };

  return (
    <section className="w-full h-[850px] overflow-y-scroll">
      <div className="flex flex-col w-3/4 mx-auto">
        {/* Input for Adding Genre */}
        <div className="flex items-center mb-6 p-4 bg-slate-100 rounded">
          <label htmlFor="genre" className="mr-4 text-sm font-medium">
            Genre:
          </label>
          <input
            type="text"
            id="genre"
            className="flex-1 bg-slate-300 text-black px-3 py-1 rounded"
            value={newGenre}
            onChange={(e) => setNewGenre(e.target.value)}
          />
          <button
            className="ml-4 bg-slate-500 text-white text-xs px-3 py-1 rounded hover:bg-slate-600"
            onClick={addGenre}
          >
            Submit
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex items-center mb-6 p-4 bg-slate-100 rounded">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search genres..."
            className="w-full px-3 py-2 bg-white rounded"
          />
          <button
            className="ml-4 bg-slate-500 text-white text-xs px-3 py-1 rounded hover:bg-slate-600"
            onClick={searchGenres}
          >
            Search
          </button>
        </div>

        {/* Genres Table */}
        <CMSTable
          headers={["No", "Genre", "Actions"]}
          datas={genres.map((genre, index) => [
            index + 1,
            editingGenre && editingGenre.id === genre.id ? (
              <input
                type="text"
                value={editingGenre.name}
                onChange={(e) =>
                  setEditingGenre({ ...editingGenre, name: e.target.value })
                }
                className="bg-slate-200 p-1 text-black rounded w-full"
              />
            ) : (
              <span className="block p-1">{genre.name}</span>
            ),
            <div className="flex gap-2">
              {editingGenre && editingGenre.id === genre.id ? (
                <>
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => updateGenre(genre.id)}
                  >
                    Save
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => setEditingGenre(null)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => startEditing(genre)}
                  >
                    Rename
                  </button>
                  <span>|</span>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => deleteGenre(genre.id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>,
          ])}
        />
      </div>
    </section>
  );
}

export default Genres;
