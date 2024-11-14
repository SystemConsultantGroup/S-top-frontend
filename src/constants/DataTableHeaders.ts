import { DataTableHeaderProps } from "@/components/common/DataTable/elements/DataTableHeader";

export const MOCK_TABLE_HEADERS: DataTableHeaderProps[] = [
  { label: "이름", widthPercentage: 7, sort: true, selector: "name" },
  { label: "이메일", widthPercentage: 15, sort: true, selector: "email" },
  { label: "소속", widthPercentage: 15, sort: true, selector: "belonging" },
  { label: "직책", widthPercentage: 7, sort: true, selector: "position" },
  { label: "권한", widthPercentage: 7, sort: true, selector: "role" },
  { label: "가입일시", widthPercentage: 15, sort: true, selector: "createdAt" },
];

export const NOTICE_TABLE_HEADERS: DataTableHeaderProps[] = [
  { label: "순번", widthPercentage: 7, sort: true, selector: "id" },
  { label: "제목", widthPercentage: 20, sort: true, selector: "title" },
  { label: "작성일", widthPercentage: 10, sort: true, selector: "createdAt" },
  { label: "관리", widthPercentage: 7, sort: false },
];

export const GALLERY_TABLE_HEADERS: DataTableHeaderProps[] = [
  { label: "순번", widthPercentage: 7, sort: true, selector: "id" },
  { label: "제목", widthPercentage: 20, sort: true, selector: "title" },
  { label: "게시년도", widthPercentage: 10, sort: true, selector: "year" },
  { label: "게시월", widthPercentage: 10, sort: true, selector: "month" },
  { label: "작성일", widthPercentage: 10, sort: true, selector: "createdAt" },
  { label: "관리", widthPercentage: 7, sort: false },
];

export const JOBINTERVIEW_TABLE_HEADERS: DataTableHeaderProps[] = [
  { label: "순번", widthPercentage: 7, sort: true, selector: "id" },
  { label: "제목", widthPercentage: 20, sort: true, selector: "title" },
  { label: "연도", widthPercentage: 20, sort: true, selector: "year" },
  { label: "소속", widthPercentage: 20, sort: true, selector: "talkerBelonging" },
  { label: "이름", widthPercentage: 20, sort: true, selector: "talkerName" },
  { label: "작성일", widthPercentage: 10, sort: true, selector: "createdAt" },
  { label: "관리", widthPercentage: 7, sort: false },
];

export const INTERVIEW_TABLE_HEADERS: DataTableHeaderProps[] = [
  { label: "순번", widthPercentage: 7, sort: true, selector: "id" },
  { label: "제목", widthPercentage: 20, sort: true, selector: "title" },
  { label: "연도", widthPercentage: 20, sort: true, selector: "year" },
  { label: "소속", widthPercentage: 20, sort: true, selector: "talkerBelonging" },
  { label: "이름", widthPercentage: 20, sort: true, selector: "talkerName" },
  { label: "작성일", widthPercentage: 10, sort: true, selector: "createdAt" },

export const PROJECT_TABLE_HEADERS: DataTableHeaderProps[] = [
  { label: "순번", widthPercentage: 7, sort: true, selector: "id" },
  { label: "썸네일", widthPercentage: 10, sort: false },
  { label: "년도", widthPercentage: 10, sort: true, selector: "createdAt" },
  { label: "카테고리", widthPercentage: 10, sort: true, selector: "teamName" },
  { label: "프로젝트명", widthPercentage: 20, sort: true, selector: "projectName" },
  { label: "관리", widthPercentage: 7, sort: false },
];

export const APPLICATION_TABLE_HEADERS: DataTableHeaderProps[] = [
  { label: "순번", widthPercentage: 7, sort: true, selector: "id" },
  { label: "이름", widthPercentage: 15, sort: true, selector: "user.name" },
  { label: "소속", widthPercentage: 15, sort: false, selector: "division" },
  { label: "직책", widthPercentage: 7, sort: false, selector: "position" },
  { label: "권한", widthPercentage: 7, sort: false, selector: "userType" },
  { label: "가입일시", widthPercentage: 15, sort: true, selector: "createdAt" },
];

export const QUIZ_TABLE_HEADERS: DataTableHeaderProps[] = [
  { label: "순번", widthPercentage: 7, sort: true, selector: "id" },
  { label: "사용자", widthPercentage: 15, sort: true, selector: "name" },
  { label: "이메일", widthPercentage: 15, sort: true, selector: "email" },
  { label: "전화번호", widthPercentage: 15, sort: true, selector: "phone" },
  { label: "푼 문제 개수", widthPercentage: 15, sort: true, selector: "successCount" },
];
