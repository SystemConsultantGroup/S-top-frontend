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
  awardStatus: string; //NONE, FIRST, SECOND, THIRD, FOURTH, FIFTH
  studentNames: string[];
  professorNames: string[];
  likeCount: number;
  like: boolean;
  bookMark: boolean;
  url: string;
  description: string;
  comments: CommentDto[];
}

/* 한국어 임의 매핑 -> 추후 수정 */
export function categoryMapping(category: string) {
  switch (category) {
    case "COMPUTER_VISION":
      return "컴퓨터 비전";
    case "SYSTEM_NETWORK":
      return "시스템 네트워크";
    case "WEB_APPLICATION":
      return "웹";
    case "SECURITY_SOFTWARE_ENGINEERING":
      return "보안";
    case "NATURAL_LANGUAGE_PROCESSING":
      return "NLP";
    case "BIG_DATA_ANALYSIS":
      return "빅데이터";
    case "AI_MACHINE_LEARNING":
      return "AI";
    case "INTERACTION_AUGMENTED_REALITY":
      return "증강현실";
    default:
      return "None";
  }
}
