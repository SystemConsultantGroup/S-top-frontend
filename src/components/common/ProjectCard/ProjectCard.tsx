import { Card, CardSection, Divider, Group, Stack } from "@mantine/core";
import Image from "next/image";
import classes from "./ProjectCard.module.css";
import { IconSearch } from "@tabler/icons-react";
import Link from "next/link";
import { ProjectCardLikeSection } from "./ProjectCardLikeSection";

export type ProjectCardDataType = {
  id: number;
  title: string;
  thumbnailUrl: string; // uuid 예정
  categories: string[];
  participants: string[];
  team: string;
  advisor: string;
  likes: number;
  isMarked: boolean;
};

export interface ProjectCardProps {
  data: ProjectCardDataType;
  width?: string;
  height?: string;
  onClickLike: () => void;
  onClickBookmark: () => void;
}

export function ProjectCard({
  data,
  width,
  height,
  onClickLike,
  onClickBookmark,
}: ProjectCardProps) {
  const ParticipantsString = data.participants.join(", ");
  return (
    <Card className={classes.card} w={width} h={height}>
      <CardSection className={classes["img-section"]}>
        <Link
          href={{
            pathname: `/${data.id}`,
          }}
          style={{ textDecorationLine: "none" }}
        >
          <Image
            src={data.thumbnailUrl}
            alt={"thumbnail"}
            className={classes.img}
            width={500}
            height={500}
            priority
          />
          <IconSearch className={classes.icon} />
        </Link>
      </CardSection>
      <CardSection pl={24} pt={8}>
        <Group className={classes["badge-group"]} gap={16}>
          {/* TODO: div를 카드뱃지 컴포넌트로 수정 */}
          {data.categories.map((category, index) => (
            <div key={index}>{category}</div>
          ))}
        </Group>
      </CardSection>
      <CardSection pl={24} pr={24} pb={16} pt={8}>
        <Stack gap={8}>
          <div className={classes.title}>{data.title}</div>
          <div className={classes["participants-container"]}>{ParticipantsString}</div>
          <Divider c={"var(--color-outline)"} />
        </Stack>
        <Stack gap={0} mt={8}>
          <Group gap={24}>
            <div className={classes["attr-wrapper"]}>참가팀명</div>
            <div className={classes["value-wrapper"]}>{data.team}</div>
          </Group>
          <Group gap={24}>
            <div className={classes["attr-wrapper"]}>지도교수</div>
            <div className={classes["value-wrapper"]}>{data.advisor}</div>
          </Group>
        </Stack>
      </CardSection>
      <ProjectCardLikeSection
        likes={data.likes}
        isMarked={data.isMarked}
        onClickLike={onClickLike}
        onClickBookmark={onClickBookmark}
      />
    </Card>
  );
}
