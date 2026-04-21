import { CommentDto } from "./comment";

export interface ProjectDetailDto {
  id: number;
  thumbnailInfo: {
    id: number;
    uuid: string;
    name: string;
    mimeType: string;
  };
  posterInfo: {
    id: number;
    uuid: string;
    name: string;
    mimeType: string;
  };
  projectName: string;
  projectType: string; //RESEARCH_AND_BUSINESS_FOUNDATION, LAB, STARTUP, CLUB
  projectCategory: string; //COMPUTER_VISION, SYSTEM_NETWORK, WEB_APPLICATION, SECURITY_SOFTWARE_ENGINEERING, NATURAL_LANGUAGE_PROCESSING, BIG_DATA_ANALYSIS, AI_MACHINE_LEARNING, INTERACTION_AUGMENTED_REALITY
  teamName: string;
  youtubeId: string;
  year: number;
  awardStatuses: string[]; //FIRST, SECOND, THIRD, FOURTH, FIFTH
  studentNames: string[];
  professorNames: string[];
  likeCount: number;
  like: boolean;
  bookMark: boolean;
  url: string;
  description: string;
  comments: CommentDto[];
}
