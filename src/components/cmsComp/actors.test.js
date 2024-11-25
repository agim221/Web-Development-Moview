import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import Actors from "./actors"; // Update with the correct path to your component
import { MemoryRouter } from "react-router-dom";

jest.mock("axios");

describe("Actors Page", () => {
  // Reset mock before each test
  beforeEach(() => {
    axios.get.mockReset();
    axios.post.mockReset();
    axios.put.mockReset();
    axios.delete.mockReset();
  });

  // Clean up after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the Actors page correctly", async () => {
    axios.get.mockResolvedValueOnce({ data: [] });

    render(
      <MemoryRouter
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <Actors />
      </MemoryRouter>
    );

    expect(screen.getByLabelText("label-actor")).toBeInTheDocument();
    expect(screen.getByLabelText("label-photo")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  test("fetches and displays actor data", async () => {
    const actors = [
      { id: 1, name: "Actor 1", photo_url: "photo1.jpg" },
      { id: 2, name: "Actor 2", photo_url: "photo2.jpg" },
    ];
    axios.get.mockResolvedValueOnce({ data: actors });

    render(
      <MemoryRouter
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <Actors />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Actor 1")).toBeInTheDocument();
      expect(screen.getByText("Actor 2")).toBeInTheDocument();
    });
  });

  test("adds a new actor", async () => {
    axios.get.mockResolvedValueOnce({ data: [] });
    axios.post.mockResolvedValueOnce({
      data: { id: 3, name: "New Actor", photo_url: "newphoto.jpg" },
    });

    render(
      <MemoryRouter
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <Actors />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText("input-actor"), {
      target: { value: "New Actor" },
    });
    fireEvent.change(screen.getByLabelText("input-photo"), {
      target: {
        files: [new File(["photo"], "photo.jpg", { type: "image/jpeg" })],
      },
    });

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(screen.getByText("New Actor")).toBeInTheDocument();
    });
  });

  test("edits an actor", async () => {
    const actors = [{ id: 1, name: "Actor 1", photo_url: "photo1.jpg" }];
    axios.get.mockResolvedValueOnce({ data: actors });
    axios.put.mockResolvedValueOnce({
      data: { id: 1, name: "Updated Actor", photo_url: "updatedphoto.jpg" },
    });

    render(
      <MemoryRouter
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <Actors />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Actor 1")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Edit"));

    fireEvent.change(screen.getByLabelText("input-actor"), {
      target: { value: "Updated Actor" },
    });

    fireEvent.click(screen.getByText("Update"));

    await waitFor(() => {
      expect(screen.getByText("Updated Actor")).toBeInTheDocument();
    });
  });

  test("deletes an actor", async () => {
    const actors = [{ id: 1, name: "Actor 1", photo_url: "photo1.jpg" }];
    axios.get.mockResolvedValueOnce({ data: actors });
    axios.delete.mockResolvedValueOnce({});

    render(
      <MemoryRouter
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <Actors />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Actor 1")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Delete"));

    await waitFor(() => {
      expect(screen.queryByText("Actor 1")).not.toBeInTheDocument();
    });
  });

  test("searches for actors", async () => {
    const actors = [{ id: 1, name: "Actor 1", photo_url: "photo1.jpg" }];
    axios.get.mockResolvedValueOnce({ data: actors });
    axios.get.mockResolvedValueOnce({
      data: [{ id: 2, name: "Searched Actor", photo_url: "searchedphoto.jpg" }],
    });

    render(
      <MemoryRouter
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <Actors />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Actor 1")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText("Search actors..."), {
      target: { value: "Searched Actor" },
    });

    fireEvent.click(screen.getByText("Search"));

    await waitFor(() => {
      expect(screen.getByText("Searched Actor")).toBeInTheDocument();
    });
  });
});
