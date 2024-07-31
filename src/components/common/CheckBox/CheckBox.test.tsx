import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CheckBox } from "./CheckBox";

test("renders CheckBox component with label", () => {
  render(<CheckBox label="Label" />);
  expect(screen.getByText("Label")).toBeInTheDocument();
});

test("changes checkbox state on click", () => {
  render(<CheckBox label="Label" />);
  const checkbox = screen.getByText("Label").previousSibling;
  expect(checkbox).toHaveClass("checkbox");
  fireEvent.click(checkbox as HTMLElement);
  expect(checkbox).toHaveClass("checkbox checked");
});
