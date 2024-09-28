import React from "react";
import pict from "../assets/images/main-slider/download (1).jpeg";

function ActorInput({ actors }) {
  return (
    <>
      {actors.map((actor, index) => (
        <div
          key={index}
          className="bg-slate-300 flex flex-row gap-4 p-4 rounded-lg"
        >
          <div className="w-2/12">
            <img
              className="w-full h-full mx-auto rounded-xl"
              src={pict}
              alt="actore"
            />
          </div>
          <span>{actor.name}</span>
        </div>
      ))}
    </>
  );
}

export default ActorInput;
