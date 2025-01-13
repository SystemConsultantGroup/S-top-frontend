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
  thumbnailInfo: {
    id: 1,
    uuid: "썸네일 uuid 1",
    name: "썸네일 파일 이름 1",
    mimeType: "썸네일 mime 타입 1",
  },
  projectName: "프로젝트 이름 1",
  teamName: "팀 이름 1",
  studentNames: ["학생 이름 1", "학생 이름 2"],
  professorNames: ["교수 이름 1"],
  projectType: "STARTUP",
  projectCategory: "BIG_DATA_ANALYSIS",
  awardStatus: "FIRST",
  year: 2023,
  likeCount: 100,
  like: false,
  bookMark: false,
  url: "프로젝트 URL",
  description: "프로젝트 설명",
};
