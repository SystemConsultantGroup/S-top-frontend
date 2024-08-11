import { Stack, Pagination, Flex } from "@mantine/core";
import { useState } from "react";
import { AdminNoticePreviewRow } from "./AdminNoticePreviewRow/AdminNoticePreviewRow";
import classes from "./AdminNoticePreview.module.css";
import { IconTable } from "@tabler/icons-react";
import { DummyRow } from "./DummyRow/DummyRow";

export interface IAdminNoticePreviewRow {
  pinned: boolean;
  title: string;
  writer: string;
  registeredDate: Date;
  onClickRow?: () => void;
}

interface Props {
  title: string;
  pagingData: {
    data: IAdminNoticePreviewRow[];
  }[];
}

export function AdminNoticePreview({ title, pagingData }: Props) {
  const [activePage, setPage] = useState(1);
  const data: IAdminNoticePreviewRow[] = pagingData[activePage - 1].data;

  // 페이지네이션 위치 고정
  const firstPageDataCount = pagingData[0].data.length;
  const lastPageDataCount = pagingData[pagingData.length - 1].data.length;

  const dummyRowsCount = firstPageDataCount - lastPageDataCount;

  return (
    <Stack gap={0} align="flex-start" justify="flex-start" className={classes.container}>
      <Flex className={classes.title_bar}>
        <div className={classes.col_icon}>
          <IconTable size={24} />
        </div>
        <div className={classes.col_title}>{title}</div>
      </Flex>
      <div className={classes.row_container}>
        {data.map((item, index) => (
          <AdminNoticePreviewRow key={index} {...item} />
        ))}
        {activePage === pagingData.length &&
          Array.from({ length: dummyRowsCount }, (_, index) => <DummyRow key={`dummy-${index}`} />)}
      </div>

      <div className={classes.pagination}>
        <Pagination total={pagingData.length} value={activePage} onChange={setPage} />
      </div>
    </Stack>
  );
}
