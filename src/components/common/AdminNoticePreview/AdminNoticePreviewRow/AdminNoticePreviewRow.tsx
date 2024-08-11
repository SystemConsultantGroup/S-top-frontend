import { Flex, Text } from "@mantine/core";
import classes from "./AdminNoticePreviewRow.module.css";
import { IAdminNoticePreviewRow } from "../AdminNoticePreview";
import { IconPinFilled } from "@tabler/icons-react";

export function AdminNoticePreviewRow({
  pinned,
  title,
  writer,
  registeredDate,
  onClickRow,
}: IAdminNoticePreviewRow) {
  function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth()는 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}.${month}.${day}`;
  }
  return (
    <Flex
      gap={0}
      align="center"
      justify="flex-start"
      direction="row"
      wrap="nowrap"
      className={classes.row}
      onClick={onClickRow}
    >
      <div className={classes.column_pinned}>
        {pinned && <IconPinFilled size={24} className={classes.pin_icon} />}
      </div>
      <div className={classes.column_title}>
        <Text className={classes.text_ellipsis}>{title}</Text>
      </div>
      <div className={classes.column_writer}>
        <Text className={classes.text_ellipsis}>{writer}</Text>
      </div>
      <div className={classes.column_date}>{formatDate(registeredDate)}</div>
    </Flex>
  );
}
