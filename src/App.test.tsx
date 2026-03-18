import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders the clean slate headline", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: /start over with a calm, minimal baseline/i })).toBeInTheDocument();
  });
});
