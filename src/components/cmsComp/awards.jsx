import React, { useState } from "react";
import CMSTable from "../../components/CMSTable";

function Awards() {
  // State untuk menyimpan data awards dan form input
  const [country, setCountry] = useState("");
  const [year, setYear] = useState("");
  const [award, setAward] = useState("");
  const [awardsData, setAwardsData] = useState([
    { country: "Japan", year: 2024, award: "Japanese Drama Awards Spring 2024" },
    { country: "Korea", year: 2024, award: "Korean Drama Awards 2024" },
    // Tambahkan data lainnya sesuai kebutuhan
  ]);

  // Fungsi untuk menambahkan data awards
  const handleSubmit = (e) => {
    e.preventDefault();
    const newAward = { country, year, award };
    setAwardsData([...awardsData, newAward]);
    setCountry("");
    setYear("");
    setAward("");
  };

  // Fungsi untuk tombol Edit dan Delete
  const actions = (index) => (
    <>
      <button className="text-blue-500 hover:underline" onClick={() => handleEdit(index)}>Edit</button>
      <span> | </span>
      <button className="text-red-500 hover:underline" onClick={() => handleDelete(index)}>Delete</button>
    </>
  );

  // Fungsi untuk mengedit data
  const handleEdit = (index) => {
    const selectedAward = awardsData[index];
    setCountry(selectedAward.country);
    setYear(selectedAward.year);
    setAward(selectedAward.award);
    handleDelete(index);
  };

  // Fungsi untuk menghapus data
  const handleDelete = (index) => {
    const updatedData = awardsData.filter((_, i) => i !== index);
    setAwardsData(updatedData);
  };

  return (
    <section className="w-full">
      <div className="flex flex-col w-3/4 mx-auto">
        <div className="flex flex-row mb-8 gap-4 bg-slate-100 p-2 rounded">
          <span className="text-sm self-center">Country</span>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="bg-slate-300 text-white ml-4"
          />
          <span className="text-sm self-center">Year</span>
          <input
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="bg-slate-300 text-white ml-4"
          />
          <span className="text-sm self-center">Awards</span>
          <input
            type="text"
            value={award}
            onChange={(e) => setAward(e.target.value)}
            className="bg-slate-300 text-white ml-4"
          />
          <button
            onClick={handleSubmit}
            className="bg-orange-500 text-white text-xs p-1 rounded hover:text-black hover:bg-white"
          >
            Submit
          </button>
        </div>

        {/* Tabel untuk menampilkan data awards */}
        <CMSTable
          headers={["", "Countries", "Years", "Awards", "Actions"]}
          datas={awardsData.map((awardItem, index) => [
            index + 1,
            awardItem.country,
            awardItem.year,
            awardItem.award,
            actions(index),
          ])}
        />
      </div>
    </section>
  );
}

export default Awards;
