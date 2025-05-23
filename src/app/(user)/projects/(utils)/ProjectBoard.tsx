import { ProjectCard } from "@/components/common/ProjectCard";
import { IProjectContent } from "@/types/project";
//import { DummyCard, getItemCountPerRow } from "@/components/pages/ItemGrid";
import { useRef } from "react";
import { CommonAxios } from "@/utils/CommonAxios";
import { CardGridContainer } from "@/components/common/CardGridContainer/CardGridContainer";

interface IProjectBoard {
  data: IProjectContent[] | undefined;
  loaded: boolean;
  thumbnails: string[];
  //  screenWidth: number;
}

export function ProjectBoard({ data, loaded, thumbnails }: IProjectBoard) {
  const projectIsLikes = useRef<boolean[]>([]);
  const projectIsMarks = useRef<boolean[]>([]);
  return (
    <CardGridContainer>
      {!loaded ? (
        <div>Loading...</div>
      ) : data && data.length ? (
        // const rowCount = getItemCountPerRow(screenWidth); // 이 줄 제거
        // const dummyCount = rowCount - (data.length % rowCount); // 이 줄 제거

        // projectCards와 dummyCards를 합치던 로직 대신, projectCards만 반환
        data.map((item, idx) => {
          projectIsLikes.current[idx] = item.like;
          projectIsMarks.current[idx] = item.bookMark;
          const handleClickLike = () => {
            if (projectIsLikes.current[idx]) {
              projectIsLikes.current[idx] = false;
              CommonAxios.delete(`/projects/${item.id}/like`);
            } else {
              projectIsLikes.current[idx] = true;
              CommonAxios.post(`/projects/${item.id}/like`);
            }
          };
          const handleClickMark = () => {
            if (projectIsMarks.current[idx]) {
              projectIsMarks.current[idx] = false;
              CommonAxios.delete(`/projects/${item.id}/favorite`);
            } else {
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
        })
      ) : (
        <span>검색 결과가 없습니다.</span>
      )}
    </CardGridContainer>
  );
}
