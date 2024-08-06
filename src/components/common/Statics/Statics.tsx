type align = "start" | "end" | "left" | "right" | "center" | "justify" | "match-parent";
export function Statics({
  values,
  labels,
  labelAlign,
  maxWidth,
  maxHeight,
  viewSize,
  maxMaxHeight,
  rectFill,
  rectStrokeFill,
  rectStrokeWidth,
  circleRadius,
  circleFill,
  circleStrokeFill,
  circleStrokeWidth,
  pathStroke,
  pathWidth,
}: {
  values: number[];
  labels: string[];
  labelAlign: align;
  maxWidth: number;
  maxHeight: number;
  viewSize: number;
  maxMaxHeight: number;
  rectFill: string;
  rectStrokeFill: string;
  rectStrokeWidth: number;
  circleRadius: number;
  circleFill: string;
  circleStrokeFill: string;
  circleStrokeWidth: number;
  pathStroke: string;
  pathWidth: number;
}) {
  const Max = Math.max(...values);
  const count = values.length;
  return (
    <>
      <div
        style={{
          height: `${maxHeight * viewSize}`,
          width: `${maxWidth * viewSize}`,
          position: "relative",
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
            d={values
              .map((e, i) => {
                return `${i == 0 ? "M" : "L"} ${(((i + 1 / 3) * maxWidth) / (count * 2 + count - 1)) * 3} ${maxHeight - (e / Max) * maxHeight * maxMaxHeight} `;
              })
              .join("")}
          ></path>
          {values.map((e, i) => {
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
        {labels.map((e, i) => {
          const a = ((i * maxWidth) / (count * 2 + count - 1)) * 3 * viewSize;
          const b = (maxWidth / (count * 2 + count - 1)) * 2 * viewSize;
          return (
            <>
              <p
                style={{
                  left: `${a}px`,
                  width: `${b}px`,
                  textAlign: labelAlign,
                  position: "absolute",
                }}
              >
                {e}
              </p>
            </>
          );
        })}
      </div>
    </>
  );
}
