import { render, screen } from "@/utils/test-utils";
import { Project } from "./Project";
import "@testing-library/jest-dom";

describe("Project Page", () => {
  it("renders correctly with the initial stage.", () => {
    render(<Project />);
    expect(screen.getByRole("region", { name: "Project Page" })).toBeInTheDocument();
  });
});
