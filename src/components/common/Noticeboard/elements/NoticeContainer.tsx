import { IBoardPagin, INoticeContent } from "@/types/PageBoardTypes";
import { Paginations } from "../../Pagination";
import styles from "../Noticeboard.module.css";
import { NoticeItem } from "./NoticeItem";

type NoticeContainerProps = INoticeContent & IBoardPagin;

export function NoticeContainer({
  items,
  paginShow,
  paginJustify,
  paginMarginTop,
}: NoticeContainerProps) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
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
    </div>
  );
}
