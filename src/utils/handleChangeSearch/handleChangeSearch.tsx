import { REFRESH_DEFAULT_PAGE_NUMBER } from "@/constants/PageSize";
import { SetStateAction } from "react";

export type ChangeQueryArg<T, U> = {
  name: string;
  value: T;
  setQuery: (newValue: SetStateAction<U>) => void;
};

export const handleChangeSearch = <T, U>({ name, value, setQuery }: ChangeQueryArg<T, U>) => {
  setQuery((prev) => ({
    ...prev,
    [name]: value === "" ? undefined : value,
    pageNumber: REFRESH_DEFAULT_PAGE_NUMBER,
  }));
};
