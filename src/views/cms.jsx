import React, { useState } from "react";
import CMSSidebar from "../components/CMSSidebar";
import Genres from "../components/cmsComp/genres";
import Countries from "../components/cmsComp/countries";
import Validate from "../components/cmsComp/validate";
import InputFilm from "../components/cmsComp/inputFilm";

function CMS() {
  const [view, setView] = useState("home"); // Menggunakan useState

  const handleViewChange = (view) => {
    setView(view);
  };

  return (
    <>
      <div className="flex flex-row">
        <span>
          <span className="text-xl font-semibold text-gray-800">Dramaku</span>
          <div className="flex flex-row mt-4 ml-4">
            <CMSSidebar onViewChange={handleViewChange} />
          </div>
        </span>
        <div className="flex w-full">
          {view === "genres" && <Genres />}
          {view === "countries" && <Countries />}
          {view === "validate" && <Validate />}
          {view === "input" && <InputFilm />}
        </div>
      </div>
    </>
  );
}

export default CMS;
