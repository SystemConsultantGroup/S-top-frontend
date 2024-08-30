export type ProjectCardDataType = {
  id: number;
  title: string;
  thumbnailUrl: string;
  categories: string[];
  participants: string[];
  team: string;
  advisor: string;
  likes: number;
  isMarked: boolean;
};

export const MockProjectData: ProjectCardDataType = {
  id: 1,
  title: "GPT 기반의 일상 대화형 챗봇 모델 개발",
  thumbnailUrl: "/images/mock-project-thumbnail.png",
  categories: ["AI", "자연어처리"],
  participants: ["조민규", "조하빈", "장준우", "김예윤", "신준서"],
  team: "바이브컴퍼니",
  advisor: "박희선",
  likes: 63,
  isMarked: true,
};
