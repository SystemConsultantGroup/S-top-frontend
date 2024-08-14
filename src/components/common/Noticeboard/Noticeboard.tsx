import {
  INoticeHeading,
  INoticeContent,
  INoticeHandler,
  IBoardPagin,
} from "@/types/PageBoardTypes";
import { NoticeContainer } from "./elements/NoticeContainer";
import { NoticeHeading } from "./elements/NoticeHeading";
import styles from "./Noticeboard.module.css";

type NoticeboardProps = INoticeHeading & INoticeContent & INoticeHandler & IBoardPagin;

export function Noticeboard({
  inputValue,
  handleInput,
  handleKeyDown,
  handleSelect,
  handleSubmit,
  heading,
  classifier,
  items,
  paginShow,
  paginJustify,
  paginMarginTop,
}: NoticeboardProps) {
  return (
    <>
      <div className={styles.noticeboard}>
        <NoticeHeading
          inputValue={inputValue}
          handleInput={handleInput}
          handleKeyDown={handleKeyDown}
          handleSelect={handleSelect}
          handleSubmit={handleSubmit}
          heading={heading}
          classifier={classifier}
        />
        <NoticeContainer
          items={items}
          paginShow={paginShow}
          paginJustify={paginJustify}
          paginMarginTop={paginMarginTop}
        />
      </div>
    </>
  );
}
