import React, { useState, useEffect } from "react";
import axios from "axios";
import CMSTable from "../../components/CMSTable";

function Actors() {
  const [actorData, setActorData] = useState([]);
  const [newActor, setNewActor] = useState({ name: "", photo_url: "" });
  const [editingIndex, setEditingIndex] = useState(null); // For editing actors

  // Fetch actors from API
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

  // Handle input changes for new actor
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewActor({ ...newActor, [name]: value });
  };

  // Add or update actor
  const addActor = async () => {
    try {
      if (editingIndex !== null) {
        // If editing, update the actor
        const actorToUpdate = actorData[editingIndex];
        await axios.put(`http://localhost:8000/api/actors/${actorToUpdate.id}`, newActor);
        const updatedActors = [...actorData];
        updatedActors[editingIndex] = newActor;
        setActorData(updatedActors);
        setEditingIndex(null); // Reset editing state
      } else {
        // If adding new actor
        const response = await axios.post("http://localhost:8000/api/actors", newActor);
        setActorData([...actorData, response.data]);
      }
      setNewActor({ name: "", photo_url: "" }); // Reset form
    } catch (error) {
      console.error("Error adding/updating actor:", error);
    }
  };

  // Edit actor
  const editActor = (index) => {
    setNewActor(actorData[index]);
    setEditingIndex(index);
  };

  // Delete actor
  const deleteActor = async (index) => {
    try {
      const actorToDelete = actorData[index];
      await axios.delete(`http://localhost:8000/api/actors/${actorToDelete.id}`);
      const filteredData = actorData.filter((_, i) => i !== index);
      setActorData(filteredData);
    } catch (error) {
      console.error("Error deleting actor:", error);
    }
  };

  // Button actions for each row
  function actions(index) {
    return (
      <>
        <td>
          <button className="hover:underline" onClick={() => editActor(index)}>
            Edit
          </button>
          <span className="">|</span>
          <button className="hover:underline" onClick={() => deleteActor(index)}>
            Delete
          </button>
        </td>
      </>
    );
  }

  // Function to render photo cell
  function renderPhotoCell(photo_url) {
    return (
      <td>
        {photo_url ? (
          <img src={photo_url} alt="actor" className="w-12 h-12" />
        ) : (
          <div className="w-12 h-12 bg-gray-300"></div>
        )}
      </td>
    );
  }

  return (
    <section className="w-full">
      <div className="flex flex-col w-3/4 mx-auto">
        {/* Form layout */}
        <div className="flex flex-row mb-8 gap-4 bg-slate-100 p-4 rounded">
          <div className="flex flex-col flex-grow">
            <div className="mb-4">
              <label className="text-sm">Actor Name</label>
              <input
                type="text"
                name="name"
                value={newActor.name}
                onChange={handleInputChange}
                className="bg-slate-300 text-white p-1 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label className="text-sm">Photo URL</label>
              <input
                type="text"
                name="photo_url"
                value={newActor.photo_url}
                onChange={handleInputChange}
                className="bg-slate-300 text-white p-1 rounded w-full"
              />
            </div>
            <button
              className="bg-orange-500 text-white text-xs p-2 rounded hover:text-black hover:bg-white w-1/4"
              onClick={addActor}
            >
              {editingIndex !== null ? "Update" : "Submit"}
            </button>
          </div>
        </div>

        {/* Table layout */}
        <CMSTable
          headers={["", "Actor Name", "Photos", "Actions"]}
          datas={actorData.map((actor, index) => [
            index + 1,
            actor.name,
            renderPhotoCell(actor.photo_url),
            actions(index),
          ])}
        />
      </div>
    </section>
  );
}

export default Actors;
