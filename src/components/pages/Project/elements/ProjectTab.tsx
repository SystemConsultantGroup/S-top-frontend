import { ProjectCard } from "@/components/common/ProjectCard";
import { Group } from "@mantine/core";
import { projectTabProps } from "../types/types";
import { filterProjects } from "../utils/filterProjects";
import { FilterContainer } from "./FilterContainer";

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
