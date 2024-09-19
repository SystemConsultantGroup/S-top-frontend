import { render, screen } from "@/utils/test-utils";
import { Paginations } from "./Pagination";
import "@testing-library/jest-dom";

describe("Pagenation component", () => {
  it("renders correctly with the given label", () => {
    render(<Paginations data={[]} paginShow={10} paginJustify="center" paginMarginTop="20px" />);
    // More on screen queries: https://testing-library.com/docs/queries/about
    // More on jest expect Api: https://jestjs.io/docs/expect
    expect(screen.getByRole("button", { name: "Button" })).toBeInTheDocument();
  });
});
