import App from "./App";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

vi.mock("./components/Login/LoginForm", () => {
  return {
    default: () => <div data-testid="mock-login-form">Mocked LoginForm</div>,
  };
});

describe("Test: App.js", () => {
  it("App.js jest poprawnie renderowany", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    // screen.debug();

    expect(screen.getByTestId("mock-login-form")).toBeInTheDocument();
  });
});
