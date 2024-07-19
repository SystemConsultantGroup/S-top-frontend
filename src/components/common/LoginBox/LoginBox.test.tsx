import React from "react";
import { render, screen } from "@/utils/test-utils";
import { LoginBox } from "./LoginBox";
import "@testing-library/jest-dom";

describe("LoginBox component", () => {
  it("renders correctly", () => {
    render(<LoginBox />);
    expect(screen.getByAltText("Logo")).toBeInTheDocument();
    expect(screen.getByAltText("카카오 로그인")).toBeInTheDocument();
    expect(screen.getByAltText("네이버 로그인")).toBeInTheDocument();
  });
});
