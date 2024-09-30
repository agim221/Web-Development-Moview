import React, { useReducer } from "react";
import CMSSidebar from "../components/CMSSidebar";
import Genres from "../components/cmsComp/genres";
import Countries from "../components/cmsComp/countries";
import Validate from "../components/cmsComp/validate";
import InputFilm from "../components/cmsComp/inputFilm";
import Comments from "../components/cmsComp/comments";
import Awards from "../components/cmsComp/awards";
import Actors from "../components/cmsComp/actors";
import Users from "../components/cmsComp/users";

// Definisikan initial state
const initialState = {
  view: "home", // Nilai default
};

// Definisikan reducer
function reducer(state, action) {
  switch (action.type) {
    case "CHANGE_VIEW":
      return {
        ...state,
        view: action.payload,
      };
    default:
      return state;
  }
}

function CMS() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleViewChange = (view) => {
    dispatch({ type: "CHANGE_VIEW", payload: view });
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
          {state.view === "genres" && <Genres />}
          {state.view === "countries" && <Countries />}
          {state.view === "validate" && <Validate />}
          {state.view === "input" && <InputFilm />}
          {state.view === "comments" && <Comments />}
          {state.view === "awards" && <Awards />}
          {state.view === "actors" && <Actors />} 
          {state.view === "users" && <Users />}
        </div>
      </div>
    </>
  );
}

export default CMS;
