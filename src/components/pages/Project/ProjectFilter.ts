interface IDropdownItem {
  placeholder: string;
  options: string[];
}

export const DropdownList: IDropdownItem[] = [
  {
    placeholder: "연도",
    options: ["2022", "2023", "2024"].reverse(),
    // options의 경우 DB에서 받아와야할 듯
  },
  {
    placeholder: "프로젝트 종류",
    options: ["연구실", "산학과제", "창업/SPARK", "동아리"],
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
  },
];

const ADD = "ADD";
const DELETE = "DELETE";

interface IFilterState {
  category: "YEAR" | "KIND" | "FIELD";
  label: string;
}

interface IAction {
  type: "ADD" | "DELETE";
  payload: IFilterState;
}

export function filterReducer(state: IFilterState[], action: IAction): IFilterState[] {
  switch (action.type) {
    case ADD:
      return state.concat(action.payload);
    case DELETE:
      return state.filter((item) => item.label !== action.payload.label);
  }
}
