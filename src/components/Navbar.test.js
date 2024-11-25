import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Navbar";

test("updates search input", () => {
  render(
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Navbar />
    </Router>
  );

  const input = screen.getByPlaceholderText("Search");
  fireEvent.change(input, { target: { value: "Test" } });

  expect(input.value).toBe("Test");
});
