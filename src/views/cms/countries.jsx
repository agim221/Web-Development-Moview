import React from "react";
import CMSTable from "../../components/CMSTable";

function countries() {
  function button() {
    return (
      <>
        <td>
          <button class="hover:underline">Rename</button>
          <span class="">|</span>
          <button class="hover:underline">Delete</button>
        </td>
      </>
    );
  }

  return (
    <section className="w-full">
      <div className="flex flex-col w-3/4 mx-auto">
        <CMSTable
          headers={["", "Country", "Action"]}
          datas={[[1, "Indonesia", button()]]}
        ></CMSTable>
      </div>
    </section>
  );
}

export default countries;
