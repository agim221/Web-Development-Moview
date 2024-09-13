import React, { useReducer } from "react";
import CMSSidebar from "../components/CMSSidebar";
import Genres from "../components/cmsComp/genres";
import Countries from "../components/cmsComp/countries";
import Validate from "../components/cmsComp/validate";
import InputFilm from "../components/cmsComp/inputFilm";

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
          <span className="text-xl font-semibold text-gray-800">Dramaku</span>
          <div className="flex flex-row mt-4 ml-4">
            <CMSSidebar onViewChange={handleViewChange} />
          </div>
        </span>
        <div className="flex w-full">
          {state.view === "genres" && <Genres />}
          {state.view === "countries" && <Countries />}
          {state.view === "validate" && <Validate />}
          {state.view === "input" && <InputFilm />}
        </div>
      </div>
    </>
  );
}

export default CMS;
