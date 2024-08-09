import { render, screen } from "@/utils/test-utils";
import { OutlinedButton } from "./OutlinedButton";
import "@testing-library/jest-dom";

describe("OutlinedButton component", () => {
  it("renders correctly with the given label", () => {
    render(<OutlinedButton label="Button" />);
    // More on screen queries: https://testing-library.com/docs/queries/about
    // More on jest expect Api: https://jestjs.io/docs/expect
    expect(screen.getByRole("button", { name: "Button" })).toBeInTheDocument();
  });
});
