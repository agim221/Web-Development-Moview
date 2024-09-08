import React from "react";
import CMSTable from "../../components/CMSTable";

function genres() {
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
          headers={["", "Genre", "Action"]}
          datas={[
            [1, "Comedy", button()],
            [2, "Drama", button()],
          ]}
        ></CMSTable>
      </div>
    </section>
  );
}

export default genres;
