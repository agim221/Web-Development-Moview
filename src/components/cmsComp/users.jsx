import React from "react";
import CMSTable from "../../components/CMSTable";

function Users() {
  function button() {
    return (
      <>
        <td>
          <button className="hover:underline">Send first email</button>
          <span className="mx-2">|</span>
          <button className="hover:underline">Edit</button>
          <span className="mx-2">|</span>
          <button className="hover:underline">Delete</button>
        </td>
      </>
    );
  }

  return (
    <section className="w-full">
      <div className="flex flex-col w-3/4 mx-auto">
        <div className="flex flex-row mb-8 gap-4 bg-slate-100 p-2 rounded">
          <span className="text-sm self-center">Username</span>
          <input
            type="text"
            name="username"
            id="username"
            className="bg-slate-300 text-white ml-4"
          />
          <span className="text-sm self-center">Email</span>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-slate-300 text-white ml-4"
          />
          <button className="bg-slate-300 text-white text-xs p-1 rounded hover:text-black hover:bg-white">
            Submit
          </button>
        </div>
        <CMSTable
          headers={["", "Username", "Email", "Actions"]}
          datas={[
            [1, "anita1", "anita@gmail.com", button()],
            [2, "borang", "bora@yahoo.com", button()],
          ]}
        ></CMSTable>
      </div>
    </section>
  );
}

export default Users;
