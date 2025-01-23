import { ProjectCard } from "@/components/common/ProjectCard";
import { Group } from "@mantine/core";
import { IProjectContent } from "@/types/project";
import { DummyCard, getItemCountPerRow } from "@/components/pages/ItemGrid";
import { useRef } from "react";
import { CommonAxios } from "@/utils/CommonAxios";

interface IProjectBoard {
  data: IProjectContent[] | undefined;
  loaded: boolean;
  thumbnails: string[];
  screenWidth: number;
}

export function ProjectBoard({ data, loaded, thumbnails, screenWidth }: IProjectBoard) {
  const projectIsLikes = useRef<boolean[]>([]);
  const projectIsMarks = useRef<boolean[]>([]);

  return (
    <Group justify="space-evenly">
      {!loaded ? (
        <div>Loading...</div>
      ) : data && data.length ? (
        (() => {
          const rowCount = getItemCountPerRow(screenWidth);
          const dummyCount = rowCount - (data.length % rowCount);

          const projectCards = data.map((item, idx) => {
            projectIsLikes.current[idx] = item.like;
            projectIsMarks.current[idx] = item.bookMark;
            const handleClickLike = () => {
              if (projectIsLikes.current[idx]) {
                // 좋아요 취소할 경우
                projectIsLikes.current[idx] = false;
                CommonAxios.delete(`/projects/${item.id}/like`);
              } else {
                // 좋아요 추가할 경우
                projectIsLikes.current[idx] = true;
                CommonAxios.post(`/projects/${item.id}/like`);
              }
            };
            const handleClickMark = () => {
              if (projectIsMarks.current[idx]) {
                // 북마크 취소할 경우
                projectIsMarks.current[idx] = false;
                CommonAxios.delete(`/projects/${item.id}/favorite`);
              } else {
                // 북마크 추가할 경우
                projectIsMarks.current[idx] = true;
                CommonAxios.post(`/projects/${item.id}/favorite`);
              }
            };
            return (
              <ProjectCard
                key={`project1-${idx}`}
                data={item}
                thumbnailUrl={thumbnails[idx]}
                onClickLike={handleClickLike}
                onClickBookmark={handleClickMark}
              />
            );
          });

          const dummyCards = Array(dummyCount)
            .fill(null)
            .map((_, idx) => <DummyCard key={`dummy1-${idx}`} width="420px" />);

          return [...projectCards, ...dummyCards];
        })()
      ) : (
        <span>검색 결과가 없습니다.</span>
      )}
    </Group>
  );
}
