import { ProjectCard } from "@/components/common/ProjectCard";
import { FilterContainer, IFilterReducer } from "./FilterContainer";
import { filterProjectEvents } from "./ProjectTabEvent";
import { Group } from "@mantine/core";

export function ProjectTabAll({ filters, dispatch }: IFilterReducer) {
  const reducerProps = {
    filters,
    dispatch,
  };

  const projectAllProps = Array.from({ length: 20 }, (_, idx) => ({
    id: idx,
    title: "GPT 기반의 일상 대화형 챗봇 모델 개발",
    thumbnailUrl: "/images/mock-project-thumbnail.png",
    categories: ["AI/머신러닝", "자연어 처리"],
    participants: ["조민규", "조하빈", "장준우", "김예윤", "신준서"],
    team: "바이브컴퍼니",
    advisor: "박희선",
    likes: 63,
    isMarked: true,

    // 추가 데이터
    year: "2024",
    type: "동아리",
  }));
  const filteredProjectAllProps = filterProjectEvents(projectAllProps, filters);

  const projectAll = filteredProjectAllProps.map((props, idx) => (
    <ProjectCard key={idx} data={{ ...props }} />
  ));

  return (
    <>
      <FilterContainer {...reducerProps} />
      <Group gap={40} justify="space-evenly">
        {projectAll}
      </Group>
    </>
  );
}
