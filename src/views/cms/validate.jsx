import React from "react";
import CMSTable from "../../components/CMSTable";

function validate() {
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
          headers={[
            "",
            "Drama",
            "Actor",
            "Genre",
            "Synopsis",
            "Status",
            "Action",
          ]}
          datas={[
            [
              1,
              "The Shawshank Redemption",
              "Tim Robbins",
              "Drama",
              "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
              "Released",
              button(),
            ],
          ]}
        >
          <div class="flex flex-row mb-8 gap-2 bg-slate-100 p-2 rounded self-center">
            <label>Filtered by : </label>
            <select
              name="status"
              id="status"
              class="bg-slate-400 text-white p-1 rounded"
            >
              <option value="unapproved">Unapproved</option>
              <option value="approved">Approved</option>
            </select>
            <label>Shows</label>
            <select
              name="status"
              id="status"
              class="bg-slate-400 text-white p-1 rounded"
            >
              <option value="10">10</option>

              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <input
              title="search"
              type="text"
              name="search"
              id="search"
              className="bg-slate-300 text-white ml-4 p-1 self-end"
            />
          </div>
        </CMSTable>
        <span role="button" className="">
          Select All
        </span>
        <div className="flex flex-col">
          <div className="flex flex-row gap-2">
            <button className="bg-slate-300 text-white p-1 rounded">
              Approve
            </button>
            <button className="bg-slate-300 text-white p-1 rounded">
              Delete
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default validate;
