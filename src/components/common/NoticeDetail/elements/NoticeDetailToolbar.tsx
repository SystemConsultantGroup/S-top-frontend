import { Group, Button } from "@mantine/core";
import { IconMenu2, IconPencil, IconTrash } from "@tabler/icons-react";
import styles from "../NoticeDetail.module.css";

export function NoticeDetailToolbar() {
  return (
    <Group className={styles.toolbar} justify="space-between">
      <Button
        className={styles.outlineTool}
        leftSection={<IconMenu2 />}
        variant="outline"
        radius={0}
      >
        목록
      </Button>
      <Group gap={5}>
        <Button
          className={styles.filledTool}
          leftSection={<IconPencil stroke={1.5} />}
          variant="filled"
          radius={0}
        >
          수정
        </Button>
        <Button
          className={styles.outlineTool}
          leftSection={<IconTrash stroke={1.5} />}
          variant="outline"
          radius={0}
        >
          삭제
        </Button>
      </Group>
    </Group>
  );
}
