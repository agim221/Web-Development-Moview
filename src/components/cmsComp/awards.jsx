import React, { useState, useEffect } from "react";
import axios from "axios";
import CMSTable from "../../components/CMSTable";

function Awards() {
  const [awards, setAwards] = useState([]);
  const [newYear, setNewYear] = useState("");
  const [newName, setNewName] = useState("");
  const [editingAward, setEditingAward] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchAwards();
  }, []);

  const fetchAwards = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/awards");
      setAwards(response.data);
    } catch (error) {
      console.error("Error fetching awards:", error);
    }
  };

  const searchAwards = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/search/awards", {
        params: { query: searchQuery }
      });
      setAwards(response.data);
    } catch (error) {
      console.error("Error searching awards:", error);
    }
  };

  const addAward = async () => {
    try {
      if (!newYear || !newName) return;
      const response = await axios.post("http://localhost:8000/api/awards", {
        year: newYear,
        name: newName,
      });
      setAwards([...awards, response.data]);
      setNewYear("");
      setNewName("");
    } catch (error) {
      console.error("Error adding award:", error);
    }
  };

  const deleteAward = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/awards/${id}`);
      setAwards(awards.filter((award) => award.id !== id));
    } catch (error) {
      console.error("Error deleting award:", error);
    }
  };

  const updateAward = async (id) => {
    try {
      if (!editingAward) return;
      await axios.put(`http://localhost:8000/api/awards/${id}`, {
        year: editingAward.year,
        name: editingAward.name,
      });
      setAwards(
        awards.map((award) =>
          award.id === id
            ? { ...award, year: editingAward.year, name: editingAward.name }
            : award
        )
      );
      setEditingAward(null);
    } catch (error) {
      console.error("Error updating award:", error);
    }
  };

  const startEditing = (award) => {
    setEditingAward({ ...award });
  };

  return (
    <section className="w-full">
      <div className="flex flex-col w-3/4 mx-auto">
        {/* Input for Adding New Award */}
        <div className="flex items-center mb-6 p-4 bg-slate-100 rounded">
          <label htmlFor="year" className="mr-4 text-sm font-medium">
            Year:
          </label>
          <input
            type="text"
            id="year"
            className="flex-1 bg-slate-300 text-black px-3 py-1 rounded"
            value={newYear}
            onChange={(e) => setNewYear(e.target.value)}
          />
          <label htmlFor="name" className="ml-4 mr-4 text-sm font-medium">
            Award Name:
          </label>
          <input
            type="text"
            id="name"
            className="flex-1 bg-slate-300 text-black px-3 py-1 rounded"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <button
            className="ml-4 bg-slate-500 text-white text-xs px-3 py-1 rounded hover:bg-slate-600"
            onClick={addAward}
          >
            Add
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex items-center mb-6 p-4 bg-slate-100 rounded">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search awards..."
            className="w-full px-3 py-2 bg-white rounded"
          />
          <button
            className="ml-4 bg-slate-500 text-white text-xs px-3 py-1 rounded hover:bg-slate-600"
            onClick={searchAwards}
          >
            Search
          </button>
        </div>

        {/* Awards Table */}
        <CMSTable
          headers={["No", "Year", "Award Name", "Actions"]}
          datas={awards.map((award, index) => [
            index + 1,
            editingAward && editingAward.id === award.id ? (
              <input
                type="text"
                value={editingAward.year}
                onChange={(e) =>
                  setEditingAward({ ...editingAward, year: e.target.value })
                }
                className="bg-slate-200 p-1 text-black rounded w-full"
              />
            ) : (
              <span className="block p-1">{award.year}</span>
            ),
            editingAward && editingAward.id === award.id ? (
              <input
                type="text"
                value={editingAward.name}
                onChange={(e) =>
                  setEditingAward({ ...editingAward, name: e.target.value })
                }
                className="bg-slate-200 p-1 text-black rounded w-full"
              />
            ) : (
              <span className="block p-1">{award.name}</span>
            ),
            <div className="flex gap-2">
              {editingAward && editingAward.id === award.id ? (
                <>
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => updateAward(award.id)}
                  >
                    Save
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => setEditingAward(null)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => startEditing(award)}
                  >
                    Edit
                  </button>
                  <span>|</span>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => deleteAward(award.id)}
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

export default Awards;
