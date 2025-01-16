import { Role } from "@/types/user";
import { ProjectAwardStatus } from "@/types/project";

export const USER_TYPE_LOOKUP_TABLE: Record<Role, string> = {
  STUDENT: "학생",
  PROFESSOR: "교수",
  COMPANY: "기업관계자",
  ADMIN: "관리자",
  INACTIVE_PROFESSOR: "미승인 교수",
  INACTIVE_COMPANY: "미승인 기업관계자",
  OTHERS: "기타",
  TEMP: "임시",
};

export const AWARD_TYPE_LOOKUP_TABLE: Record<ProjectAwardStatus, string> = {
  NONE: "미정",
  FIRST: "대상",
  SECOND: "최우수상",
  THIRD: "우수상",
  FOURTH: "인기상",
  FIFTH: "장려상",
};