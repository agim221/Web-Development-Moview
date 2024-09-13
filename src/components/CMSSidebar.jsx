import React from "react";

function CMSSidebar({ onViewChange }) {
  return (
    <>
      <section className="w-1/6">
        <div>
          <span className="">Dramas</span>
          <ul className="ml-4">
            <li>Validate</li>
            <li id="input-menu" onClick={() => onViewChange("input")}>
              Input New Drama
            </li>
          </ul>
        </div>
        <div id="countries-menu" onClick={() => onViewChange("countries")}>
          Countries
        </div>
        <div id="awards-menu">Awards</div>
        <div id="genres-menu" onClick={() => onViewChange("genres")}>
          Genres
        </div>
        <div id="actors-menu">Actors</div>
        <div id="comments-menu">Comments</div>
        <div id="users-menu">Users</div>
        <div id="logout-menu">Logout</div>
      </section>
    </>
  );
}

export default CMSSidebar;
