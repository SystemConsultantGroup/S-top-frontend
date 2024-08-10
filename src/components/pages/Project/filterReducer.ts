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

export const filterReducer = (state: IFilterState[], action: IAction): IFilterState[] => {
  switch (action.type) {
    case ADD:
      const exists = state.some((item) => item.label === action.payload!.label);
      if (exists) return state;
      return state.concat(action.payload!);
    case DELETE:
      return state.filter((item) => item.label !== action.payload!.label);
    case RESET:
      return [];
    default:
      return state;
  }
};
