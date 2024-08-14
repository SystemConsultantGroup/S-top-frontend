import { render, screen } from "@/utils/test-utils";
import "@testing-library/jest-dom";
import { SubHeadNavbar } from "./SubHeadNavbar";

describe("Sub-Heading Navigation Bar Component", () => {
  it("renders correctly with the given props", () => {
    const props = {
      title: "Info Desk",
    };

    render(<SubHeadNavbar {...props} />);
    expect(screen.getByRole("region", { name: "SubHeadNavbar" })).toBeInTheDocument();
  });
});
