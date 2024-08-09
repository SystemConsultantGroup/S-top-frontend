import { DataTableHeaderProps } from "@/components/common/DataTable/elements/DataTableHeader";

export const MOCK_TABLE_HEADERS: DataTableHeaderProps[] = [
  { label: "이름", widthPercentage: 7, sort: true, selector: "name" },
  { label: "이메일", widthPercentage: 15, sort: true, selector: "email" },
  { label: "소속", widthPercentage: 15, sort: true, selector: "belonging" },
  { label: "직책", widthPercentage: 7, sort: true, selector: "position" },
  { label: "권한", widthPercentage: 7, sort: true, selector: "role" },
  { label: "가입일시", widthPercentage: 15, sort: true, selector: "createdAt" },
];
