import styles from "../NoticeDetail.module.css";
import { Menu, Button, Group } from "@mantine/core";
import { IconPaperclip, IconDownload } from "@tabler/icons-react";
import { IFileInfo } from "./NoticeDetailStage";

export function FileDropdownMenu({ attachment }: { attachment?: IFileInfo[] }) {
  return (
    <Menu position="bottom-end" shadow="sm" offset={0} radius={0}>
      <Menu.Target>
        <Button className={`${styles.stageBtn} ${styles.stageFileBtn}`} variant="transparent">
          <Group gap={5}>
            <IconPaperclip />
            <span>첨부파일 ({attachment?.length || 0})</span>
          </Group>
        </Button>
      </Menu.Target>
      {attachment ? (
        <Menu.Dropdown className={styles.fileDropdown}>
          {attachment.map((item, idx) => (
            <Menu.Item
              className={styles.dropdownItem}
              key={idx}
              leftSection={<IconPaperclip size={16} />}
              component="a"
              href={item.url}
              target="_blank"
            >
              {item.name}
            </Menu.Item>
          ))}
          <Menu.Item className={styles.fileDownloadAll} leftSection={<IconDownload size={16} />}>
            모두 다운로드
          </Menu.Item>
        </Menu.Dropdown>
      ) : (
        ""
      )}
    </Menu>
  );
}
