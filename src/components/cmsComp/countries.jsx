import React from "react";
import CMSTable from "../../components/CMSTable";

function countries() {
  function button() {
    return (
      <>
        <td>
          <button className="hover:underline">Rename</button>
          <span className="">|</span>
          <button className="hover:underline">Delete</button>
        </td>
      </>
    );
  }

  return (
    <section className="w-full">
      <div className="flex flex-col w-3/4 mx-auto">
        <div className="flex flex-row mb-8 gap-4 bg-slate-100 p-2 rounded">
          <span className="text-sm self-center">Country</span>
          <input
            type="text"
            name="country"
            id="country"
            className="bg-slate-300 text-white ml-4"
          />
          <button className="bg-slate-300 text-white text-xs p-1 rounded hover:text-black hover:bg-white">
            Add
          </button>
        </div>
        <CMSTable
          headers={["", "Country", "Action"]}
          datas={[[1, "Indonesia", button()]]}
        ></CMSTable>
      </div>
    </section>
  );
}

export default countries;
