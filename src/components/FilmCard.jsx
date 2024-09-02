import React from "react";
import film from "../assets/images/main-slider/download.jpeg";

export default function FilmCard() {
  return (
    <>
      <div className="h-64 flex-shrink-0">
        <img className="w-full h-full mx-auto rounded-xl" src={film} alt="" />
        <p className="">Rating</p>
        <p className="">Title</p>
        <p className="">year</p>
      </div>
    </>
  );
}
