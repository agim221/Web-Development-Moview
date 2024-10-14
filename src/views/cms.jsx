import React, { useState } from "react";
import CMSSidebar from "../components/CMSSidebar";
import Genres from "../components/cmsComp/genres";
import Countries from "../components/cmsComp/countries";
import Validate from "../components/cmsComp/validate";
import InputFilm from "../components/cmsComp/inputFilm";
import Comments from "../components/cmsComp/comments";
import Awards from "../components/cmsComp/awards";
import Actors from "../components/cmsComp/actors";
import Users from "../components/cmsComp/users";

function CMS() {
  const [view, setView] = useState("home"); // Menggunakan useState

  const handleViewChange = (view) => {
    setView(view);
  };

  return (
    <>
      <div className="flex flex-row">
        <span>
          <span className="text-xl font-semibold text-gray-800">Moview</span>
          <div className="flex flex-row mt-4 ml-4">
            <CMSSidebar onViewChange={handleViewChange} />
          </div>
        </span>
        <div className="flex w-full">
          {view === "genres" && <Genres />}
          {view === "countries" && <Countries />}
          {view === "validate" && <Validate />}
          {view === "input" && <InputFilm />}
          {view === "comments" && <Comments />}
          {view === "awards" && <Awards />}
          {view === "actors" && <Actors />}
          {view === "users" && <Users />}
        </div>
      </div>
    </>
  );
}

export default CMS;
