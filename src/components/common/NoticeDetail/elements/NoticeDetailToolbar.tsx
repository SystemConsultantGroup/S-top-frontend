import styles from "../NoticeDetail.module.css";
import { Group, Button } from "@mantine/core";
import { IconMenu2, IconPencil, IconTrash } from "@tabler/icons-react";

export function NoticeDetailToolbar() {
  return (
    <Group className={styles.toolbar} justify="space-between">
      <Button leftSection={<IconMenu2 />} variant="outline">
        목록
      </Button>
      <Group gap={5}>
        <Button leftSection={<IconPencil />} variant="filled">
          수정
        </Button>
        <Button leftSection={<IconTrash />} variant="outline">
          삭제
        </Button>
      </Group>
    </Group>
  );
}
