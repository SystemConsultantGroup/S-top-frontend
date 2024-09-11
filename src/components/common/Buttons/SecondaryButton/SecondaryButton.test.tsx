import { render, screen } from "@/utils/test-utils";
import { SecondaryButton } from "./SecondaryButton";
import "@testing-library/jest-dom";

describe("SecondaryButton component", () => {
  it("renders correctly with the given label", () => {
    render(<SecondaryButton>Button</SecondaryButton>);
    // More on screen queries: https://testing-library.com/docs/queries/about
    // More on jest expect Api: https://jestjs.io/docs/expect
    expect(screen.getByRole("button", { name: "Button" })).toBeInTheDocument();
  });
});
