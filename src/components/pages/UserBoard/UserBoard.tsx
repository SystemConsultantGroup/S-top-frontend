import { NoticeItem } from "@/components/common/Noticeboard/elements/NoticeItem";
import { NoticeHeading } from "@/components/common/Noticeboard/elements/NoticeHeading";
import { Paginations } from "@/components/common/Pagination";
import { MantineSelectData } from "@/types/MantineTypes";
import { IBoardPagin, INoticeAllItem, INoticeClassifier } from "@/types/PageBoardTypes";
import { usePathname, useRouter } from "next/navigation";
import { useState, ChangeEvent, FormEvent, MouseEvent, KeyboardEvent } from "react";
import styles from "./UserBoard.module.css";

type UserBoardProps = {
  heading: string;
  items: INoticeAllItem[];
} & IBoardPagin;

export function UserBoard({
  heading,
  items,
  paginShow,
  paginJustify,
  paginMarginTop,
}: UserBoardProps) {
  const pathname = usePathname();

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

  const data: MantineSelectData = [
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
    {
      value: "3",
      label: "작성자",
    },
  ];

  const classifier: INoticeClassifier = {
    data,
    defaultLabel: 0,
    searchPlaceholder: "검색어를 입력하세요.",
  };

  return (
    <>
      <NoticeHeading
        inputValue={inputValue}
        handleInput={handleInput}
        handleKeyDown={handleKeyDown}
        handleSelect={handleSelect}
        handleSubmit={handleSubmit}
        heading={heading}
        classifier={classifier}
      />
      <div className={styles.container}>
        <ul>
          <Paginations
            data={items.map((item, key) => (
              <NoticeItem key={key} {...item} />
            ))}
            paginShow={paginShow}
            paginJustify={paginJustify}
            paginMarginTop={paginMarginTop}
          />
        </ul>
      </div>
    </>
  );
}
