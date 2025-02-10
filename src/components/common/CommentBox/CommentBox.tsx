import { CheckBox } from "@/components/common/CheckBox/CheckBox";
import React, { useState } from "react";
import classes from "./CommentBox.module.css";
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
          checked={isAnonymous}
          onChange={(status) => setIsAnonymous(status)}
        />
      </form>
      <div className={classes.divider}></div>
      <div className={classes.commentsList}>
        {commentList.map((commentItem, index) => {
          // 익명이라면 "익명", 아니라면 author 표시
          const displayAuthor = commentItem.isAnonymous ? "익명" : commentItem.author;

          return (
            <div key={index} className={classes.commentItem}>
              <div className={classes.commentAuthor}>{displayAuthor}</div>
              <div className={classes.commentContent}>{commentItem.content}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
