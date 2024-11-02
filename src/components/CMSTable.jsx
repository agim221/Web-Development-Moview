import React from "react";

function CMSTable({ headers, datas, children }) {
  return (
    <>
      {children}
      <table className="text-center w-full">
        <thead className="bg-slate-300 h-10">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className={`border border-slate-400 ${
                  index === 0
                    ? "w-1/12"
                    : index === headers.length - 1
                    ? "w-2/12"
                    : ""
                }`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {datas.map((data, index) => (
            <tr key={index} className="odd:bg-red-100 even:bg-red-100/20">
              {data.map((item, index) => (
                <td key={index} className="p-3">
                  {item}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default CMSTable;
