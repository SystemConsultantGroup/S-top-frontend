import { render, screen } from "@/utils/test-utils";
import { Statics, values } from "./Statics";
import "@testing-library/jest-dom";
const array: values[] = Array(0);

for (let i = 0; i < 20; i++) {
  array.push({
    value: Math.random() * 100 + 100,
    plotvalue: i < 7 ? Math.random() * 100 + 100 : undefined,
    label: Math.round(Math.random() * 100 + 100).toString(),
  });
}
describe("Pagenation component", () => {
  it("renders correctly with the given label", () => {
    render(
      <Statics
        values={array}
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
        labelAlign={"center"}
      />
    );
    // More on screen queries: https://testing-library.com/docs/queries/about
    // More on jest expect Api: https://jestjs.io/docs/expect
    expect(screen.getByRole("button", { name: "Button" })).toBeInTheDocument();
  });
});
