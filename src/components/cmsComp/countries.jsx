import React, { useState, useEffect } from "react";
import axios from "axios";
import CMSTable from "../../components/CMSTable";

function Countries() {
  const [countries, setCountries] = useState([]); // State untuk menyimpan data countries
  const [newCountry, setNewCountry] = useState(""); // State untuk input nama country
  const [editingCountry, setEditingCountry] = useState(null); // State untuk country yang sedang di-edit

  // Fetch data countries dari API
  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/countries"); // Ganti URL sesuai dengan API
      setCountries(response.data); // Set data countries ke state
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  // Tambah country baru
  const addCountry = async () => {
    try {
      if (!newCountry) return; // Validasi input kosong
      const response = await axios.post("http://localhost:8000/api/countries", {
        name: newCountry,
      });
      setCountries([...countries, response.data]); // Tambahkan country baru ke state
      setNewCountry(""); // Reset input field
    } catch (error) {
      console.error("Error adding country:", error);
    }
  };

  // Hapus country
  const deleteCountry = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/countries/${id}`);
      setCountries(countries.filter((country) => country.id !== id)); // Filter country yang dihapus dari state
    } catch (error) {
      console.error("Error deleting country:", error);
    }
  };

  // Update country
  const updateCountry = async (id) => {
    try {
      if (!editingCountry) return; // Validasi input kosong
      await axios.put(`http://localhost:8000/api/countries/${id}`, {
        name: editingCountry.name,
      });
      setCountries(
        countries.map((country) =>
          country.id === id ? { ...country, name: editingCountry.name } : country
        )
      );
      setEditingCountry(null); // Reset state editing
    } catch (error) {
      console.error("Error updating country:", error);
    }
  };

  // Set country untuk di-edit
  const startEditing = (country) => {
    setEditingCountry({ ...country });
  };

  return (
    <section className="w-full">
      <div className="flex flex-col w-3/4 mx-auto">
        {/* Input tambah country */}
        <div className="flex flex-row mb-8 gap-4 bg-slate-100 p-2 rounded">
          <span className="text-sm self-center">Country</span>
          <input
            type="text"
            name="country"
            id="country"
            className="bg-slate-300 text-white ml-4"
            value={newCountry}
            onChange={(e) => setNewCountry(e.target.value)} // Set input country
          />
          <button
            className="bg-slate-300 text-white text-xs p-1 rounded hover:text-black hover:bg-white"
            onClick={addCountry} // Tambah country
          >
            Add
          </button>
        </div>

        {/* Tabel country */}
        <CMSTable
          headers={["ID", "Country", "Action"]}
          datas={countries.map((country) => [
            country.id,
            editingCountry && editingCountry.id === country.id ? (
              <input
                type="text"
                value={editingCountry.name}
                onChange={(e) =>
                  setEditingCountry({ ...editingCountry, name: e.target.value })
                }
              />
            ) : (
              country.name
            ),
            <>
              {editingCountry && editingCountry.id === country.id ? (
                <>
                  <button
                    className="hover:underline"
                    onClick={() => updateCountry(country.id)}
                  >
                    Save
                  </button>
                  <button
                    className="hover:underline ml-2"
                    onClick={() => setEditingCountry(null)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="hover:underline"
                    onClick={() => startEditing(country)}
                  >
                    Rename
                  </button>
                  <span className="mx-2">|</span>
                  <button
                    className="hover:underline"
                    onClick={() => deleteCountry(country.id)}
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

export default Countries;
