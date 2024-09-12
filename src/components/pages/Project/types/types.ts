import { ProjectCardDataType } from "@/components/common/ProjectCard/ProjectCard";
import { Dispatch } from "react";

/**
 * Filtering reducer
 */
export const ADD = "ADD";
export const DELETE = "DELETE";
export const RESET = "RESET";

export interface IFilterState {
  category: "YEAR" | "KIND" | "FIELD";
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

export interface IDropdownList {
  onYearSelect: (value: string) => void;
  onKindSelect: (value: string) => void;
  onFieldSelect: (value: string) => void;
}

/**
 * project tab
 */
export type projectTabProps = IFilterReducer & {
  data: filterableProjectCardType[];
};

export type filterableProjectCardType = ProjectCardDataType & {
  year: string;
  type: string;
};
