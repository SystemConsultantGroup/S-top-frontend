import type { Meta, StoryObj } from "@storybook/react";
import { Noticeboard } from "./Noticeboard";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Noticeboard",
  component: Noticeboard,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // More on Action Args : https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof Noticeboard>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
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
    title: "Important",
    number: 1,
    author: "admin",
    date: new Date(),
    view: 123,
    pinned: true,
    href: "/1",
    contentTxt: "this is important!",
  },
  {
    title: "Content",
    number: 2,
    author: "admin",
    date: new Date(),
    view: 456,
    pinned: false,
    href: "/2",
    contentTxt: "This is a content.",
  },
];

export const Usage: Story = {
  args: {
    inputValue: "",
    handleInput: () => {},
    handleKeyDown: () => {},
    handleSelect: () => {},
    handleSubmit: () => {},
    heading: "Board",
    classifier,
    items,
    paginShow: 10,
    paginJustify: "end",
    paginMarginTop: "20px",
  },
};
