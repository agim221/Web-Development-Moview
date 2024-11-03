import React, { useState } from "react";
import GenreInput from "../../components/GenreInput";
import ActorInput from "../../components/ActorInput";
import picture from "../../assets/images/main-slider/download.jpeg";

function InputFilm() {
  const [awards] = useState([
    "award 1",
    "award 2",
    "award 3",
    "award 4",
    "award 5",
    "award 6",
    "award 7",
    "award 8",
    "award 9",
    "award 10",
  ]);

  const [actors] = useState([
    { name: "Actor Name", picture: "./picture/download (1).jpeg" },
    { name: "Actor Name", picture: "./picture/download (1).jpeg" },
    // Add other actors here...
  ]);

  const [years] = useState([
    "2021",
    "2020",
    "2019",
    "2018",
    "2017",
    "2016",
    "2015",
    "2014",
    "2013",
    "2012",
    "2011",
  ]);

  const [genres] = useState([
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Fantasy",
    "Horror",
    "Mystery",
    "Romance",
    "Thriller",
  ]);

  return (
    <section className="input-section w-full p-6">
      <div className="flex gap-6">
        {/* Left Column: Image and Submit Button */}
        <div className="flex flex-col items-center w-1/4">
          <img
            className="w-full h-auto rounded-xl"
            src={picture}
            alt="Film Cover"
          />
          <button className="mt-4 bg-slate-500 text-white rounded-lg w-2/5 h-10">
            Submit
          </button>
        </div>

        {/* Right Column: Film Details Form */}
        <div className="flex flex-col w-3/4 gap-4">
          {/* Title and Alternative Title */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                className="bg-slate-400 text-white p-2 rounded w-full"
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="alt-title">Alternative Title</label>
              <input
                type="text"
                name="alt-title"
                id="alt-title"
                className="bg-slate-400 text-white p-2 rounded w-full"
              />
            </div>
          </div>

          {/* Year, Country, and Status */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="year">Year</label>
              <select
                name="year"
                id="year"
                className="bg-slate-400 text-white p-2 rounded w-full"
              >
                {years.map((year, index) => (
                  <option key={index} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                name="country"
                id="country"
                className="bg-slate-400 text-white p-2 rounded w-full"
              />
            </div>
          </div>

          {/* Synopsis */}
          <div>
            <label htmlFor="synopsis">Synopsis</label>
            <textarea
              name="synopsis"
              id="synopsis"
              className="bg-slate-400 text-white p-2 rounded w-full"
              rows="4"
            ></textarea>
          </div>

          {/* Availability */}
          <div>
            <label htmlFor="available">Availability</label>
            <input
              type="text"
              name="available"
              id="available"
              className="bg-slate-400 text-white p-2 rounded w-full"
            />
          </div>

          {/* Genre Input */}
          <div>
            <label htmlFor="genre">Add Genre</label>
            <GenreInput genres={genres} />
          </div>

          {/* Actor Input */}
          <div>
            <label htmlFor="actor">Add Actors (Up to 9)</label>
            <input
              type="text"
              name="actor"
              id="actor"
              className="bg-slate-400 text-white p-2 rounded w-1/3"
            />
            <div className="grid grid-cols-3 gap-2 mt-2">
              <ActorInput actors={actors} />
            </div>
          </div>

          {/* Trailer Link and Awards */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="trailer">Link Trailer</label>
              <input
                type="text"
                name="trailer"
                id="trailer"
                className="bg-slate-400 text-white p-2 rounded w-full"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="award">Award</label>
              <select
                name="award"
                id="award"
                className="bg-slate-400 text-white p-2 rounded w-full"
              >
                {awards.map((award, index) => (
                  <option key={index} value={award}>
                    {award}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InputFilm;
