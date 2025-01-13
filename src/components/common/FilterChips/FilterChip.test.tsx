import React from "react";
import { render, screen, fireEvent } from "@/utils/test-utils";
import { FilterChip } from "./FilterChip";
import "@testing-library/jest-dom";

describe("FilterChip component", () => {
  it("renders correctly with the given label", () => {
    render(<FilterChip label="2024" onRemove={() => {}} />);
    expect(screen.getByText("2024")).toBeInTheDocument();
  });

  it("calls onRemove when close button is clicked", () => {
    const onRemove = jest.fn();
    render(<FilterChip label="2024" onRemove={onRemove} />);
    fireEvent.click(screen.getByText("X"));
    expect(onRemove).toHaveBeenCalled();
  });
});

describe("FilterChipReset component", () => {
  it("renders correctly", () => {
    render(<FilterChip label="전체해제" onRemove={() => {}} isReset />);
    expect(screen.getByText("전체해제")).toBeInTheDocument();
  });

  it("does not show the close button", () => {
    render(<FilterChip label="전체해제" onRemove={() => {}} isReset />);
    expect(screen.queryByText("X")).toBeNull();
  });
});
