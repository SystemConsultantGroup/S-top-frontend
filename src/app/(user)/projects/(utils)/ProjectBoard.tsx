import { ProjectCard } from "@/components/common/ProjectCard";
import { Group } from "@mantine/core";
import { IProjectContent } from "@/types/project";
import { DummyCard, getItemCountPerRow } from "@/components/pages/ItemGrid";

interface IProjectBoard {
  data: IProjectContent[] | undefined;
  loaded: boolean;
  thumbnails: string[];
  screenWidth: number;
}

export function ProjectBoard({ data, loaded, thumbnails, screenWidth }: IProjectBoard) {
  return (
    <Group justify="space-evenly">
      {!loaded ? (
        <div>Loading...</div>
      ) : data && data.length ? (
        (() => {
          const rowCount = getItemCountPerRow(screenWidth);
          const dummyCount = rowCount - (data.length % rowCount);

          console.log(data);
          const projectCards = data.map((item, idx) => (
            <ProjectCard key={`project1-${idx}`} data={item} thumbnailUrl={thumbnails[idx]} />
          ));

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
