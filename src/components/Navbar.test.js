import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Navbar";
import mockAxios from "jest-mock-axios";

describe("Navbar", () => {
  const mockToggleFilterBar = jest.fn();
  const mockSetSearchText = jest.fn();
  const mockSetFilterData = jest.fn();
  const mockSetSearchBy = jest.fn();

  beforeEach(() => {
    render(
      <Router>
        <Navbar
          toggleFilterBar={mockToggleFilterBar}
          setSearchText={mockSetSearchText}
          setFilterData={mockSetFilterData}
          searchBy="title"
          setSearchBy={mockSetSearchBy}
        />
      </Router>
    );
  });

  afterEach(() => {
    mockAxios.reset();
  });

  test("renders Navbar component", () => {
    expect(screen.getByText(/Moview/i)).toBeInTheDocument();
  });

  test("search input updates on change", () => {
    const searchInput = screen.getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "Inception" } });
    expect(searchInput.value).toBe("Inception");
  });

  test("calls setSearchText on form submit", () => {
    const searchInput = screen.getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "Inception" } });

    const searchButton = screen.getByRole("button", { name: /search/i });
    fireEvent.click(searchButton);

    expect(mockSetSearchText).toHaveBeenCalledWith("Inception");
  });
});
