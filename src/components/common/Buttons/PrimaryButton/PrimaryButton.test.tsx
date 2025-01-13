import { render, screen, fireEvent } from "@/utils/test-utils";
import { PrimaryButton } from "./PrimaryButton";
import "@testing-library/jest-dom";

describe("PrimaryButton component", () => {
  it("renders correctly with the given label", () => {
    render(<PrimaryButton>Button</PrimaryButton>);
    // More on screen queries: https://testing-library.com/docs/queries/about
    // More on jest expect Api: https://jestjs.io/docs/expect
    expect(screen.getByRole("button", { name: "Button" })).toBeInTheDocument();
  });

  it("applies the given className", () => {
    const testClassName = "test-class";
    render(<PrimaryButton className={testClassName}>Button</PrimaryButton>);

    expect(screen.getByRole("button", { name: "Button" })).toHaveClass(testClassName);
  });

  it("calls the onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<PrimaryButton onClick={handleClick}>Button</PrimaryButton>);
    fireEvent.click(screen.getByRole("button", { name: "Button" }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
