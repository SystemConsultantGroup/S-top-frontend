import { IBoardContentProps } from "../Noticeboard";
import styles from "../Noticeboard.module.css";
import { NoticeItem } from "./NoticeItem";

export function NoticeContainer({ items }: IBoardContentProps) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <ul>{items.map((item, key) => NoticeItem({ ...item, key }))}</ul>
      </div>
      {/* Pagination */}
    </div>
  );
}
