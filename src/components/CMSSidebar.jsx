import React from "react";

function CMSSidebar({ onViewChange }) {
  return (
    <>
      <section className="w-full">
        <div>
          <span className="">Dramas</span>
          <ul className="ml-4">
            <li>Validate</li>
            <li id="input-menu" onClick={() => onViewChange("input")}>
              Input New Drama
            </li>
          </ul>
        </div>
        <div id="film-menu" onClick={() => onViewChange("film")}>
          Films
        </div>
        <div id="countries-menu" onClick={() => onViewChange("countries")}>
          Countries
        </div>
        <div id="awards-menu" onClick={() => onViewChange("awards")}>Awards</div>
        <div id="genres-menu" onClick={() => onViewChange("genres")}>
          Genres
        </div>
        <div id="actors-menu" onClick={() => onViewChange("actors")}>Actors</div>
        <div id="comments-menu" onClick={() => onViewChange("comments")}>Comments</div>
        <div id="users-menu" onClick={() => onViewChange("users")}>Users</div>
        <div id="logout-menu">Logout</div>
      </section>
    </>
  );
}

export default CMSSidebar;
