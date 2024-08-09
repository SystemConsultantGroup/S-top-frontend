import { render, screen } from "@/utils/test-utils";
import "@testing-library/jest-dom";
import { Footer } from "./Footer";

describe("Footer component", () => {
  it("renders correctly when calls", () => {
    render(<Footer />);
    expect(screen.getByRole("region", { name: "Footer" })).toBeInTheDocument();
  });
});
