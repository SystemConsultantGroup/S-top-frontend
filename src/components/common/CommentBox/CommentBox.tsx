import React, { useState } from "react";
import classes from "./CommentBox.module.css";
import { CheckBox } from "@/components/common/CheckBox/CheckBox";

interface CommentBoxProps {
  onSubmit?: (comment: string, isAnonymous: boolean) => void;
  commentList?: Comment[];
}

export interface Comment {
  author: string;
  content: string;
  isAnonymous?: boolean;
}

export const CommentBox: React.FC<CommentBoxProps> = ({ onSubmit, commentList = [] }) => {
  const [comment, setComment] = useState("");
  const [isAnonymous, setIsAnonymous] = useState<boolean>(true);

  // 익명 번호 매핑을 위한 Map 객체
  const anonymousMap = new Map<string, number>();
  let anonymousCounter = 1;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      if (onSubmit) onSubmit(comment, isAnonymous);
      setComment("");
    }
  };

  return (
    <div className={classes.commentBox}>
      <h3 className={classes.commentTitle}>댓글</h3>
      <form onSubmit={handleSubmit}>
        <div className={classes.textareaContainer}>
          <textarea
            className={classes.textarea}
            value={comment}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="정책 위반 댓글은 삭제될 수 있습니다."
          />
          <div className={classes.verticalDivider}></div>
          <button type="submit" className={classes.button}>
            작성
          </button>
        </div>
        <CheckBox
          label="익명으로 작성"
          checked={true}
          onChange={(status) => setIsAnonymous(status)}
        />
      </form>
      <div className={classes.divider}></div>
      <div className={classes.commentsList}>
        {commentList.map((commentItem, index) => {
          let displayAuthor = commentItem.author;

          if (commentItem.isAnonymous) {
            // 익명 댓글일 경우
            if (!anonymousMap.has(commentItem.author)) {
              // 익명 번호가 없는 경우 새 번호 부여
              anonymousMap.set(commentItem.author, anonymousCounter++);
            }
            displayAuthor = `익명${anonymousMap.get(commentItem.author)}`;
          }

          return (
            <div key={index} className={classes.commentItem}>
              {/* <div className={classes.commentAuthor}>
                {commentItem.isAnonymous ? `익명${anonymousIndex}` : commentItem.author}
              </div> */}
              <div className={classes.commentAuthor}>{displayAuthor}</div>
              <div className={classes.commentContent}>{commentItem.content}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
