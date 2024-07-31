import { render, screen } from "@/utils/test-utils";
import { TextInput } from "./TextInput";
import "@testing-library/jest-dom";

describe("TextInput component", () => {
  it("renders correctly with the label, description, error, and placeholder in option", () => {
    const props = {
      label: "Input label",
      description: "Input description",
      error: "Input error",
      placeholder: "Input inside",
    };

    render(<TextInput {...props} />);
    // More on screen queries: https://testing-library.com/docs/queries/about
    // More on jest expect Api: https://jestjs.io/docs/expect
    expect(screen.getByRole("region", { name: "TextInput" })).toBeInTheDocument();
  });
});
