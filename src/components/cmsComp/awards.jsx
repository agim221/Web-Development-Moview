import React, { useState, useEffect } from "react";
import axios from "axios";
import CMSTable from "../../components/CMSTable";

function Awards() {
  const [awards, setAwards] = useState([]); // State untuk menyimpan data awards
  const [newYear, setNewYear] = useState(""); // State untuk input tahun
  const [newName, setNewName] = useState(""); // State untuk input name (award)
  const [editingAward, setEditingAward] = useState(null); // State untuk award yang sedang di-edit

  // Fetch data awards dari API
  useEffect(() => {
    fetchAwards();
  }, []);

  const fetchAwards = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/awards"); // Ganti URL sesuai dengan API
      setAwards(response.data); // Set data awards ke state
    } catch (error) {
      console.error("Error fetching awards:", error);
    }
  };

  // Tambah award baru
  const addAward = async () => {
    try {
      if (!newYear || !newName) return; // Validasi input kosong
      const response = await axios.post("http://localhost:8000/api/awards", {
        year: newYear,
        name: newName, // Gunakan name sesuai kolom di database
      });
      setAwards([...awards, response.data]); // Tambahkan award baru ke state
      setNewYear(""); // Reset input field
      setNewName(""); // Reset input field
    } catch (error) {
      console.error("Error adding award:", error);
    }
  };

  // Hapus award
  const deleteAward = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/awards/${id}`);
      setAwards(awards.filter((award) => award.id !== id)); // Filter award yang dihapus dari state
    } catch (error) {
      console.error("Error deleting award:", error);
    }
  };

  // Update award
  const updateAward = async (id) => {
    try {
      if (!editingAward) return; // Validasi input kosong
      await axios.put(`http://localhost:8000/api/awards/${id}`, {
        year: editingAward.year,
        name: editingAward.name, // Gunakan name sesuai kolom di database
      });
      setAwards(
        awards.map((award) =>
          award.id === id
            ? { ...award, year: editingAward.year, name: editingAward.name }
            : award
        )
      );
      setEditingAward(null); // Reset state editing
    } catch (error) {
      console.error("Error updating award:", error);
    }
  };

  // Set award untuk di-edit
  const startEditing = (award) => {
    setEditingAward({ ...award });
  };

  return (
    <section className="w-full">
      <div className="flex flex-col w-3/4 mx-auto">
        {/* Input tambah award */}
        <div className="flex flex-row mb-8 gap-4 bg-slate-100 p-2 rounded">
          <span className="text-sm self-center">Year</span>
          <input
            type="text"
            name="year"
            id="year"
            className="bg-slate-300 text-white ml-4"
            value={newYear}
            onChange={(e) => setNewYear(e.target.value)} // Set input year
          />
          <span className="text-sm self-center">Award Name</span>
          <input
            type="text"
            name="name"
            id="name"
            className="bg-slate-300 text-white ml-4"
            value={newName}
            onChange={(e) => setNewName(e.target.value)} // Set input name
          />
          <button
            className="bg-slate-300 text-white text-xs p-1 rounded hover:text-black hover:bg-white"
            onClick={addAward} // Tambah award
          >
            Add
          </button>
        </div>

        {/* Tabel award */}
        <CMSTable
          headers={["ID", "Year", "Award Name", "Action"]}
          datas={awards.map((award) => [
            award.id,
            editingAward && editingAward.id === award.id ? (
              <input
                type="text"
                value={editingAward.year}
                onChange={(e) =>
                  setEditingAward({ ...editingAward, year: e.target.value })
                }
              />
            ) : (
              award.year
            ),
            editingAward && editingAward.id === award.id ? (
              <input
                type="text"
                value={editingAward.name}
                onChange={(e) =>
                  setEditingAward({ ...editingAward, name: e.target.value })
                }
              />
            ) : (
              award.name // Gunakan name sesuai kolom di database
            ),
            <>
              {editingAward && editingAward.id === award.id ? (
                <>
                  <button
                    className="hover:underline"
                    onClick={() => updateAward(award.id)}
                  >
                    Save
                  </button>
                  <button
                    className="hover:underline ml-2"
                    onClick={() => setEditingAward(null)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="hover:underline"
                    onClick={() => startEditing(award)}
                  >
                    Edit
                  </button>
                  <span className="mx-2">|</span>
                  <button
                    className="hover:underline"
                    onClick={() => deleteAward(award.id)}
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

export default Awards;
