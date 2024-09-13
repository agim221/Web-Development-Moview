import React, { useState } from "react";
import GenreInput from "../../components/GenreInput";
import ActorInput from "../../components/ActorInput";
import picture from "../../assets/images/main-slider/download.jpeg";

function InputFilm() {
  const [awards, setAwards] = useState([
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

  const [actors, setActors] = useState([
    {
      name: "Actor Name",
      picture: "./picture/download (1).jpeg",
    },
    {
      name: "Actor Name",
      picture: "./picture/download (1).jpeg",
    },
    {
      name: "Actor Name",
      picture: "./picture/download (1).jpeg",
    },
    {
      name: "Actor Name",
      picture: "./picture/download (1).jpeg",
    },
    {
      name: "Actor Name",
      picture: "./picture/download (1).jpeg",
    },
    {
      name: "Actor Name",
      picture: "./picture/download (1).jpeg",
    },
    {
      name: "Actor Name",
      picture: "./picture/download (1).jpeg",
    },
    {
      name: "Actor Name",
      picture: "./picture/download (1).jpeg",
    },
    {
      name: "Actor Name",
      picture: "./picture/download (1).jpeg",
    },
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

  const [genres, setGenres] = useState([
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Fantasy",
    "Horror",
    "Mystery",
    "Romance",
    "Thriller",
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Fantasy",
    "Horror",
    "Mystery",
  ]);

  return (
    <section className="input-section w-full">
      <div className="flex flex-row gap-2">
        <div className="flex flex-col w-3/12">
          <div className="w-4/5 mx-auto">
            <img
              className="w-full h-full mx-auto rounded-xl"
              src={picture}
              alt=""
            />
          </div>
          <button
            title="submit"
            className="mt-4 bg-slate-500 text-white rounded-lg w-2/5 h-10 mx-auto"
          >
            Submit
          </button>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex flex-row gap-4">
            <div className="flex flex-col w-full">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                className="bg-slate-400 text-white p-1 rounded"
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="alt-title">Alternative Title</label>
              <input
                type="text"
                name="alt-title"
                id="alt-title"
                className="bg-slate-400 text-white p-1 rounded"
              />
            </div>
          </div>
          <div className="flex flex-row gap-8">
            <div className="flex flex-col">
              <label htmlFor="year">Year</label>
              <select
                name="year"
                id="year"
                className="bg-slate-400 rounded text-white p-1"
              >
                {years.map((year, index) => (
                  <option key={index} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                name="country"
                id="country"
                className="bg-slate-400 rounded text-white p-1"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="status">Status</label>
              <select
                name="status"
                id="status"
                className="bg-slate-400 text-white p-1 rounded"
              >
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="synopsis">Synopsis</label>
            <textarea
              name="synopsis"
              id="synopsis"
              className="bg-slate-400 text-white p-1 rounded"
            ></textarea>
          </div>
          <div className="flex flex-col">
            <label htmlFor="available">Availability</label>
            <input
              type="text"
              name="available"
              id="available"
              className="bg-slate-400 text-white p-1 rounded"
            />
          </div>
          <div>
            <label htmlFor="genre">Add Genre</label>

            <GenreInput genres={genres} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="actor">Add Actors (Up to 9)</label>
            <input
              type="text"
              name="actor"
              id="actor"
              className="bg-slate-400 p-1 text-white rounded w-1/3"
            />
            <div className="grid grid-cols-3 gap-2">
              <ActorInput actors={actors} />
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <div className="flex flex-col w-full">
              <label htmlFor="trailer">Link Trailer</label>
              <input
                type="text"
                name="trailer"
                id="trailer"
                className="bg-slate-400 text-white p-1 rounded"
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="award">Award</label>
              <select
                name="award"
                id="award"
                className="bg-slate-400 text-white p-1 rounded"
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
