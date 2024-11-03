import React, { useState, useEffect } from "react";
import axios from "axios";
import CMSTable from "../../components/CMSTable";

function Countries() {
  const [countries, setCountries] = useState([]);
  const [newCountry, setNewCountry] = useState("");
  const [editingCountry, setEditingCountry] = useState(null);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/countries");
      setCountries(response.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const addCountry = async () => {
    try {
      if (!newCountry) return;
      const response = await axios.post("http://localhost:8000/api/countries", {
        name: newCountry,
      });
      setCountries([...countries, response.data]);
      setNewCountry("");
    } catch (error) {
      console.error("Error adding country:", error);
    }
  };

  const deleteCountry = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/countries/${id}`);
      setCountries(countries.filter((country) => country.id !== id));
    } catch (error) {
      console.error("Error deleting country:", error);
    }
  };

  const updateCountry = async (id) => {
    try {
      if (!editingCountry) return;
      await axios.put(`http://localhost:8000/api/countries/${id}`, {
        name: editingCountry.name,
      });
      setCountries(
        countries.map((country) =>
          country.id === id
            ? { ...country, name: editingCountry.name }
            : country
        )
      );
      setEditingCountry(null);
    } catch (error) {
      console.error("Error updating country:", error);
    }
  };

  const startEditing = (country) => {
    setEditingCountry({ ...country });
  };

  return (
    <section className="w-full">
      <div className="flex flex-col w-3/4 mx-auto">
        {/* Input for Adding New Country */}
        <div className="flex items-center mb-6 p-4 bg-slate-100 rounded">
          <label htmlFor="country" className="mr-4 text-sm font-medium">
            Country:
          </label>
          <input
            type="text"
            id="country"
            className="flex-1 bg-slate-300 text-black px-3 py-1 rounded"
            value={newCountry}
            onChange={(e) => setNewCountry(e.target.value)}
          />
          <button
            className="ml-4 bg-slate-500 text-white text-xs px-3 py-1 rounded hover:bg-slate-600"
            onClick={addCountry}
          >
            Add
          </button>
        </div>

        {/* Countries Table */}
        <CMSTable
          headers={["No", "Country", "Actions"]}
          datas={countries.map((country, i) => [
            i + 1,
            editingCountry && editingCountry.id === country.id ? (
              <input
                type="text"
                value={editingCountry.name}
                onChange={(e) =>
                  setEditingCountry({ ...editingCountry, name: e.target.value })
                }
                className="bg-slate-200 p-1 text-black rounded w-full"
              />
            ) : (
              <span className="block p-1">{country.name}</span>
            ),
            <div className="flex gap-2">
              {editingCountry && editingCountry.id === country.id ? (
                <>
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => updateCountry(country.id)}
                  >
                    Save
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => setEditingCountry(null)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => startEditing(country)}
                  >
                    Rename
                  </button>
                  <span>|</span>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => deleteCountry(country.id)}
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

export default Countries;
