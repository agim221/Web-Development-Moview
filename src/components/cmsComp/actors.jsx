import React, { useState } from "react";
import CMSTable from "../../components/CMSTable";

function Actors() {
  const [actorData, setActorData] = useState([
    { country: "Japan", name: "Takuya Kimura", birthDate: "19 Desember 1975", photo: "" },
    { country: "Japan", name: "Yuko Takeuchi", birthDate: "19 Oktober 1977", photo: "" },
  ]);

  // State to store the uploaded image preview
  const [imagePreview, setImagePreview] = useState(null);

  // Handle the image upload and set preview
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Button actions for each row
  function actions(index) {
    return (
      <>
        <td>
          <button className="hover:underline">Edit</button>
          <span className="">|</span>
          <button className="hover:underline">Delete</button>
        </td>
      </>
    );
  }

  // Function to render photo cell
  function renderPhotoCell(photo) {
    return (
      <td>
        {photo ? <img src={photo} alt="actor" className="w-12 h-12" /> : <div className="w-12 h-12 bg-gray-300"></div>}
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
              <label className="text-sm">Country</label>
              <input
                type="text"
                name="country"
                id="country"
                className="bg-slate-300 text-white p-1 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label className="text-sm">Actor Name</label>
              <input
                type="text"
                name="actorName"
                id="actorName"
                className="bg-slate-300 text-white p-1 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label className="text-sm">Birth Date</label>
              <input
                type="date"
                name="birthDate"
                id="birthDate"
                className="bg-slate-300 text-white p-1 rounded w-full"
              />
            </div>
            <button className="bg-orange-500 text-white text-xs p-2 rounded hover:text-black hover:bg-white w-1/4">
              Submit
            </button>
          </div>

          {/* Image Upload and Preview */}
          <div className="flex flex-col justify-center">
            <label className="text-sm">Upload Picture</label>
            <input
              type="file"
              name="photo"
              id="photo"
              className="bg-slate-300 text-white p-1 rounded"
              onChange={handleImageUpload}
            />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="mt-4 w-32 h-32 object-cover bg-slate-300 text-white p-1 rounded" />
            )}
          </div>
        </div>

        {/* Table layout */}
        <CMSTable
          headers={["", "Countries", "Actor Name", "Birth Date", "Photos", "Actions"]}
          datas={actorData.map((actor, index) => [
            index + 1,
            actor.country,
            actor.name,
            actor.birthDate,
            renderPhotoCell(actor.photo),
            actions(index),
          ])}
        />
      </div>
    </section>
  );
}

export default Actors;
