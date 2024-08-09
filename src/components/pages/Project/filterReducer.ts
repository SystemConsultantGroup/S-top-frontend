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

export const filterReducer = (state: IFilterState[], action: IAction): IFilterState[] => {
  switch (action.type) {
    case ADD:
      return state.concat(action.payload!);
    case DELETE:
      return state.filter((item) => item.label !== action.payload!.label);
    case RESET:
      console.log("clicked");
      return [];
    default:
      return state;
  }
};
