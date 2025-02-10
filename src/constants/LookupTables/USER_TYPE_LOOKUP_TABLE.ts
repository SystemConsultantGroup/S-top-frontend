import { Role } from "@/types/user";

export const USER_TYPE_LOOKUP_TABLE: Record<Role, string> = {
  STUDENT: "학생",
  PROFESSOR: "교수",
  COMPANY: "기업관계자",
  ADMIN: "관리자",
  INACTIVE_PROFESSOR: "미승인 교수",
  INACTIVE_COMPANY: "미승인 기업관계자",
  OTHERS: "기타",
  EXTERNAL: "외부인",
  TEMP: "임시",
};
