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
  const [anonymousIndex, setAnonymousIndex] = useState<number>(0);

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
    console.log("isAnonymous: ", isAnonymous);
    e.preventDefault();
    if (comment.trim()) {
      if (onSubmit) onSubmit(comment, isAnonymous);
      //setComments([...comments, { author: "사람", content: comment }]);
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
          defaultValue={true}
          onClick={(status) => setIsAnonymous(status)}
        />
      </form>
      <div className={classes.divider}></div>
      <div className={classes.commentsList}>
        {commentList.map((commentItem, index) => {
          // 익명인 경우에는 anonymousIndex를 증가시키고, 아니면 그대로 유지
          if (commentItem.isAnonymous) setAnonymousIndex((val) => val + 1);

          return (
            <div key={index} className={classes.commentItem}>
              <div className={classes.commentAuthor}>
                {commentItem.isAnonymous ? `익명${anonymousIndex}` : commentItem.author}
              </div>
              <div className={classes.commentContent}>{commentItem.content}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
