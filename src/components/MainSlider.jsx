import React, { useState } from "react";
import slider1 from "../assets/images/main-slider/pexels-basiciggy-9249943.jpg";
import slider2 from "../assets/images/main-slider/pexels-david-besh-884788.jpg";
import film from "../assets/images/main-slider/download.jpeg";

export default function MainSlider() {
  const [activePicture, setActivePicture] = useState(0); // Perbaikan di sini

  const nextPicture = (button) => {
    setActivePicture((prev) => {
      if (button === "right") {
        return prev === 4 ? 0 : prev + 1;
      } else if (button === "left") {
        return prev === 0 ? 4 : prev - 1;
      } else {
        return prev;
      }
    });
  };

  return (
    <>
      <section className="flex flex-row h-96 w-4/5 mx-auto relative">
        <div className="h-auto w-[70%] rounded-l-xl overflow-hidden">
          <div className="trend flex flex-row h-full">
            <img
              className={`w-full h-full mx-auto shrink-0 transition-transform duration-300 ease-in-out will-change-transform`}
              style={{ transform: `translateX(-${activePicture * 100}%)` }}
              src={slider1}
              alt="Poster"
              loading="eager"
            />

            <img
              className={`w-full h-full mx-auto shrink-0 transition-transform duration-300 ease-in-out will-change-transform `}
              style={{ transform: `translateX(-${activePicture * 100}%)` }}
              src={slider2}
              alt="Poster"
              loading="eager"
            />
            <img
              className={`w-full h-full mx-auto shrink-0 transition-transform duration-300 ease-in-out will-change-transform `}
              style={{ transform: `translateX(-${activePicture * 100}%)` }}
              src={slider2}
              alt="Poster"
              loading="eager"
            />
            <img
              className={`w-full h-full mx-auto shrink-0 transition-transform duration-300 ease-in-out will-change-transform `}
              style={{ transform: `translateX(-${activePicture * 100}%)` }}
              src={slider2}
              alt="Poster"
              loading="eager"
            />
            <img
              className={`w-full h-full mx-auto shrink-0 transition-transform duration-300 ease-in-out will-change-transform `}
              style={{ transform: `translateX(-${activePicture * 100}%)` }}
              src={slider2}
              alt="Poster"
              loading="eager"
            />
          </div>

          <div className="absolute bg-blue-500 h-56 bottom-0 left-0 translate-y-1/4 translate-x-3 rounded-xl">
            <img
              className="w-full h-full mx-auto rounded-xl"
              src={film}
              alt="foto film"
            />
          </div>

          <div
            title="btn-right"
            onClick={() => nextPicture("right")}
            role="button"
            className="absolute right-0 bottom-1/2 bg-zinc-400/50 rounded p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 text-white font-extrabold"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
          <div
            title="btn-left"
            onClick={() => nextPicture("left")}
            role="button"
            className="absolute left-0 bottom-1/2 bg-zinc-400/50 rounded p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 text-white font-extrabold"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </div>
        </div>
        <div className="bg-slate-500/30 h-auto w-[30%] rounded-r-xl">
          <div className="flex flex-col p-6">
            <h2 className="text-4xl font-bold">Title</h2>
            <p className="">Genre</p>
            <p className="">Rating</p>
            <p className="">Year</p>
            <p className="">Description</p>
          </div>
        </div>
      </section>
    </>
  );
}
