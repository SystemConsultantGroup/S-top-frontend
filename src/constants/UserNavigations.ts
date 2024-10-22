interface INavItem {
  name: string;
  link: string;
}

interface INavList {
  title: string;
  items: INavItem[];
}

export type USER_NAV_NAMES = (typeof USER_NAVS)[number]["title"];
export const USER_NAVS: INavList[] = [
  {
    title: "Projects",
    items: [
      {
        name: "전체보기",
        link: "#",
      },
      {
        name: "AI/머신러닝",
        link: "#",
      },
      {
        name: "인터랙션/증강현실",
        link: "#",
      },
      {
        name: "컴퓨터 비전",
        link: "#",
      },
      {
        name: "보안/SW공학",
        link: "#",
      },
      {
        name: "시스템/네트워크",
        link: "#",
      },
      {
        name: "자연어 처리",
        link: "#",
      },
      {
        name: "빅데이터 분석",
        link: "#",
      },
      {
        name: "웹/어플리케이션",
        link: "#",
      },
    ],
  },
  {
    title: "Interviews",
    items: [
      {
        name: "대담 영상",
        link: "#",
      },
      {
        name: "퀴즈 챌린지",
        link: "#",
      },
    ],
  },
  {
    title: "Job Fair",
    items: [
      {
        name: "선배님들의 조언",
        link: "#",
      },
      {
        name: "인턴들의 이야기",
        link: "#",
      },
      {
        name: "채용 포지션",
        link: "#",
      },
    ],
  },
  {
    title: "AI Hub",
    items: [
      {
        name: "AI Model",
        link: "#",
      },
      {
        name: "AI Dataset",
        link: "#",
      },
    ],
  },
  {
    title: "Events",
    items: [
      {
        name: "갤러리",
        link: "#",
      },
      {
        name: "이벤트 공지사항",
        link: "#",
      },
    ],
  },
  {
    title: "Info Desk",
    items: [
      {
        name: "S-TOP 소개",
        link: "#",
      },
      {
        name: "산학협력프로젝트 소개",
        link: "#",
      },
      {
        name: "산학협력 과제 제안",
        link: "#",
      },
      {
        name: "프로젝트 QnA",
        link: "#",
      },
    ],
  },
];
