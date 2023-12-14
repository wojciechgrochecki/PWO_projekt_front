import SeedDatabase from "../../components/AdminPanel/SeedDatabase/SeedDatabase";
import { render, screen } from "@testing-library/react";
import { useAuth } from "../../hooks/auth";

vi.mock("../../hooks/auth");

describe("Integration test: SeedDatabase component", () => {
  beforeEach(() => {
    useAuth.mockReturnValue({
      logout: vi.fn(),
      token: "mockedtoken",
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders SeedDatabase children", () => {
    render(<SeedDatabase />);
    expect(
      screen.getByRole("button", {
        name: /Importuj stopy procentowe/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /Importuj ceny mieszkań/i,
      })
    ).toBeInTheDocument();
  });
});
