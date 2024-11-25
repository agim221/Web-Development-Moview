import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "./login"; // Update with the correct path to your component
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import { createMemoryHistory } from "history";

jest.mock("axios");

describe("LoginPage", () => {
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

  test("renders the login form correctly", () => {
    render(
      <MemoryRouter
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <LoginPage setRole={() => {}} />
      </MemoryRouter>
    );

    expect(screen.getByLabelText("username")).toBeInTheDocument();
    expect(screen.getByLabelText("password")).toBeInTheDocument();
    expect(screen.getByText("Sign in")).toBeInTheDocument();
    expect(screen.getByText("Sign in with Google")).toBeInTheDocument();
  });

  test("displays API error message", async () => {
    // Mock API response
    axios.post.mockImplementationOnce(() =>
      Promise.reject({
        response: {
          status: 400,
          error: "Invalid password",
        },
      })
    );

    render(
      <MemoryRouter
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <LoginPage setRole={() => {}} />
      </MemoryRouter>
    );

    // Fill in the form with invalid data
    fireEvent.change(screen.getByLabelText("username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText("password"), {
      target: { value: "wrongpass" },
    });

    // Submit the form
    fireEvent.click(screen.getByText("Sign in"));
    // Wait for the error message to appear
    await waitFor(() =>
      expect(screen.getByTestId("message").textContent).toBe(
        "Email or password is incorrect"
      )
    );
  });

  test("Email or password is required", async () => {
    axios.post.mockImplementationOnce(() => Promise.reject({ status: 400 }));

    render(
      <MemoryRouter
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <LoginPage setRole={() => {}} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Sign in"));

    expect(screen.getByTestId("message").textContent).toBe(
      "Email or password is required"
    );
  });

  test("logs in successfully as user", async () => {
    const mockSetRole = jest.fn();

    axios.post.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          role: "user",
          remember_token: "sample_token",
        },
      })
    );

    render(
      <MemoryRouter
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
        initialEntries={["/login"]}
      >
        <LoginPage setRole={mockSetRole} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText("username"), {
      target: { value: "testuser" },
    });

    fireEvent.change(screen.getByLabelText("password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText("Sign in"));

    await waitFor(() => {
      expect(mockSetRole).toHaveBeenCalledWith("user");
    });
  });

  test("logs in successfully as admin and navigates", async () => {
    const mockSetRole = jest.fn();

    axios.post.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          role: "admin",
          remember_token: "sample_token",
        },
      })
    );

    render(
      <MemoryRouter
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
        location={history.location}
        navigator={history}
      >
        <LoginPage setRole={mockSetRole} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText("username"), {
      target: { value: "admin" },
    });

    fireEvent.change(screen.getByLabelText("password"), {
      target: { value: "admin" },
    });

    fireEvent.click(screen.getByText("Sign in"));

    await waitFor(() => {
      expect(mockSetRole).toHaveBeenCalledWith("admin");
    });
  });

  test("logs in successfully as blocked account", async () => {
    axios.post.mockImplementationOnce(() =>
      Promise.reject({ response: { status: 403 } })
    );

    render(
      <MemoryRouter
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <LoginPage setRole={() => {}} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText("username"), {
      target: { value: "blockuser" },
    });

    fireEvent.change(screen.getByLabelText("password"), {
      target: { value: "blockuser12" },
    });

    fireEvent.click(screen.getByText("Sign in"));

    await waitFor(() => {
      expect(screen.getByTestId("message").textContent).toBe(
        "Your account has been blocked"
      );
    });
  });

  //   test("displays loading spinner while submitting", async () => {
  //     mock.onPost("http://localhost:8000/login").reply(200, {
  //       role: "user",
  //       remember_token: "sample_token",
  //     });

  //     render(
  //       <MemoryRouter>
  //         <LoginPage setRole={() => {}} />
  //       </MemoryRouter>
  //     );

  //     fireEvent.change(screen.getByPlaceholderText("Username"), {
  //       target: { value: "testuser" },
  //     });
  //     fireEvent.change(screen.getByPlaceholderText("Password"), {
  //       target: { value: "password123" },
  //     });
  //     fireEvent.click(screen.getByText("Sign in"));

  //     expect(screen.getByRole("status")).toBeInTheDocument(); // This checks for loading spinner
  //   });
});
