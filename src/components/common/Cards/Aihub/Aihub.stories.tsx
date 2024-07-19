import type { Meta, StoryObj } from "@storybook/react";

import { AihubCard } from "./Aihub";

const meta = {
  component: AihubCard,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof AihubCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "마케팅 데이터 소비자 리뷰",
    people: "김동주, 김동주, 김동주",
    company: "메카솔루션",
    model: "Model, Model",
  },
};
