import { render, screen } from "@/utils/test-utils";
import "@testing-library/jest-dom";
import { Header } from "./Header";

describe("PrimaryButton component", () => {
  it("renders correctly with the given label", () => {
    render(<Header />);
    expect(screen.getByRole("region", { name: "Header" })).toBeInTheDocument();
  });
});
