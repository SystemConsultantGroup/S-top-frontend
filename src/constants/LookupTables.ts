import { ProjectCategory } from "@/types/project";

export const PROJECT_CATEGORY_LOOKUP_TABLE: Record<ProjectCategory, string> = {
  COMPUTER_VISION: "컴퓨터 비전",
  SYSTEM_NETWORK: "시스템/네트워크",
  WEB_APPLICATION: "웹/애플리케이션",
  SECURITY_SOFTWARE_ENGINEERING: "보안/소프트웨어공학",
  NATURAL_LANGUAGE_PROCESSING: "자연어처리",
  BIG_DATA_ANALYSIS: "빅데이터분석",
  AI_MACHINE_LEARNING: "AI/머신러닝",
  INTERACTION_AUGMENTED_REALITY: "인터랙션/증강현실",
};
