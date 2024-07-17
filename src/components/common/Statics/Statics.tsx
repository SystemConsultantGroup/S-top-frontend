const data = Array(0);
for (let i = 0; i < 127; i++) {
  data.push(i);
}

export function Statics({}) {
  const ar: number[] = Array(0);
  const MAXH = 1000;
  const MAXW = 1200;
  const VIEW = 0.4;
  for (let i = 0; i < 9; i++) {
    ar.push(Math.random() * 100 + 100);
  }
  const Max = Math.max(...ar);
  const count = ar.length;
  return (
    <>
      <svg
        id="canv"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${MAXW} ${MAXH}`}
        fill="none"
        width={MAXW * VIEW}
        height={MAXH * VIEW}
      >
        {ar.map((e, i) => {
          return (
            <>
              <rect
                x={((i * MAXW) / (count * 2 + count - 1)) * 3}
                y={MAXH - (e / Max) * MAXH * 0.8}
                height={(e / Max) * MAXH * 0.8}
                width={(MAXW / (count * 2 + count - 1)) * 2}
                fill="#000000"
              ></rect>
            </>
          );
        })}
      </svg>
    </>
  );
}
