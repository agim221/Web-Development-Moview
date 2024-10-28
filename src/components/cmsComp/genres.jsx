import React, { useState, useEffect } from "react";
import axios from "axios";
import CMSTable from "../../components/CMSTable";

function Genres() {
  const [genres, setGenres] = useState([]); // State untuk menyimpan daftar genres
  const [newGenre, setNewGenre] = useState(""); // State untuk input genre baru
  const [editingGenre, setEditingGenre] = useState(null); // State untuk genre yang sedang di-edit

  // Fetch genres dari API
  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/genres"); // Ganti URL dengan API backend kamu
      setGenres(response.data); // Set data genres ke state
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  // Tambah genre baru
  const addGenre = async () => {
    try {
      if (!newGenre) return; // Validasi input
      const response = await axios.post("http://localhost:8000/api/genres", {
        name: newGenre,
      });
      setGenres([...genres, response.data]); // Tambah genre ke state
      setNewGenre(""); // Reset input
    } catch (error) {
      console.error("Error adding genre:", error);
    }
  };

  // Hapus genre
  const deleteGenre = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/genres/${id}`);
      setGenres(genres.filter((genre) => genre.id !== id)); // Update state setelah hapus
    } catch (error) {
      console.error("Error deleting genre:", error);
    }
  };

  // Update genre
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
      setEditingGenre(null); // Reset state edit
    } catch (error) {
      console.error("Error updating genre:", error);
    }
  };

  // Set genre yang akan di-edit
  const startEditing = (genre) => {
    setEditingGenre({ ...genre });
  };

  return (
    <section className="w-full">
      <div className="flex flex-col w-3/4 mx-auto">
        {/* Input tambah genre */}
        <div className="flex flex-row mb-8 gap-4 bg-slate-100 p-2 rounded">
          <span className="text-sm self-center">Genre</span>
          <input
            type="text"
            name="genre"
            id="genre"
            className="bg-slate-300 text-white ml-4"
            value={newGenre}
            onChange={(e) => setNewGenre(e.target.value)} // Set input genre
          />
          <button
            className="bg-slate-300 text-white text-xs p-1 rounded hover:text-black hover:bg-white"
            onClick={addGenre} // Tambah genre
          >
            Submit
          </button>
        </div>

        {/* Tabel genres */}
        <CMSTable
          headers={["ID", "Genre", "Action"]}
          datas={genres.map((genre) => [
            genre.id,
            editingGenre && editingGenre.id === genre.id ? (
              <input
                type="text"
                value={editingGenre.name}
                onChange={(e) =>
                  setEditingGenre({ ...editingGenre, name: e.target.value })
                }
              />
            ) : (
              genre.name
            ),
            <>
              {editingGenre && editingGenre.id === genre.id ? (
                <>
                  <button
                    className="hover:underline"
                    onClick={() => updateGenre(genre.id)}
                  >
                    Save
                  </button>
                  <button
                    className="hover:underline ml-2"
                    onClick={() => setEditingGenre(null)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="hover:underline"
                    onClick={() => startEditing(genre)}
                  >
                    Rename
                  </button>
                  <span className="mx-2">|</span>
                  <button
                    className="hover:underline"
                    onClick={() => deleteGenre(genre.id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </>,
          ])}
        />
      </div>
    </section>
  );
}

export default Genres;
