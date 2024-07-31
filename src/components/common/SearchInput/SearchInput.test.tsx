import { render, screen } from "@/utils/test-utils";
import { SearchInput } from "./SearchInput";
import "@testing-library/jest-dom";

describe("SearchInput component", () => {
  it("renders correctly with the given placeholder", () => {
    const props = {
      placeholder: "Input here to search...",
      iconSize: 16,
    };

    render(<SearchInput {...props} />);
    // More on screen queries: https://testing-library.com/docs/queries/about
    // More on jest expect Api: https://jestjs.io/docs/expect
    expect(screen.getByRole("region", { name: "SearchInput" })).toBeInTheDocument();
  });
});
