"use client";

import { useEffect, useState } from "react";
import { CommentBox, Comment } from "@/components/common/CommentBox/CommentBox";
import { comments as commentList } from "./_mock/mock-project";

interface Props {
  projectId: string;
}

export function ProjectDetailComment({ projectId }: Props) {
  const [comments, setComments] = useState<Comment[]>(commentList);

  useEffect(() => {
    /**
     * TODO: 댓글 목록 불러오기
     */
    console.log("projectId: ", projectId);
  }, [projectId]);

  const handleCommentSubmit = (comment: string) => {
    /**
     * TODO: 댓글 등록하기
     */
    const newComment = { author: "사람", content: comment };
    setComments([...comments, newComment]);
  };

  return <CommentBox commentList={comments} onSubmit={handleCommentSubmit} />;
}
