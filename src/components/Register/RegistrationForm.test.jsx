import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import RegistrationForm from "./RegistrationForm";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

vi.mock("axios");

describe("Test RegistrationForm component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders registration form", () => {
    render(
      <BrowserRouter>
        <RegistrationForm />
      </BrowserRouter>
    );
    expect(screen.getByText("Utwórz nowe konto")).toBeInTheDocument();
  });

  it("submits the form and shows success toast on successful registration", async () => {
    const mockPost = axios.post.mockResolvedValueOnce(); // Mock a successful POST request
    render(
      <BrowserRouter>
        <RegistrationForm />
        <ToastContainer hideProgressBar autoClose={1500} />
      </BrowserRouter>
    );
    fireEvent.change(screen.getByLabelText("Login"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText("Hasło"), {
      target: { value: "password123" },
    });

    fireEvent.submit(screen.getByRole("button", { name: "Zarejestruj się" }));

    await waitFor(() => {
      expect(mockPost).toHaveBeenCalledTimes(1); // Check if axios.post is called once
      expect(mockPost).toHaveBeenCalledWith("auth/register", {
        username: "testuser",
        password: "password123",
      });
      expect(
        screen.getByText("Konto zostało poprawnie założone")
      ).toBeInTheDocument();
    });
  });
});
