import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import Home from "./home"; // Update with the correct path to your component
import { MemoryRouter } from "react-router-dom";

jest.mock("axios");
jest.mock("../components/FilmList", () => (props) => (
  <div>{props.sectionTitle}</div>
));

jest.mock("../components/FilmCard", () => (props) => (
  <div>
    <h3>{props.title}</h3>
    <p>{props.rating}</p>
    <p>{props.year}</p>
    <img src={props.posterUrl} alt={props.title} />
  </div>
));

describe("Home Page", () => {
  // Reset mock before each test
  beforeEach(() => {
    axios.get.mockReset();
    localStorage.clear();
    localStorage.setItem("remember_token", "sample_token");
    localStorage.setItem(
      "remember_token_expiry",
      new Date(Date.now() + 10000).toISOString()
    );
  });

  // Clean up after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the Home page correctly", async () => {
    render(
      <MemoryRouter
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <Home filterData={[]} searchText="" />
      </MemoryRouter>
    );

    expect(screen.getByText("More Films")).toBeInTheDocument();
  });

  //   test("fetches and displays bookmark data", async () => {
  //     const bookmarks = [
  //       {
  //         id: 1,
  //         title: "Film 1",
  //         rating: 8.5,
  //         release_date: "2021",
  //         image: "image1.jpg",
  //       },
  //       {
  //         id: 2,
  //         title: "Film 2",
  //         rating: 7.5,
  //         release_date: "2020",
  //         image: "image2.jpg",
  //       },
  //     ];

  //     render(
  //       <MemoryRouter
  //         future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
  //       >
  //         <Home filterData={[]} searchText="" />
  //       </MemoryRouter>
  //     );

  //     await waitFor(() => {
  //       expect(screen.getByText("Film 1")).toBeInTheDocument();
  //       expect(screen.getByText("Film 2")).toBeInTheDocument();
  //     });
  //   });

  //   test("handles expired token", async () => {
  //     localStorage.setItem("remember_token", "sample_token");
  //     localStorage.setItem("remember_token_expiry", new Date(Date.now() - 10000).toISOString());

  //     render(
  //       <MemoryRouter>
  //         <Home filterData={[]} searchText="" />
  //       </MemoryRouter>
  //     );

  //     await waitFor(() => {
  //       expect(localStorage.getItem("remember_token")).toBeNull();
  //       expect(localStorage.getItem("remember_token_expiry")).toBeNull();
  //     });
  //   });

  test("scrolls right and left", async () => {
    const bookmarks = [
      {
        id: 1,
        title: "Film 1",
        rating: 8.5,
        release_date: "2021",
        image: "image1.jpg",
      },
      {
        id: 2,
        title: "Film 2",
        rating: 7.5,
        release_date: "2020",
        image: "image2.jpg",
      },
    ];
    axios.get.mockResolvedValueOnce({ data: bookmarks });

    localStorage.setItem("remember_token", "sample_token");
    localStorage.setItem(
      "remember_token_expiry",
      new Date(Date.now() + 10000).toISOString()
    );

    render(
      <MemoryRouter>
        <Home filterData={[]} searchText="" />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Watchlist")).toBeInTheDocument();
    });

    const rightButton = screen.getByTitle("btn-right");
    const leftButton = screen.getByTitle("btn-left");

    fireEvent.click(rightButton);
    fireEvent.click(leftButton);

    // Add assertions to verify scroll behavior if necessary
  });
});
