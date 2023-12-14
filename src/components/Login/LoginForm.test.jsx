import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "./LoginForm";
import { BrowserRouter } from "react-router-dom";
import { useAuth } from "../../hooks/auth";

vi.mock("axios");

vi.mock("../../hooks/auth", () => ({
  useAuth: vi.fn(),
}));

describe("Test LoginForm component", () => {
  beforeEach(() => {
    useAuth.mockReturnValue({
      login: vi.fn(),
      register: vi.fn(),
      token: "secrettoken",
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders login form", () => {
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );
    expect(screen.getByText("Zaloguj się na swoje konto")).toBeInTheDocument();
  });

  it("submits the form and checks login function with correct arguments", async () => {
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText("Login"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText("Hasło"), {
      target: { value: "password123" },
    });

    fireEvent.submit(screen.getByRole("button", { name: "Zaloguj się" }));

    await waitFor(() => {
      expect(useAuth().login).toHaveBeenCalledWith({
        username: "testuser",
        password: "password123",
      });
    });
  });
});
