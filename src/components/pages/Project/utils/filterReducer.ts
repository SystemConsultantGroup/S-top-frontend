import { IFilterState, IAction, ADD, DELETE, RESET } from "../types/types";

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
export { DELETE };
