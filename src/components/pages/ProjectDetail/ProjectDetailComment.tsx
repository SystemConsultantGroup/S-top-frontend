"use client";

import { useEffect, useState } from "react";
import { CommentBox, Comment } from "@/components/common/CommentBox/CommentBox";
import { CommentDto } from "./_type/comment";
import { CommonAxios } from "@/utils/CommonAxios";

interface Props {
  projectId: string;
  comments?: CommentDto[];
  onRefresh?: () => void;
}

export function ProjectDetailComment({ projectId, comments = [], onRefresh }: Props) {
  const [commentList, setCommentList] = useState<Comment[]>([]);

  useEffect(() => {
    // 댓글 목록을 comment 형식에 맞게 변환
    const formattedComments: Comment[] = [];
    comments.forEach((element) => {
      formattedComments.push({
        author: element.userName,
        content: element.content,
        isAnonymous: element.isAnonymous,
      });
    });
    if (formattedComments.length > 0) setCommentList(formattedComments);
  }, [comments]);

  const handleCommentSubmit = async (comment: string, isAnonymous: boolean) => {
    // 댓글 등록
    const body = {
      content: comment,
      isAnonymous: isAnonymous,
    };
    const response = await CommonAxios.post(`/projects/${projectId}/comment`, body);
    if (response.status === 201 && onRefresh) {
      onRefresh();
    }
  };

  return <CommentBox commentList={commentList} onSubmit={handleCommentSubmit} />;
}
