import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import InputFilm from "./inputFilm";

jest.mock("axios");

describe("InputFilm Component", () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: [] });
    axios.post.mockResolvedValue({ data: { success: true } });

    global.alert = jest.fn();
    global.localStorage = { getItem: jest.fn(() => "dummy_token") };
    global.URL.createObjectURL = jest.fn(() => "mock-url");
    global.FileReader = jest.fn().mockImplementation(() => ({
      readAsDataURL: jest.fn(function () {
        this.result = "data:image/jpg;base64,MockBase64String";
        this.onloadend();
      }),
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders InputFilm component", async () => {
    await act(async () => {
      render(<InputFilm />);
    });

    // Check if form elements are rendered
    expect(screen.getByLabelText("title-input")).toBeInTheDocument();
    expect(screen.getByLabelText("image-upload")).toBeInTheDocument();
    expect(screen.getByLabelText("alt-title")).toBeInTheDocument();
    expect(screen.getByLabelText("year")).toBeInTheDocument();
    expect(screen.getByLabelText("country")).toBeInTheDocument();
    expect(screen.getByLabelText("synopsis")).toBeInTheDocument();
    expect(screen.getByLabelText("availability")).toBeInTheDocument();
    expect(screen.getByLabelText("genres")).toBeInTheDocument();
    expect(screen.getByLabelText("actors")).toBeInTheDocument();
    expect(screen.getByLabelText("trailer-input")).toBeInTheDocument();
    expect(screen.getByLabelText("awards")).toBeInTheDocument();
  });

  //   test("handles form submission successfully", async () => {
  //     axios.post.mockResolvedValue({ data: { success: true } });

  //     await act(async () => {
  //       render(<InputFilm />);
  //     });

  //     // Fill out the form
  //     fireEvent.change(screen.getByLabelText("title-input"), {
  //       target: { value: "Test Movie" },
  //     });

  //     // Mock file upload
  //     fireEvent.change(screen.getByLabelText("image-upload"), {
  //       target: {
  //         files: [new File(["test"], "test.jpg", { type: "image/jpg" })],
  //       },
  //     });

  //     fireEvent.change(screen.getByLabelText("synopsis"), {
  //       target: { value: "This is a test synopsis." },
  //     });

  //     // Mock year selection using userEvent
  //     const yearSelect = screen.getByLabelText("year");
  //     userEvent.click(yearSelect); // Open the dropdown
  //     const option = screen.getByText("2024");
  //     userEvent.click(option); // Select the option

  //     fireEvent.change(screen.getByLabelText("country"), {
  //       target: { value: "USA" },
  //     });
  //     fireEvent.change(screen.getByLabelText("availability"), {
  //       target: { value: "Available" },
  //     });
  //     fireEvent.change(screen.getByLabelText("genres"), {
  //       target: { value: "Action" },
  //     });
  //     fireEvent.change(screen.getByLabelText("actors"), {
  //       target: { value: "Actor 1" },
  //     });
  //     fireEvent.change(screen.getByLabelText("trailer-input"), {
  //       target: { value: "http://example.com/trailer" },
  //     });
  //     fireEvent.change(screen.getByLabelText("awards"), {
  //       target: { value: "Best Film" },
  //     });

  //     // Mock selected actors, genres, and awards
  //     const selectedActors = [{ value: "Actor 1" }];
  //     const selectedGenres = [{ value: "Action" }];
  //     const selectedAwards = [{ value: "Best Film" }];

  //     // Trigger form submission
  //     fireEvent.click(screen.getByRole("button", { name: /submit/i }));

  //     // Wait for axios to complete and ensure it's called
  //     await waitFor(() => {
  //       expect(axios.post).toHaveBeenCalledTimes(1);
  //     });

  //     console.log(axios.post.mock.calls);

  //     // Verify that axios.post is called with the correct data
  //     expect(axios.post).toHaveBeenCalledWith(
  //       "http://localhost:8000/api/add-film",
  //       expect.objectContaining({
  //         title: "Test Movie",
  //         image: "data:image/jpg;base64,MockBase64String", // Mocked Base64 string
  //         description: "This is a test synopsis.",
  //         release_date: "2024", // Make sure the year is passed as expected
  //         country_id: "USA",
  //         trailer: "http://example.com/trailer",
  //         availability: "Available",
  //         actors: selectedActors.map((actor) => actor.value),
  //         genres: selectedGenres.map((genre) => genre.value),
  //         awards: selectedAwards.map((award) => award.value),
  //         remember_token: "dummy_token",
  //       })
  //     );
  //   });
});
