/**
 *
 * @param sortBy 정렬할 필드값의 이름
 * @param order 정렬 방향 (0: 오름차순, 1: 내림차순)
 * @returns 정렬 문자열
 */
export function getSortString({ sortBy, order }: { sortBy?: string; order?: number }) {
  return `${sortBy},${order === 0 ? "asc" : "desc"}`;
}
