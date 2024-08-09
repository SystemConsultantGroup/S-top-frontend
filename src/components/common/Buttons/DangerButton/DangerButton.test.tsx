import { render, screen } from "@/utils/test-utils";
import { DangerButton } from "./DangerButton";
import "@testing-library/jest-dom";

describe("DangerButton component", () => {
  it("renders correctly with the given label", () => {
    render(<DangerButton label="Button" />);
    // More on screen queries: https://testing-library.com/docs/queries/about
    // More on jest expect Api: https://jestjs.io/docs/expect
    expect(screen.getByRole("button", { name: "Button" })).toBeInTheDocument();
  });
});
