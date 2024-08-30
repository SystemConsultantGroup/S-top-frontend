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
