import { ProjectCategory, ProjectType } from "@/types/project";

const START_YEAR = 2019;
const NOW = new Date();
const YEAR = NOW.getFullYear();

export const PROJECT_YEAR_LIST = Array.from({ length: YEAR - START_YEAR + 1 }, (_, i) =>
  (START_YEAR + i).toString()
).reverse();

export const PROJECT_TYPE_MAPPED_LIST: Record<ProjectType, string> = {
  RESEARCH_AND_BUSINESS_FOUNDATION: "산학과제",
  LAB: "연구실",
  STARTUP: "창업/SPARK",
  CLUB: "동아리",
};

export const PROJECT_CATEGORY_MAPPED_LIST: Record<ProjectCategory, string> = {
  COMPUTER_VISION: "컴퓨터 비전",
  SYSTEM_NETWORK: "시스템/네트워크",
  WEB_APPLICATION: "웹/애플리케이션",
  SECURITY_SOFTWARE_ENGINEERING: "보안/소프트웨어공학",
  NATURAL_LANGUAGE_PROCESSING: "자연어처리",
  BIG_DATA_ANALYSIS: "빅데이터분석",
  AI_MACHINE_LEARNING: "AI/머신러닝",
  INTERACTION_AUGMENTED_REALITY: "인터랙션/증강현실",
};
