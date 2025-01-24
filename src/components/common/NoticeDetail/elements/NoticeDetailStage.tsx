import {
  Group,
  Input,
  Button,
  Divider,
  Menu,
  MenuTarget,
  MenuDropdown,
  MenuItem,
} from "@mantine/core";
import { IconPlus, IconMinus, IconShare, IconPrinter, IconPaperclip } from "@tabler/icons-react";
import { IBoardAttachment } from "@/types/PageBoardTypes";
import styles from "../NoticeDetail.module.css";

interface INoticeDetailStage {
  content: string;
  files?: IBoardAttachment[];
  handleDownloadClick: (id: number, name: string) => void;
}

export function NoticeDetailStage({ content, files, handleDownloadClick }: INoticeDetailStage) {
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

        <Menu position="bottom-end" shadow="sm" offset={0} radius={0}>
          <MenuTarget>
            <Button className={`${styles.stageBtn} ${styles.stageFileBtn}`} variant="transparent">
              <Group gap={5}>
                <IconPaperclip />
                <span>첨부파일 ({files?.length || 0})</span>
              </Group>
            </Button>
          </MenuTarget>
          {files ? (
            <MenuDropdown className={styles.fileDropdown}>
              {files.map((item, idx) => (
                <MenuItem
                  className={styles.dropdownItem}
                  key={idx}
                  leftSection={<IconPaperclip size={16} />}
                  component="a"
                  target="_blank"
                  onClick={() => handleDownloadClick(item.id, item.name)}
                >
                  {item.name}
                </MenuItem>
              ))}
              {/* TODO: zip 파일을 받아와야 하는데 어떻게 할지 논의 필요
              <MenuItem className={styles.fileDownloadAll} leftSection={<IconDownload size={16} />}>
                모두 다운로드
              </MenuItem> */}
            </MenuDropdown>
          ) : (
            ""
          )}
        </Menu>
      </Group>
      <div className={styles.content}>{content}</div>
    </div>
  );
}
