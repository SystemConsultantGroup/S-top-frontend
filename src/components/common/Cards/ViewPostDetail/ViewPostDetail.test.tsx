import { render, screen } from "@/utils/test-utils";
import { ViewPostDetail } from "./ViewPostDetail";
import "@testing-library/jest-dom";

describe("Pagenation component", () => {
  it("renders correctly with the given label", () => {
    render(<ViewPostDetail title="" subtitle="" articles={[]} />);
    // More on screen queries: https://testing-library.com/docs/queries/about
    // More on jest expect Api: https://jestjs.io/docs/expect
    expect(screen.getByRole("button", { name: "Button" })).toBeInTheDocument();
  });
});
