import styles from "./NoticeDetail.module.css";
import { IDetailHeadProps, NoticeDetailHead } from "./elements/NoticeDetailHead";
import { IDetailStageProps, NoticeDetailStage } from "./elements/NoticeDetailStage";
import { IDetailSprintProps, NoticeDetailSprint } from "./elements/NoticeDetailSprint";
import { NoticeDetailToolbar } from "./elements/NoticeDetailToolbar";

interface IDetailHeadingProps {
  heading: string;
}

type NoticeDetailPropsType = IDetailHeadingProps &
  IDetailHeadProps &
  IDetailStageProps &
  IDetailSprintProps;

export function NoticeDetail({
  heading,
  title,
  author,
  created_date,
  edited_date,
  attachment,
  pinned,
  prev_page,
  next_page,
  children,
}: NoticeDetailPropsType) {
  return (
    <>
      <div className={styles.noticedetail}>
        <div className={styles.heading}>
          <h2>{heading}</h2>
        </div>
        <div className={styles.container}>
          <NoticeDetailHead
            title={title}
            author={author}
            created_date={created_date}
            edited_date={edited_date}
            pinned={pinned}
          />
          <NoticeDetailStage attachment={attachment}>{children}</NoticeDetailStage>
          <NoticeDetailSprint prev_page={prev_page} next_page={next_page} />
          <NoticeDetailToolbar />
        </div>
      </div>
    </>
  );
}
