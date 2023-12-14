import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navigation from ".";
import { useAuth } from "../../hooks/auth";
import * as jwt from "jwt-decode";

vi.mock("../../hooks/auth");

describe("Navigation Component", () => {
  beforeEach(() => {
    useAuth.mockReturnValue({
      logout: vi.fn(),
      token: "your_mocked_token_value",
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders Navigation component with admin link for admin user", () => {
    vi.spyOn(jwt, "jwtDecode").mockReturnValue({ ROLES: ["ADMIN"] });

    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    expect(screen.getByText("PWO")).toBeInTheDocument();
    expect(screen.getByText("Panel admina")).toBeInTheDocument();
    expect(screen.getByText("Wyloguj")).toBeInTheDocument();
  });

  it("renders Navigation component without admin link for non-admin user", () => {
    vi.spyOn(jwt, "jwtDecode").mockReturnValue({ ROLES: ["USER"] });

    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    expect(screen.getByText("PWO")).toBeInTheDocument();
    expect(screen.queryByText("Panel admina")).not.toBeInTheDocument();
    expect(screen.getByText("Wyloguj")).toBeInTheDocument();
  });

  it("calls logout function when logout button is clicked", () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    const logoutButton = screen.getByText("Wyloguj");
    fireEvent.click(logoutButton);

    expect(useAuth().logout).toHaveBeenCalled();
  });
});
