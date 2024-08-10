import { ProjectCardDataType } from "@/components/common/ProjectCard/ProjectCard";
import { Dispatch } from "react";

/**
 * Filtering reducer
 */
export const ADD = "ADD";
export const DELETE = "DELETE";
export const RESET = "RESET";

export type filterCategoryType = "YEAR" | "KIND" | "FIELD";

export interface IFilterState {
  category: filterCategoryType;
  label: string;
}

export interface IAction {
  type: typeof ADD | typeof DELETE | typeof RESET;
  payload?: IFilterState;
}

/**
 * filter container
 */
export interface IFilterReducer {
  filters: IFilterState[];
  dispatch: Dispatch<IAction>;
}

export type filterContainerProps = IFilterReducer;

/**
 * Dropdown
 */
export interface IDropdownItem {
  placeholder: string;
  options: string[];
  onOptionClick: (option: string) => void;
}

export interface DropdownListProps {
  onYearSelect: (value: string) => void;
  onKindSelect: (value: string) => void;
  onFieldSelect: (value: string) => void;
}

/**
 * project tab
 */
export type projectTabProps = IFilterReducer & {
  data: FilterableProjectCardType[];
};

export type FilterableProjectCardType = ProjectCardDataType & {
  year: string;
  type: string;
};
