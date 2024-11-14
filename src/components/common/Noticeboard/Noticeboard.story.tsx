import type { Meta, StoryObj } from "@storybook/react";
import { Noticeboard } from "./Noticeboard";

const meta = {
  title: "Noticeboard",
  component: Noticeboard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Noticeboard>;

export default meta;
type Story = StoryObj<typeof meta>;

const classifier = {
  data: [
    { value: "0", label: "label 1" },
    { value: "1", label: "label 2" },
    { value: "2", label: "label 3" },
  ],
  defaultLabel: 0,
  searchPlaceholder: "Input here to search...",
};
const items = [
  {
    id: 1,
    title: "공지 사항 1",
    hitCount: 10,
    fixed: true,
    createdAt: "2024-10-29T22:38:56.662802",
    updatedAt: "2024-10-29T22:38:56.662804",
  },
  {
    id: 2,
    title: "공지 사항 2",
    hitCount: 10,
    fixed: false,
    createdAt: "2024-10-29T22:38:56.662818",
    updatedAt: "2024-10-29T22:38:56.662819",
  },
];

export const Usage: Story = {
  args: {
    handleInput: () => {},
    handleSelect: () => {},
    heading: "Board",
    classifier,
    items,
  },
};
