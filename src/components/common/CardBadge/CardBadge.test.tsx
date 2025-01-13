import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CardBadge } from "./CardBadge";

describe("CardBadge component", () => {
  it("applies the color prop to the label text", () => {
    const { getByText } = render(<CardBadge label="Badge" color="red" />);
    const labelElement = getByText("Badge");
    expect(labelElement).toHaveStyle("color: red");
  });
});
