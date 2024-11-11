import { useNavigate } from "react-router-dom";
import InputFilm from "../components/cmsComp/inputFilm"; // Pastikan path ini sesuai dengan lokasi InputFilm
import axios from "axios";

function AddMovie() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Mengarahkan pengguna kembali ke halaman sebelumnya
  };

  return (
    <div className="add-movie-container">
      <button
        className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 mb-4"
        onClick={handleBackClick}
      >
        Back
      </button>
      <InputFilm />
    </div>
  );
}

export default AddMovie;
