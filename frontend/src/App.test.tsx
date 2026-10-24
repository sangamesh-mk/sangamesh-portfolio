import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("portfolio shell", () => {
  it("renders identity and primary navigation", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getAllByText(/Sangamesh M Kuri/i).length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: /explore my work/i })).toHaveAttribute("href", "#projects");
    expect(screen.getByRole("navigation", { name: /primary/i })).toBeInTheDocument();
  });
});
