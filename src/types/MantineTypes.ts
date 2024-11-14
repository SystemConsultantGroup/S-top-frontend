export interface MantineSelectOption {
  value: string;
  label: string;
}

export interface MantineSelectGroupedOption {
  group: string;
  items: MantineSelectOption[];
}

export type MantineSelectData =
  | string[]
  | MantineSelectOption[]
  | { group: string; items: string[] }[]
  | MantineSelectGroupedOption[];
