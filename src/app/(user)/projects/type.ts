/** 프로젝트 필터링 옵션 분류 타입 */
export type OptionKey = "YEAR" | "TYPE" | "CATEGORY";
/**
 * 프로젝트 조회 필터링에 사용되는 옵션의 형태를 지정한 인터페이스.
 *
 * key 값에 "YEAR", "TYPE", "CATEGORY" 세 가지 중 하나를 쓸 수 있고, 해당 딕셔너리에는 카테고리에 맞게 옵션이 저장됨.
 *
 * 예를 들어, key 값이  "YEAR"인 딕셔너리는 프로젝트 연도 드롭다운에서 선택한 옵션을 value에 저장함.
 *
 * @interface IOption
 * @property {("YEAR" | "TYPE" | "CATEGORY")} key
 * @property {string} value
 */
export interface IOption {
  key: OptionKey;
  value: string;
  label: string;
}
