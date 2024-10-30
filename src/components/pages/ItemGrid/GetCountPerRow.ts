/** screen width가 얼만할 때마다 그리드가 달라지는지 그 크기를 매핑한 enum. */
enum Breakpoint {
  Large = 1280,
  Medium = 1024,
  Small = 768,
  ExtraSmall = 0,
}
/**
 * screen width에 따라 그리드 아이템 개수를 반환하는 함수.
 * @param width screen width
 * @returns 그리드 아이템 개수
 */
export function getItemCountPerRow(width: number) {
  if (width >= Breakpoint.Large) {
    return 4;
  } else if (width >= Breakpoint.Medium) {
    return 3;
  } else if (width >= Breakpoint.Small) {
    return 2;
  } else {
    return 1;
  }
}
