import { Box, Card, CardSection, Divider, Group, Stack, Text } from "@mantine/core";
import Image from "next/image";
import classes from "./ProjectCard.module.css";
import { IconSearch } from "@tabler/icons-react";
import Link from "next/link";
import { ProjectCardLikeSection } from "./ProjectCardLikeSection";
import { CardBadge } from "../CardBadge";
import { IProjectContent } from "@/types/project";
import { PROJECT_CATEGORY_MAPPED_LIST } from "@/constants/TextMapping";

export interface ProjectCardProps {
  data: IProjectContent;
  thumbnailUrl: string;
  width?: string;
  height?: string;
  onClickLike: () => void;
  onClickBookmark: () => void;
}

export function ProjectCard({
  data,
  thumbnailUrl,
  width,
  height,
  onClickLike,
  onClickBookmark,
}: ProjectCardProps) {
  const studentsString = data.studentNames.join(", ");
  const professorString = data.professorNames.join(", ");

  return (
    <Card className={classes.card} w={width} h={height}>
      <CardSection className={classes["img-section"]}>
        <Link
          href={{
            pathname: `/projects/${data.id}`,
          }}
          style={{ textDecorationLine: "none" }}
        >
          {thumbnailUrl && (
            <div className={classes["image-wrapper"]}>
              <Image
                src={thumbnailUrl}
                alt={"thumbnail"}
                className={classes.img}
                fill
                style={{ objectFit: "cover" }}
                priority
              />
              <IconSearch className={classes.icon} />
            </div>
          )}
        </Link>
      </CardSection>
      <CardSection pl={16}>
        <Group className={classes["badge-group"]} gap={16}>
          <CardBadge label={PROJECT_CATEGORY_MAPPED_LIST[data.projectCategory]} />
        </Group>
      </CardSection>
      <CardSection pl={16} pr={16} pb={16} pt={8}>
        <Stack gap={8}>
          <Link
            href={{
              pathname: `/projects/${data.id}`,
            }}
            style={{ textDecorationLine: "none" }}
          >
            <Text
              h={studentsString.length > 0 ? 28 : 56} // 28: lineHeight, 56: 2 lines' height
              lineClamp={studentsString.length > 0 ? 1 : 2}
              component="div"
              className={classes.title}
            >
              {data.projectName}
            </Text>
          </Link>
          {studentsString.length > 0 && (
            <div className={classes["participants-container"]}>{studentsString}</div>
          )}
          <Divider c={"var(--color-outline)"} />
        </Stack>
        <Stack gap={0} mt={8}>
          <Group gap={24}>
            <div className={classes["attr-wrapper"]}>참가팀명</div>
            <div className={classes["value-wrapper"]}>{data.teamName}</div>
          </Group>
          {professorString.length > 0 ? (
            <Group gap={24}>
              <div className={classes["attr-wrapper"]}>지도교수</div>
              <div className={classes["value-wrapper"]}>{professorString}</div>
            </Group>
          ) : (
            <Box h={24} />
          )}
        </Stack>
      </CardSection>
      <ProjectCardLikeSection
        likes={data.likeCount}
        isLiked={data.like}
        isMarked={data.bookMark}
        onClickLike={onClickLike}
        onClickBookmark={onClickBookmark}
      />
    </Card>
  );
}
