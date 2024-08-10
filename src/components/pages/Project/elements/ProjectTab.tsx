import { ProjectCard } from "@/components/common/ProjectCard";
import { Group } from "@mantine/core";
import { projectTabProps } from "../types/types";
import { FilterContainer } from "./FilterContainer";
import { filterProjects } from "../utils/filterProjects";

export function ProjectTab({ filters, dispatch, data }: projectTabProps) {
  const reducerProps = {
    filters,
    dispatch,
  };

  const filteredProjectsProps = filterProjects(data, filters);

  const projectItems = filteredProjectsProps.map((props, idx) => (
    <ProjectCard key={idx} data={{ ...props }} />
  ));

  return (
    <>
      <FilterContainer {...reducerProps} />
      <Group gap={40} justify="space-evenly">
        {projectItems}
      </Group>
    </>
  );
}
