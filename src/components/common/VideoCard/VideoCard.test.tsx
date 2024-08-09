import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { VideoCard } from "./VideoCard";

describe("VideoCard", () => {
  const defaultProps = {
    title: "뤼튼 테크놀로지스",
    subtitle: "현지웅 엔지니어님",
    videoUrl: "https://www.youtube.com/embed/OBsR6UumFdc",
  };

  test("renders VideoCard component", () => {
    render(<VideoCard {...defaultProps} />);
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.subtitle)).toBeInTheDocument();
  });

  test("toggles bookmark state on click", () => {
    render(<VideoCard {...defaultProps} />);
    const bookmarkIcon = screen.getByRole("button");
    expect(bookmarkIcon).toBeInTheDocument();
    fireEvent.click(bookmarkIcon);
    expect(screen.getByRole("button")).toContainHTML("#36618E");
    fireEvent.click(bookmarkIcon);
    expect(screen.getByRole("button")).toContainHTML("none");
  });
});
