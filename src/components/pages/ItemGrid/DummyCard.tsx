/**
 * 프로젝트 그리드를 유지하기 위해 사용되는 더미 아이템을 반환하는 함수.
 * @returns 스타일이 적용된 className을 가진 div
 */
export function DummyCard({ width }: { width: string }) {
  return <div style={{ width }} />;
}
