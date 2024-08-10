import { ProjectCard } from "@/components/common/ProjectCard";
import { FilterContainer, IFilterReducer } from "./FilterContainer";
import { Group } from "@mantine/core";
import { ProjectCardDataType } from "@/components/common/ProjectCard/ProjectCard";
import { IFilterState } from "../filterReducer";

export function ProjectTabEvent({ filters, dispatch }: IFilterReducer) {
  const reducerProps = {
    filters,
    dispatch,
  };

  const projectEventProps = Array.from({ length: 20 }, (_, idx) => ({
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
  const filteredProjectEventProps = filterProjectEvents(projectEventProps, filters);

  const projectEvent = filteredProjectEventProps.map((props, idx) => (
    <ProjectCard key={idx} data={{ ...props }} />
  ));

  return (
    <>
      <FilterContainer {...reducerProps} />
      <Group gap={40} justify="space-evenly">
        {projectEvent}
      </Group>
    </>
  );
}

type FilterableProjectCardType = ProjectCardDataType & {
  year: string;
  type: string;
};

export function filterProjectEvents(
  data: FilterableProjectCardType[],
  filters: IFilterState[]
): ProjectCardDataType[] {
  const filterMap = filters.reduce(
    (acc, filter) => {
      if (!acc[filter.category]) {
        acc[filter.category] = [];
      }
      acc[filter.category].push(filter.label);
      return acc;
    },
    {} as Record<string, string[]>
  );

  return data.filter((event) => {
    return Object.keys(filterMap).every((category) => {
      const filterLabels = filterMap[category];

      switch (category) {
        case "YEAR":
          return filterLabels.includes(event.year);
        case "KIND":
          return filterLabels.includes(event.type);
        case "FIELD":
          return filterLabels.some((label) => event.categories.includes(label));
        default:
          return true;
      }
    });
  });
}
