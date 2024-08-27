import { render, screen } from "@/utils/test-utils";
import { Statics } from "./Statics";
import "@testing-library/jest-dom";
const array: number[] = Array(0);
for (let i = 0; i < 9; i++) {
  array.push(Math.random() * 100 + 100);
}
describe("Pagenation component", () => {
  it("renders correctly with the given label", () => {
    render(
      <Statics
        values={array}
        plotvalues={array}
        maxWidth={800}
        maxHeight={1200}
        viewSize={0.4}
        maxMaxHeight={0.8}
        rectFill={"#ADADAD"}
        rectStrokeFill={"#858585"}
        rectStrokeWidth={0.2}
        circleRadius={0.4}
        circleFill={"#9A9A9A"}
        circleStrokeFill={"#454545"}
        circleStrokeWidth={0.3}
        pathStroke={"#BCBCBC"}
        pathWidth={10}
        labels={[]}
        labelAlign={"center"}
      />
    );
    // More on screen queries: https://testing-library.com/docs/queries/about
    // More on jest expect Api: https://jestjs.io/docs/expect
    expect(screen.getByRole("button", { name: "Button" })).toBeInTheDocument();
  });
});
