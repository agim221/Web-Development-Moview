import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";

function InputFilm() {
  const [newFilm, setNewFilm] = useState({
    title: "",
    altTitle: "",
    year: "",
    country: null,
    synopsis: "",
    availability: "",
    trailer: "",
  });

  const [years, setYears] = useState([]);
  const [countries, setCountries] = useState([]);
  const [actors, setActors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [awards, setAwards] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedActors, setSelectedActors] = useState([]);
  const [selectedAwards, setSelectedAwards] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [yearsRes, countriesRes, genresRes, awardsRes, actorsRes] =
          await Promise.all([
            axios.get(
              "https://webdev-production-2eb9.up.railway.app/api/years"
            ),
            axios.get(
              "https://webdev-production-2eb9.up.railway.app/api/countries"
            ),
            axios.get(
              "https://webdev-production-2eb9.up.railway.app/api/genres"
            ),
            axios.get(
              "https://webdev-production-2eb9.up.railway.app/api/awards"
            ),
            axios.get(
              "https://webdev-production-2eb9.up.railway.app/api/actors"
            ),
          ]);

        setYears(
          yearsRes.data.map((year) => ({ value: year.year, label: year.year }))
        );
        setCountries(
          countriesRes.data.map((country) => ({
            value: country.id,
            label: country.name,
          }))
        );
        setGenres(
          genresRes.data.map((genre) => ({
            value: genre.id,
            label: genre.name,
          }))
        );
        setAwards(
          awardsRes.data.map((award) => ({
            value: award.id,
            label: award.name,
          }))
        );
        setActors(
          actorsRes.data.map((actor) => ({
            value: actor.id,
            image: actor.photo_url,
            label: actor.name,
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file); // Menyimpan file asli untuk pengiriman
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const convertImageToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    };

    try {
      const base64Image = selectedImage
        ? await convertImageToBase64(selectedImage)
        : null;

      const filmData = {
        title: newFilm.title,
        image: base64Image, // Using Base64 string
        description: newFilm.synopsis,
        release_date: newFilm.year,
        country_id: newFilm.country.value,
        trailer: newFilm.trailer,
        availability: newFilm.availability,
        actors: selectedActors.map((actor) => actor.value),
        genres: selectedGenres.map((genre) => genre.value),
        awards: selectedAwards.map((award) => award.value),
        remember_token: localStorage.getItem("remember_token"),
      };

      const response = await axios.post(
        "https://webdev-production-2eb9.up.railway.app/api/add-film",
        filmData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Show success alert
      alert("Film added successfully!");

      // Reset form after submit
      setNewFilm({
        title: "",
        altTitle: "",
        year: "",
        country: null,
        synopsis: "",
        availability: "",
        trailer: "",
      });
      setSelectedImage(null);
      setSelectedActors([]);
      setSelectedGenres([]);
      setSelectedAwards([]);
    } catch (error) {
      console.error("Error posting film:", error);
      // Show error alert
      alert("Failed to add film!");
    }
  };

  const customOption = (props) => {
    const { innerRef, innerProps, data } = props;
    return (
      <div ref={innerRef} {...innerProps} className="flex items-center p-2">
        <img
          src={data.image}
          alt={data.label}
          className="w-8 h-8 rounded-full mr-2"
        />
        <span>{data.label}</span>
      </div>
    );
  };

  return (
    <section className="input-section w-full p-6">
      <form onSubmit={handleSubmit} className="flex gap-6">
        <div className="flex flex-col items-center w-1/4">
          {!selectedImage ? (
            <label
              htmlFor="image-upload"
              className="w-full h-64 rounded-xl cursor-pointer bg-slate-500 flex items-center justify-center"
            >
              <input
                type="file"
                id="image-upload"
                className="hidden"
                onChange={handleImageChange}
                accept="image/*"
              />
              <span className="text-white text-lg font-bold">Upload Photo</span>
            </label>
          ) : (
            <label
              htmlFor="image-upload"
              className="relative w-full h-64 rounded-xl cursor-pointer"
            >
              <input
                type="file"
                id="image-upload"
                className="hidden"
                onChange={handleImageChange}
                accept="image/*"
              />
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Film Cover"
                className="w-full h-64 object-cover rounded-xl"
              />
            </label>
          )}
          <button
            type="submit"
            className="mt-4 bg-slate-500 text-white rounded-lg w-2/5 h-10"
          >
            Submit
          </button>
        </div>

        <div className="flex flex-col w-3/4 gap-4">
          <div className="flex gap-4">
            <div className="w-1/2">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                className="bg-slate-400 text-white p-2 rounded w-full"
                value={newFilm.title}
                onChange={(e) =>
                  setNewFilm({ ...newFilm, title: e.target.value })
                }
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="alt-title">Alternative Title</label>
              <input
                type="text"
                name="alt-title"
                id="alt-title"
                className="bg-slate-400 text-white p-2 rounded w-full"
                value={newFilm.altTitle}
                onChange={(e) =>
                  setNewFilm({ ...newFilm, altTitle: e.target.value })
                }
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="year">Year</label>
              <Select
                name="year"
                id="year"
                className="text-black w-full mt-2"
                options={years}
                value={years.find((y) => y.value === newFilm.year)}
                onChange={(selectedOption) =>
                  setNewFilm({ ...newFilm, year: selectedOption.value })
                }
                placeholder="Select Year"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="country">Country</label>
              <Select
                name="country"
                id="country"
                className="text-black w-full mt-2"
                options={countries}
                value={newFilm.country}
                onChange={(selectedOption) =>
                  setNewFilm({ ...newFilm, country: selectedOption })
                }
                placeholder="Select Country"
              />
            </div>
          </div>

          <div>
            <label htmlFor="synopsis">Synopsis</label>
            <textarea
              name="synopsis"
              id="synopsis"
              className="bg-slate-400 text-white p-2 rounded w-full"
              rows="4"
              value={newFilm.synopsis}
              onChange={(e) =>
                setNewFilm({ ...newFilm, synopsis: e.target.value })
              }
            ></textarea>
          </div>

          <div>
            <label htmlFor="available">Availability</label>
            <input
              type="text"
              name="available"
              id="available"
              className="bg-slate-400 text-white p-2 rounded w-full"
              value={newFilm.availability}
              onChange={(e) =>
                setNewFilm({ ...newFilm, availability: e.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="genre">Select Genre(s)</label>
            <Select
              options={genres}
              isMulti
              value={selectedGenres}
              onChange={setSelectedGenres}
              className="text-black w-full mt-2"
              placeholder="Choose genres..."
            />
          </div>

          <div>
            <label htmlFor="actor">Select Actor(s) (Up to 9)</label>
            <Select
              options={actors}
              isMulti
              value={selectedActors}
              onChange={setSelectedActors}
              className="text-black w-full mt-2"
              placeholder="Choose actors..."
              components={{ Option: customOption }}
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="trailer">Link Trailer</label>
              <input
                type="text"
                name="trailer"
                id="trailer"
                className="bg-slate-400 text-white p-2 rounded w-full"
                value={newFilm.trailer}
                onChange={(e) =>
                  setNewFilm({ ...newFilm, trailer: e.target.value })
                }
              />
            </div>
            <div className="flex-1">
              <label htmlFor="award">Award</label>
              <Select
                name="award"
                id="award"
                isMulti
                className="text-black w-full mt-2"
                options={awards}
                value={selectedAwards}
                onChange={setSelectedAwards}
                placeholder="Select Award"
              />
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

export default InputFilm;
