import React from "react";

export default function Footer({ filteredSum }) {
  return (
    <>
      <footer
        className={`mx-0 mt-8 absolute w-full ${
          filteredSum === 0 ? "bottom-0" : ""
        }`}
      >
        <div className="bg-gray-800 text-white text-center py-4">
          <p>© 2021 DramaKu. All rights reserved</p>
        </div>
      </footer>
    </>
  );
}
