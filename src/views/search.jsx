import React, { useState } from "react";
import FilmList from "../components/FilmList";

function Search({ filterData, searchText, setFilteredSum }) {
  let [filmShowed, setFilmShowed] = useState(30);

  return (
    <>
      <section className="flex flex-col w-4/5 mx-auto">
        <FilmList
          filterData={filterData}
          searchText={searchText}
          filmShowed={filmShowed}
          setFilmShowed={setFilmShowed}
          setFilteredSum={setFilteredSum}
          sectionTitle={"More Films"}
        />
      </section>
    </>
  );
}

export default Search;
