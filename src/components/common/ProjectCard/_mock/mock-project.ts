import { IProjectContent } from "@/types/project";

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

export const MockProjectData: IProjectContent = {
  id: 1,
  projectName: "GPT 기반의 일상 대화형 챗봇 모델 개발",
  projectCategory: "AI_MACHINE_LEARNING",
  studentNames: ["조민규", "조하빈", "장준우", "김예윤", "신준서"],
  teamName: "바이브컴퍼니",
  professorNames: ["박희선"],
  likeCount: 63,
  like: false,
  bookMark: true,
  thumbnailInfo: {
    id: 0,
    uuid: "",
    name: "",
    mimeType: "",
  },
  projectType: "RESEARCH_AND_BUSINESS_FOUNDATION",
  awardStatus: "NONE",
  techStacks: [],
};
