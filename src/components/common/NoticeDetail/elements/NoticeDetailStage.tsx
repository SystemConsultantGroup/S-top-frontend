import { INoticeDetailStage } from "@/types/PageBoardTypes";
import { Group, Input, Button, Divider } from "@mantine/core";
import { IconPlus, IconMinus, IconShare, IconPrinter } from "@tabler/icons-react";
import styles from "../NoticeDetail.module.css";
import { FileDropdownMenu } from "./FileDropdownMenu";

export function NoticeDetailStage({ attachment, children }: INoticeDetailStage) {
  return (
    <div className={styles.stage}>
      <Group justify="flex-end" gap={5}>
        {/* 오른쪽 상단 Toolbar */}
        <Group gap={1}>
          {/* 본문 글씨 확대/축소 */}
          <Input className={styles.stageResizePanel} value="1.0" readOnly />
          <Button className={`${styles.stageBtn} ${styles.filledBtn}`}>
            <IconPlus stroke={1.5} />
          </Button>
          <Button className={`${styles.stageBtn} ${styles.filledBtn}`}>
            <IconMinus stroke={1.5} />
          </Button>
        </Group>

        <Divider className={styles.divider} orientation="vertical" />

        <Group gap={5}>
          {/* 공유와 프린트*/}
          <Button className={styles.stageBtn} variant="transparent">
            <IconShare />
          </Button>
          <Button className={styles.stageBtn} variant="transparent">
            <IconPrinter />
          </Button>
        </Group>

        <Divider className={styles.divider} orientation="vertical" />

        <FileDropdownMenu attachment={attachment} />
      </Group>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
