import React from "react";
import CMSTable from "../../components/CMSTable";

function Validate() {
  const renderActions = () => (
    <td>
      <button className="hover:underline">Rename</button>
      <span className="mx-1">|</span>
      <button className="hover:underline">Delete</button>
    </td>
  );

  return (
    <section className="w-full py-8">
      <div className="flex flex-col w-3/4 mx-auto gap-6">
        {/* Filter and Search Bar */}
        <div className="flex flex-row items-center mb-8 gap-4 bg-slate-100 p-4 rounded">
          <label>Filtered by:</label>
          <select
            name="status"
            id="status"
            className="bg-slate-400 text-white p-1 rounded"
          >
            <option value="unapproved">Unapproved</option>
            <option value="approved">Approved</option>
          </select>

          <label>Shows:</label>
          <select
            name="showCount"
            id="showCount"
            className="bg-slate-400 text-white p-1 rounded"
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
            placeholder="Search..."
            className="bg-slate-300 text-white ml-4 p-1 rounded"
          />
        </div>

        {/* Table Component */}
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
              renderActions(),
            ],
          ]}
        />

        {/* Bulk Actions */}
        <div className="flex flex-col items-start gap-4 mt-4">
          <button role="button" className="text-blue-600 hover:underline">
            Select All
          </button>

          <div className="flex flex-row gap-2">
            <button className="bg-slate-400 text-white p-2 rounded">
              Approve
            </button>
            <button className="bg-slate-400 text-white p-2 rounded">
              Delete
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Validate;
