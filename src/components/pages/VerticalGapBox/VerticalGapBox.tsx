/**
 * 세로로 배열되는 컴포넌트들의 사이에 여백을 놓는 함수.
 * @param gap 여백 크기
 * @returns 여백이 적용된 styled div
 */
export function VerticalGapBox({ gap }: { gap: string }) {
  return <div style={{ height: gap }}></div>;
}
