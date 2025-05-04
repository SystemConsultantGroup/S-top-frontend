/**
 * @param bgColor - 16진수의 배경색 (e.g. #FFFFFF)
 * @description - 배경색에 따라 텍스트 색상을 결정하는 함수입니다.
 *               배경색이 어두운 경우 "white"를, 밝은 경우 "black"을 반환합니다.
 */
export const getTextColorByBgColor = (bgColor: string) => {
  const rgb = parseInt(bgColor.substring(1), 16);
  const [r, g, b] = [(rgb >> 16) & 0xff, (rgb >> 8) & 0xff, rgb & 0xff];
  const Y = 0.2126 * r + 0.7152 * g + 0.0722 * b; // Luminance by ITU-R BT.709
  return Y < 127.5 ? "white" : "black";
};
