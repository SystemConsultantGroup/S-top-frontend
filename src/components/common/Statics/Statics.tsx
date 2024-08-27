import { Property } from "csstype";
export function Statics({
  values,
  plotvalues = [],
  labels,
  labelAlign = "center",
  maxWidth = 1200,
  maxHeight = 800,
  viewSize = 0.4,
  maxMaxHeight = 0.8,
  rectFill = "#ADADAD",
  rectStrokeFill = "#858585",
  rectStrokeWidth = 0.2,
  circleRadius = 0.4,
  circleFill = "#9A9A9A",
  circleStrokeFill = "#454545",
  circleStrokeWidth = 0.3,
  pathStroke = "#BCBCBC",
  pathWidth = 10,
}: {
  values: number[];
  plotvalues?: number[];
  labels: string[];
  labelAlign?: Property.TextAlign;
  maxWidth?: number;
  maxHeight?: number;
  viewSize?: number;
  maxMaxHeight?: number;
  rectFill?: string;
  rectStrokeFill?: string;
  rectStrokeWidth?: number;
  circleRadius?: number;
  circleFill?: string;
  circleStrokeFill?: string;
  circleStrokeWidth?: number;
  pathStroke?: string;
  pathWidth?: number;
}) {
  const Max = Math.max(...values.concat(plotvalues));
  const count = values.length;
  return (
    <>
      <div
        style={{
          height: `${maxHeight * viewSize}`,
          width: `${maxWidth * viewSize}`,
          position: "sticky",
        }}
      >
        <svg
          id="canv"
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${maxWidth} ${maxHeight}`}
          fill="none"
          width={maxWidth * viewSize}
          height={maxHeight * viewSize}
        >
          {values.map((e, i) => {
            return (
              <>
                <rect
                  x={
                    ((i * maxWidth) / (count * 2 + count - 1)) * 3 +
                    ((maxWidth / (count * 2 + count - 1)) * rectStrokeWidth) / 2
                  }
                  y={
                    maxHeight -
                    (e / Max) * maxHeight * maxMaxHeight +
                    ((maxWidth / (count * 2 + count - 1)) * rectStrokeWidth) / 2
                  }
                  height={
                    (e / Max) * maxHeight * maxMaxHeight -
                    ((maxWidth / (count * 2 + count - 1)) * 2 * rectStrokeWidth) / 2
                  }
                  width={
                    (maxWidth / (count * 2 + count - 1)) * 2 -
                    ((maxWidth / (count * 2 + count - 1)) * 2 * rectStrokeWidth) / 2
                  }
                  fill={rectFill}
                  stroke={rectStrokeFill}
                  strokeWidth={((maxWidth / (count * 2 + count - 1)) * 2 * rectStrokeWidth) / 2}
                ></rect>
              </>
            );
          })}
          <path
            stroke={pathStroke}
            strokeWidth={pathWidth}
            d={plotvalues
              .map((e, i) => {
                return `${i == 0 ? "M" : "L"} ${(((i + 1 / 3) * maxWidth) / (count * 2 + count - 1)) * 3} ${maxHeight - (e / Max) * maxHeight * maxMaxHeight} `;
              })
              .join("")}
          ></path>
          {plotvalues.map((e, i) => {
            return (
              <>
                <circle
                  cx={(((i + 1 / 3) * maxWidth) / (count * 2 + count - 1)) * 3}
                  cy={maxHeight - (e / Max) * maxHeight * maxMaxHeight}
                  r={
                    (maxWidth / (count * 2 + count - 1)) *
                    circleRadius *
                    (1 - circleStrokeWidth / 2)
                  }
                  fill={circleFill}
                  stroke={circleStrokeFill}
                  strokeWidth={
                    ((maxWidth / (count * 2 + count - 1)) * circleRadius * 2 * circleStrokeWidth) /
                    2
                  }
                ></circle>
              </>
            );
          })}
        </svg>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {labels.map((e) => {
            const a = ((maxWidth / (count * 2 + count - 1)) * 3 * viewSize) / 3;
            const b = (maxWidth / (count * 2 + count - 1)) * 2 * viewSize;
            return (
              <>
                <p
                  style={{
                    marginLeft: a / 2,
                    marginRight: a / 2,
                    width: b,
                    display: "inline",
                    textAlign: labelAlign,
                  }}
                >
                  {e}
                </p>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
