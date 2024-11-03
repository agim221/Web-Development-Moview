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
import Films from "../components/cmsComp/films";

function CMS() {
  const [view, setView] = useState("home");

  const handleViewChange = (view) => {
    setView(view);
  };

  return (
    <div className="flex h-screen">
      <CMSSidebar onViewChange={handleViewChange} view={view} />

      <div className="flex-1 p-8 bg-gray-100">
        <div className="content">
          {view === "genres" && <Genres />}
          {view === "countries" && <Countries />}
          {view === "validate" && <Validate />}
          {view === "input" && <InputFilm />}
          {view === "comments" && <Comments />}
          {view === "awards" && <Awards />}
          {view === "actors" && <Actors />}
          {view === "users" && <Users />}
          {view === "home" && (
            <p className="text-gray-600">Select a section from the sidebar.</p>
          )}
          {view === "films" && <Films />}
        </div>
      </div>
    </div>
  );
}

export default CMS;
