import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { VideoCard } from "./VideoCard";

// Mock function for onBookmarkToggle
const mockOnBookmarkToggle = jest.fn();

describe("VideoCard", () => {
  const defaultProps = {
    title: "뤼튼 테크놀로지스",
    subtitle: "현지웅 엔지니어님",
    videoUrl: "https://www.youtube.com/embed/OBsR6UumFdc",
    bookmarked: false,
    onBookmarkToggle: mockOnBookmarkToggle,
  };

  test("renders VideoCard component", () => {
    render(<VideoCard {...defaultProps} />);
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.subtitle)).toBeInTheDocument();
  });

  test("calls onBookmarkToggle when bookmark icon is clicked", () => {
    render(<VideoCard {...defaultProps} />);
    const bookmarkIcon = screen.getByTestId("bookmark-icon");
    fireEvent.click(bookmarkIcon);
    expect(mockOnBookmarkToggle).toHaveBeenCalledTimes(1);
  });

  test("renders bookmarked icon when bookmarked prop is true", () => {
    render(<VideoCard {...defaultProps} bookmarked={true} />);
    const bookmarkIcon = screen.getByTestId("bookmark-icon");

    // Ensure bookmarkIcon is found
    expect(bookmarkIcon).toBeInTheDocument();

    // Ensure the SVG path is found
    const path = bookmarkIcon.querySelector("svg path");
    expect(path).toBeInTheDocument();

    // Ensure the fill attribute is as expected
    if (path) {
      expect(path.getAttribute("fill")).toBe("#36618E");
    }
  });

  test("renders un-bookmarked icon when bookmarked prop is false", () => {
    render(<VideoCard {...defaultProps} bookmarked={false} />);
    const bookmarkIcon = screen.getByTestId("bookmark-icon");

    // Ensure bookmarkIcon is found
    expect(bookmarkIcon).toBeInTheDocument();

    // Ensure the SVG path is found
    const path = bookmarkIcon.querySelector("svg path");
    expect(path).toBeInTheDocument();

    // Ensure the fill attribute is as expected
    if (path) {
      expect(path.getAttribute("fill")).toBe("none");
    }
  });
});
