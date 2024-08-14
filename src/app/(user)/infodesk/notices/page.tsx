"use client";

import { Noticeboard } from "@/components/common/Noticeboard";
import { SubHeadNavbar } from "@/components/common/SubHeadNavbar";
import { MantineSelectData } from "@/types/MantineTypes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, FormEvent, KeyboardEvent, MouseEvent, useState } from "react";
import { getUserNoticeItems } from "./getUserNoticeItems";
import styles from "./styles.module.css";
import { INoticeClassifier } from "@/types/PageBoardTypes";

export default function NoticesPage() {
  const pathname = usePathname();
  const params = useSearchParams();

  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState("0");
  const router = useRouter();

  // Event Handlers
  // Handles input changes and clear actions
  const handleInput = (e: MouseEvent | ChangeEvent, payload?: unknown) => {
    if (e.type === "change") {
      const target = e.target as HTMLInputElement;
      setInputValue(() => target.value);
    } else if (payload) {
      if (payload === "CLEAR") {
        setInputValue(() => "");
      }
    }
  };

  // Handles select value changes
  const handleSelect = (value: string | null) => {
    setSelectValue(() => value!);
  };

  // Handles "Enter" key press for search
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === "Enter") onSearch();
  };

  // Handles form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  // Utility Functions
  // Performs the search operation
  const onSearch = () => {
    if (inputValue) {
      const queryParams = new URLSearchParams({
        query: inputValue,
        categoryId: selectValue,
      });
      const url = `${pathname}?${queryParams}`;
      router.push(url);
    }
  };

  const userNoticeData: MantineSelectData = [
    {
      value: "0",
      label: "전체",
    },
    {
      value: "1",
      label: "제목",
    },
    {
      value: "2",
      label: "내용",
    },
  ];

  const userNoticeClassifier: INoticeClassifier = {
    data: userNoticeData,
    defaultLabel: 0,
    searchPlaceholder: "검색어를 입력하세요.",
  };

  return (
    <>
      <SubHeadNavbar title="Info Desk" />
      <div className={styles.container}>
        <Noticeboard
          inputValue={inputValue}
          handleInput={handleInput}
          handleKeyDown={handleKeyDown}
          handleSelect={handleSelect}
          handleSubmit={handleSubmit}
          heading="공지사항"
          classifier={userNoticeClassifier}
          items={getUserNoticeItems(params)}
          paginShow={20}
          paginJustify="end"
          paginMarginTop="40px"
        />
      </div>
    </>
  );
}
