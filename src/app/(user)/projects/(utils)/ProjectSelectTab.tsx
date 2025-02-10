import { Button, Group } from "@mantine/core";
import { SetStateAction } from "react";
import styles from "../Projects.module.css";
import { IOption } from "../type";

interface IProjectSelectTab {
  setOptions: (value: SetStateAction<IOption[]>) => void;
  tab: number;
  setTab: (value: SetStateAction<number>) => void;
}

export function ProjectSelectTab({ setOptions, tab, setTab }: IProjectSelectTab) {
  /**
   * 버튼을 클릭했을 때 화면을 해당 탭으로 바꾸어주는 함수.
   * @param val 해당 버튼의 탭 번호
   */
  const onTabChange = (val: number) => {
    setOptions(() => []);
    setTab(() => val);
  };
  /**
   * 탭이 활성 상태일 경우와 그렇지 않을 경우 각각에 맞는 버튼 스타일을 반환하는 함수.
   * @param val 해당 버튼의 탭 번호
   * @returns 스타일
   */
  const TabButtonStyle = (val: number) => {
    const isActive = tab === val ? styles.active : styles.dormant;
    return `${styles.tabBtn} ${isActive}`;
  };

  return (
    <Group className={styles.tabBtnBox} justify="space-between" grow>
      <Button className={TabButtonStyle(0)} onClick={() => onTabChange(0)}>
        S-TOP 2025 프로젝트
      </Button>
      <Button className={TabButtonStyle(1)} onClick={() => onTabChange(1)}>
        전체 프로젝트{" "}
      </Button>
    </Group>
  );
}
