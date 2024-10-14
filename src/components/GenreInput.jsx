import React from "react";

function GenreInput({ genres }) {
  // console.log(genres);
  return (
    <>
      <form action="" className="grid grid-cols-4">
        {genres.map((genre, index) => (
          <div key={index} className="flex flex-row gap-2">
            <input
              type="checkbox"
              name={genre}
              id={genre}
              className="bg-slate-300 text-white"
            />
            <label htmlFor={genre} className="text-black">
              {genre}
            </label>
          </div>
        ))}
      </form>
    </>
  );
}

export default GenreInput;
