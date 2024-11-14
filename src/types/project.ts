import { PagedApiResponse } from "./common";

export interface IProjectParams {
  title?: string;
  year?: number;
  category?: ProjectCategory;
  page?: number;
  size?: number;
  sort?: string;
}

export interface IProjectContent {
  id: number;
  thumbnailInfo: {
    id: number;
    uuid: string;
    name: string;
    mimeType: string;
  };
  projectName: string;
  teamName: string;
  studentNames: string[];
  professorNames: string[];
  projectType: ProjectType;
  projectCategory: ProjectCategory;
  awardStatus: AwardStatus;
  techStacks: string[];
  likeCount: number;
  like: boolean;
  bookMark: boolean;
  year: number;
}

export type ProjectType = "RESEARCH_AND_BUSINESS_FOUNDATION" | "LAB" | "STARTUP" | "CLUB";

export type ProjectCategory =
  | "COMPUTER_VISION"
  | "SYSTEM_NETWORK"
  | "WEB_APPLICATION"
  | "SECURITY_SOFTWARE_ENGINEERING"
  | "NATURAL_LANGUAGE_PROCESSING"
  | "BIG_DATA_ANALYSIS"
  | "AI_MACHINE_LEARNING"
  | "INTERACTION_AUGMENTED_REALITY";

export type AwardStatus = "NONE" | "FIRST" | "SECOND" | "THIRD" | "FOURTH" | "FIFTH";

export interface IProjectResponse extends PagedApiResponse<IProjectContent> {}
