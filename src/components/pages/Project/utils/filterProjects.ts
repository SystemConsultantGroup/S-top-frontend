import { ProjectCardDataType } from "@/components/common/ProjectCard/ProjectCard";
import { filterableProjectCardType, IFilterState } from "../types/types";

export function filterProjects(
  data: filterableProjectCardType[],
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
