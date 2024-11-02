import React from "react";
import CMSTable from "../../components/CMSTable";

function Users() {
  // Render action buttons for each user row
  function renderActions() {
    return (
      <td>
        <button className="hover:underline">Send first email</button>
        <span className="mx-2">|</span>
        <button className="hover:underline">Edit</button>
        <span className="mx-2">|</span>
        <button className="hover:underline">Delete</button>
      </td>
    );
  }

  return (
    <section className="w-full h-screen flex flex-col">
      <div className="flex flex-col w-3/4 mx-auto h-full bg-white rounded-lg shadow-lg p-4 overflow-y-auto">
        {/* Form layout for adding a new user */}
        <div className="flex flex-row mb-8 gap-4 bg-slate-100 p-4 rounded">
          <div className="flex flex-col">
            <label className="text-sm">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              className="bg-slate-300 text-black p-2 rounded w-full"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-slate-300 text-black p-2 rounded w-full"
            />
          </div>
          <button className="bg-orange-500 text-white text-xs p-2 rounded hover:text-black hover:bg-white mt-6">
            Submit
          </button>
        </div>

        {/* Table layout for displaying users */}
        <div className="overflow-y-auto">
          <CMSTable
            headers={["#", "Username", "Email", "Actions"]}
            datas={[
              [1, "anita1", "anita@gmail.com", renderActions()],
              [2, "borang", "bora@yahoo.com", renderActions()],
            ]}
          />
        </div>
      </div>
    </section>
  );
}

export default Users;
