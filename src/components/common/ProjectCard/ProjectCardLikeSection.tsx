"use client";

import { CardSection, Group, UnstyledButton } from "@mantine/core";
import {
  IconBookmark,
  IconBookmarkFilled,
  IconThumbUp,
  IconThumbUpFilled,
} from "@tabler/icons-react";
import classes from "./ProjectCard.module.css";
import { useEffect, useState } from "react";
import { useAuth } from "../Auth";

export interface ProjectCardLikeSectionProps {
  likes: number;
  isLiked: boolean;
  isMarked: boolean;
  onClickLike: () => void;
  onClickBookmark: () => void;
}

export function ProjectCardLikeSection({
  likes,
  isLiked,
  isMarked,
  onClickLike,
  onClickBookmark,
}: ProjectCardLikeSectionProps) {
  const [like, setLike] = useState<number>(likes);
  const [isLike, setIsLike] = useState<boolean>(isLiked);
  const [isMark, setIsMark] = useState<boolean>(isMarked);
  const { isLoggedIn } = useAuth();

  const handleLike = () => {
    if (isLoggedIn) {
      setIsLike((prev) => !prev);
      if (isLike) setLike((prev) => prev - 1);
      else setLike((prev) => prev + 1);
      onClickLike();
    } else {
      alert("프로젝트에 좋아요를 표시하려면 로그인해야 합니다.");
    }
  };
  const handleBookmark = () => {
    if (isLoggedIn) {
      setIsMark((prev) => !prev);
      onClickBookmark();
    } else {
      alert("프로젝트를 북마크에 추가하려면 로그인해야 합니다.");
    }
  };

  useEffect(() => {
    setLike(likes);
    setIsLike(isLiked);
    setIsMark(isMarked);
  }, [likes, isLiked, isMarked]);

  return (
    <CardSection className={classes["like-section"]}>
      <Group align="center" justify="space-between" p="8px 16px">
        <UnstyledButton onClick={handleLike}>
          <Group gap={0}>
            {isLike ? (
              <IconThumbUpFilled color="var(--color-primary)" />
            ) : (
              <IconThumbUp color="var(--color-primary)" />
            )}
            <div className={classes["likes-wrapper"]}>{like}</div>
          </Group>
        </UnstyledButton>
        <UnstyledButton onClick={handleBookmark}>
          {isMark ? (
            <IconBookmarkFilled color="var(--color-primary)" />
          ) : (
            <IconBookmark color="var(--color-primary)" />
          )}
        </UnstyledButton>
      </Group>
    </CardSection>
  );
}
