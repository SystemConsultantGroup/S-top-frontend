import { Dropdown } from "@/components/common/Dropdown/Dropdown";
import { IDropdownList, IDropdownItem } from "../types/types";

export function DropdownList({ onYearSelect, onKindSelect, onFieldSelect }: IDropdownList) {
  const dropdownItems: IDropdownItem[] = [
    {
      placeholder: "연도",
      options: ["2022", "2023", "2024"].reverse(),
      onOptionClick: onYearSelect,
    },
    {
      placeholder: "프로젝트 종류",
      options: ["연구실", "산학과제", "창업/SPARK", "동아리"],
      onOptionClick: onKindSelect,
    },
    {
      placeholder: "프로젝트 분야",
      options: [
        "AI/머신러닝",
        "인터랙션/증강현실",
        "컴퓨터 비전",
        "보안/SW공학",
        "시스템/네트워크",
        "자연어 처리",
        "빅데이터 분석",
        "웹/어플리케이션",
      ],
      onOptionClick: onFieldSelect,
    },
  ];

  return (
    <>
      {dropdownItems.map((item, idx) => (
        <Dropdown key={idx} {...item} />
      ))}
    </>
  );
}
