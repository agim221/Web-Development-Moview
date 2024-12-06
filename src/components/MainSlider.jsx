import React, { useEffect, useState, useCallback } from "react";
import { Circles } from "react-loading-icons";
import axios from "axios";

export default function MainSlider() {
  const [activePicture, setActivePicture] = useState(0);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  const nextPicture = (button) => {
    setActivePicture((prev) => {
      if (button === "right") {
        return prev === trending.length - 1 ? 0 : prev + 1;
      } else if (button === "left") {
        return prev === 0 ? trending.length - 1 : prev - 1;
      } else {
        return prev;
      }
    });
  };

  const fetchTrending = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://webdev-production-2eb9.up.railway.app//api/trending"
      );

      setTrending(response.data);
    } catch (error) {
      console.error("There was an error fetching the trending data!", error);
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    fetchTrending();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      nextPicture("right");
    }, 3000); // Change picture every 5 seconds

    return () => clearTimeout(timer); // Clear timeout if component unmounts or activePicture changes
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Circles
          height="80"
          width="80"
          fill="#BCCFC0"
          stroke="#0a0a0a"
          aria-label="loading"
        />
      </div>
    );
  }

  return (
    <>
      <section className="flex flex-row h-full w-11/12 mx-auto relative">
        <div className="h-auto w-[70%] rounded-l-xl overflow-hidden">
          <div className="trend flex flex-row h-full">
            {trending.map((item, index) => (
              <img
                key={index}
                className={`w-full h-full mx-auto shrink-0 transition-transform duration-300 ease-in-out will-change-transform`}
                style={{ transform: `translateX(-${activePicture * 100}%)` }}
                src={item.poster}
                alt={item.title}
                loading="lazy"
              />
            ))}
          </div>

          {trending.length > 0 && (
            <div className="absolute bg-blue-500 h-56 bottom-0 left-0 translate-y-1/4 translate-x-3 rounded-xl max-lg:h-4/6">
              <img
                className="w-full h-full mx-auto rounded-xl"
                src={trending[activePicture].image}
                alt={trending[activePicture].title}
              />
            </div>
          )}

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
                d="m15.75 19.5-7.5-7.5 7.5-7.5"
              />
            </svg>
          </div>
        </div>
        <div className="bg-slate-500/30 h-auto w-[30%] rounded-r-xl">
          <div className="flex flex-col p-6">
            {trending.length > 0 && (
              <>
                <h2 className="text-4xl font-bold">
                  {trending[activePicture].title}
                </h2>
                <p className="">{trending[activePicture].genre}</p>
                <p className="">{trending[activePicture].rating} / 5</p>
                <p className="">{trending[activePicture].year}</p>
                <p className="">{trending[activePicture].description}</p>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
