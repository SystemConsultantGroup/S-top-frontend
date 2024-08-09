import type { Meta, StoryObj } from "@storybook/react";
import { NoticeDetail } from "./NoticeDetail";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "NoticeDetail",
  component: NoticeDetail,
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
} satisfies Meta<typeof NoticeDetail>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

export const Usage: Story = {
  args: {
    heading: "Board",
    title: "Title",
    author: "admin",
    created_date: new Date(),
    edited_date: new Date(),
    attachment: [
      {
        name: "File 1",
        url: "/#",
      },
      {
        name: "File 2",
        url: "/#",
      },
    ],
    pinned: true,
    prev_page: undefined,
    next_page: {
      title: "Next",
      url: "/2",
    },
    children: <p>Content</p>,
  },
};
