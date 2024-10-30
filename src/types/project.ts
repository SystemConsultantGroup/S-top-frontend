import { PagedApiResponse } from "./common";

export interface IProjectRequestParams {
  title?: string;
  year?: string | null;
  category?: string | null;
  type?: string | null;
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
  awardStatus: ProjectAwardStatus;
  techStacks: string[];
  likeCount: number;
  like: boolean;
  bookMark: boolean;
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

export type ProjectAwardStatus = "NONE" | "FIRST" | "SECOND" | "THIRD" | "FOURTH" | "FIFTH";

export interface IProjectResponse extends PagedApiResponse<IProjectContent> {}
