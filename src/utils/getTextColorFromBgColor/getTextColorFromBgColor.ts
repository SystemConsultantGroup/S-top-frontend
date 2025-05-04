/**
 * @param bgColor - 16진수의 배경색 (e.g. #RRGGBB)
 * @description - 배경색에 따라 텍스트 색상을 결정하는 함수입니다.
 *              - 배경색이 어두운 경우 "white"를, 밝은 경우 "black"을 반환합니다.
 *              - 배경색이 유효한 16진수 색상 코드가 아닐 경우 기본적으로 "black"을 반환합니다.
 */
export const getTextColorByBgColor = (bgColor: string) => {
  if (!/^#[0-9a-fA-F]{6}$/.test(bgColor)) return "black";

  const rgb = parseInt(bgColor.substring(1), 16);
  const [r, g, b] = [(rgb >> 16) & 0xff, (rgb >> 8) & 0xff, rgb & 0xff];
  const Y = 0.2126 * r + 0.7152 * g + 0.0722 * b; // Luminance by ITU-R BT.709
  const threshold = 0xff / 2;
  return Y < threshold ? "white" : "black";
};
