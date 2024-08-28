import { render, screen } from "@/utils/test-utils";
import { SearchInput } from "./SearchInput";
import "@testing-library/jest-dom";
import { ChangeEvent, KeyboardEvent, MouseEvent, useState } from "react";

describe("SearchInput component", () => {
  it("renders correctly with the given placeholder", () => {
    const [value, setValue] = useState("");

    // Event Handlers
    // Handles input changes and clear actions
    const handleInput = (e: MouseEvent | ChangeEvent, payload?: unknown) => {
      if (e.type === "change") {
        const target = e.target as HTMLInputElement;
        setValue(() => target.value);
      } else if (payload) {
        if (payload === "CLEAR") {
          setValue(() => "");
        }
      }
    };

    // Handles "Enter" key press for search
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Enter") {
        console.log("Enter action makes server to search!");
      }
    };

    const props = {
      value,
      handleInput,
      handleKeyDown,
      placeholder: "Input here to search...",
      iconSize: 16,
    };

    render(<SearchInput {...props} />);
    // More on screen queries: https://testing-library.com/docs/queries/about
    // More on jest expect Api: https://jestjs.io/docs/expect
    expect(screen.getByRole("region", { name: "SearchInput" })).toBeInTheDocument();
  });
});
