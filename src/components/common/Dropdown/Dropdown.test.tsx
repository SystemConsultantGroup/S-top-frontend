import React from "react";
import { render, screen, fireEvent } from "@/utils/test-utils";
import { Dropdown } from "./Dropdown";
import "@testing-library/jest-dom";

describe("Dropdown component", () => {
  const options = ["연도", "작성자", "제목"];

  it("renders correctly with the given placeholder", () => {
    render(<Dropdown placeholder="선택해주세요" options={options} />);
    expect(screen.getByRole("button", { name: "선택해주세요" })).toBeInTheDocument();
  });

  it("toggles the dropdown menu when clicked", () => {
    render(<Dropdown placeholder="선택해주세요" options={options} />);
    const toggleButton = screen.getByRole("button", { name: "선택해주세요" });

    // Initially closed
    expect(screen.queryByText("연도")).not.toBeInTheDocument();

    // Open dropdown
    fireEvent.click(toggleButton);
    expect(screen.getByText("연도")).toBeInTheDocument();

    // Close dropdown
    fireEvent.click(toggleButton);
    expect(screen.queryByText("연도")).not.toBeInTheDocument();
  });

  it("selects an option and closes the dropdown", () => {
    render(<Dropdown placeholder="선택해주세요" options={options} />);
    const toggleButton = screen.getByRole("button", { name: "선택해주세요" });

    // Open dropdown
    fireEvent.click(toggleButton);
    const option = screen.getByText("연도");
    fireEvent.click(option);

    // Check selected option
    expect(screen.getByRole("button", { name: "연도" })).toBeInTheDocument();
    // Check dropdown closed
    expect(screen.queryByText("작성자")).not.toBeInTheDocument();
  });
});
