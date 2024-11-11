import React, { useState, useEffect } from "react";
import axios from "axios";
import CMSTable from "../../components/CMSTable";

function Actors() {
  const [actorData, setActorData] = useState([]);
  const [newActor, setNewActor] = useState({ name: "", photo: null });
  const [editingIndex, setEditingIndex] = useState(null);
  const [preview, setPreview] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchActors();
  }, []);

  const fetchActors = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/actors");
      setActorData(response.data);
    } catch (error) {
      console.error("Error fetching actors:", error);
    }
  };

  const searchActors = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/search/actors", {
        params: { query: searchQuery }
      });
      setActorData(response.data);
    } catch (error) {
      console.error("Error searching actors:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewActor({ ...newActor, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewActor({ ...newActor, photo: reader.result });
        setPreview(reader.result);
      };
      reader.readAsDataURL(file); // Convert to Base64
    }
  };

  const addActor = async () => {
    try {
      const actorPayload = {
        name: newActor.name,
        photo: newActor.photo, // Base64 photo
      };

      if (editingIndex !== null) {
        const actorToUpdate = actorData[editingIndex];
        const response = await axios.put(
          `http://localhost:8000/api/actors/update/${actorToUpdate.id}`,
          actorPayload
        );
        const updatedActors = [...actorData];
        updatedActors[editingIndex] = response.data;
        setActorData(updatedActors);
        setEditingIndex(null);
      } else {
        const response = await axios.post(
          "http://localhost:8000/api/add-actor",
          actorPayload
        );
        setActorData([...actorData, response.data]);
      }

      setNewActor({ name: "", photo: null });
      setPreview(null);
    } catch (error) {
      console.error("Error adding/updating actor:", error);
    }
  };

  const editActor = (index) => {
    const actor = actorData[index];
    setNewActor({ name: actor.name, photo: null });
    setEditingIndex(index);
    setPreview(actor.photo_url);
  };

  const deleteActor = async (index) => {
    try {
      const actorToDelete = actorData[index];
      await axios.delete(
        `http://localhost:8000/api/actors/${actorToDelete.id}`
      );
      const filteredData = actorData.filter((_, i) => i !== index);
      setActorData(filteredData);
    } catch (error) {
      console.error("Error deleting actor:", error);
    }
  };

  function actions(index) {
    return (
      <td>
        <button className="hover:underline" onClick={() => editActor(index)}>
          Edit
        </button>
        <span className="mx-2">|</span>
        <button className="hover:underline" onClick={() => deleteActor(index)}>
          Delete
        </button>
      </td>
    );
  }

  function renderPhotoCell(photo_url) {
    return (
      <td className="flex items-center justify-center">
        {photo_url ? (
          <img
            src={photo_url}
            alt="actor"
            className="object-cover w-16 h-24 rounded-lg"
          />
        ) : (
          <div className="w-16 h-24 bg-gray-300 rounded-lg"></div>
        )}
      </td>
    );
  }

  return (
    <section className="w-full h-screen flex flex-col">
      <div className="flex flex-col w-3/4 mx-auto h-full bg-white rounded-lg shadow-lg p-4 overflow-y-auto">
        <div className="flex flex-row mb-8 gap-4 bg-slate-100 p-4 rounded">
          <div className="flex flex-col flex-grow">
            <div className="mb-4">
              <label className="text-sm">Actor Name</label>
              <input
                type="text"
                name="name"
                value={newActor.name}
                onChange={handleInputChange}
                className="bg-slate-300 text-black p-1 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label className="text-sm">Photo</label>
              <input
                type="file"
                name="photo"
                onChange={handleFileChange}
                className="bg-slate-300 text-black p-1 rounded w-full"
              />
              {preview && (
                <div className="mt-4">
                  <img
                    src={preview}
                    alt="preview"
                    className="object-cover w-48 h-32 rounded-lg"
                  />
                </div>
              )}
            </div>
            <button
              className="bg-orange-500 text-white text-xs p-2 rounded hover:text-black hover:bg-white w-1/4"
              onClick={addActor}
            >
              {editingIndex !== null ? "Update" : "Submit"}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center mb-6 p-4 bg-slate-100 rounded">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search actors..."
            className="w-full px-3 py-2 bg-white rounded"
          />
          <button
            className="ml-4 bg-slate-500 text-white text-xs px-3 py-1 rounded hover:bg-slate-600"
            onClick={searchActors}
          >
            Search
          </button>
        </div>

        <div className="overflow-y-auto">
          <CMSTable
            headers={["No", "Actor Name", "Photo", "Actions"]}
            datas={actorData.map((actor, index) => [
              index + 1,
              actor.name,
              renderPhotoCell(actor.photo_url),
              actions(index),
            ])}
          />
        </div>
      </div>
    </section>
  );
}

export default Actors;
