type NavListType = {
  name: string;
  items: string[];
}[];

export const NavList: NavListType = [
  {
    name: "Projects",
    items: [
      "전체보기",
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
  {
    name: "Interviews",
    items: ["대담 영상", "퀴즈 챌린지"],
  },
  {
    name: "Job Fair",
    items: ["잡페어 인터뷰", "채용 공고"],
  },
  {
    name: "AI Hub",
    items: ["AI Model", "AI Dataset"],
  },
  {
    name: "Events",
    items: ["갤러리", "이벤트 공지사항"],
  },
  {
    name: "Info Desk",
    items: ["S-TOP 소개", "산학협력프로젝트 소개", "산학협력 과제 제안", "프로젝트 QnA"],
  },
];
