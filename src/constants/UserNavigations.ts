interface INavItem {
  name: string;
  link: string;
}

interface INavList {
  title: string;
  link?: string;
  items?: INavItem[];
}

export type USER_NAV_NAMES = (typeof USER_NAVS)[number]["title"];
export const USER_NAVS: INavList[] = [
  {
    title: "Projects",
    link: "/projects",
  },
  {
    title: "Interviews",
    items: [
      {
        name: "대담 영상",
        link: "/interviews",
      },
    ],
  },
  {
    title: "Job Fair",
    items: [
      {
        name: "선배님들의 조언",
        link: "/jobfair/advices",
      },
      {
        name: "인턴들의 이야기",
        link: "/jobfair/interns",
      },
      {
        name: "채용 포지션",
        link: "/jobfair/recruitments",
      },
    ],
  },
  {
    title: "AI Hub",
    items: [
      {
        name: "AI Dataset",
        link: "/aihub/datasets",
      },
      {
        name: "AI Model",
        link: "/aihub/models",
      },
    ],
  },
  {
    title: "Events",
    items: [
      {
        name: "갤러리",
        link: "/event/gallery",
      },
      {
        name: "이벤트 공지사항",
        link: "/event/notices",
      },
    ],
  },
  {
    title: "Info Desk",
    items: [
      {
        name: "S-TOP 소개",
        link: "/infodesk/s-top",
      },
      {
        name: "산학협력프로젝트 소개",
        link: "/infodesk/cooperation",
      },
      {
        name: "산학협력 과제 제안",
        link: "/infodesk/proposals",
      },
      {
        name: "프로젝트 QnA",
        link: "/infodesk/inquries",
      },
    ],
  },
];
