const data = Array(0);
for (let i = 0; i < 127; i++) {
  data.push(i);
}

export function Statics({
  values,
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
      <svg
        id="canv"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${maxHeight} ${maxWidth}`}
        fill="none"
        height={maxWidth * viewSize}
        width={maxHeight * viewSize}
      >
        {values.map((e, i) => {
          return (
            <>
              <rect
                x={
                  ((i * maxHeight) / (count * 2 + count - 1)) * 3 +
                  ((maxHeight / (count * 2 + count - 1)) * rectStrokeWidth) / 2
                }
                y={
                  maxWidth -
                  (e / Max) * maxWidth * maxMaxHeight +
                  ((maxHeight / (count * 2 + count - 1)) * rectStrokeWidth) / 2
                }
                height={
                  (e / Max) * maxWidth * maxMaxHeight -
                  ((maxHeight / (count * 2 + count - 1)) * 2 * rectStrokeWidth) / 2
                }
                width={
                  (maxHeight / (count * 2 + count - 1)) * 2 -
                  ((maxHeight / (count * 2 + count - 1)) * 2 * rectStrokeWidth) / 2
                }
                fill={rectFill}
                stroke={rectStrokeFill}
                strokeWidth={((maxHeight / (count * 2 + count - 1)) * 2 * rectStrokeWidth) / 2}
              ></rect>
            </>
          );
        })}
        <path
          stroke={pathStroke}
          strokeWidth={pathWidth}
          d={values
            .map((e, i) => {
              return `${i == 0 ? "M" : "L"} ${(((i + 1 / 3) * maxHeight) / (count * 2 + count - 1)) * 3} ${maxWidth - (e / Max) * maxWidth * maxMaxHeight} `;
            })
            .join("")}
        ></path>
        {values.map((e, i) => {
          return (
            <>
              <circle
                cx={(((i + 1 / 3) * maxHeight) / (count * 2 + count - 1)) * 3}
                cy={maxWidth - (e / Max) * maxWidth * maxMaxHeight}
                r={
                  (maxHeight / (count * 2 + count - 1)) * circleRadius * (1 - circleStrokeWidth / 2)
                }
                fill={circleFill}
                stroke={circleStrokeFill}
                strokeWidth={
                  ((maxHeight / (count * 2 + count - 1)) * circleRadius * 2 * circleStrokeWidth) / 2
                }
              ></circle>
            </>
          );
        })}
      </svg>
    </>
  );
}
