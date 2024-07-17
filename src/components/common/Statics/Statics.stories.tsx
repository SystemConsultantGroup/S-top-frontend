import type { Meta, StoryObj } from "@storybook/react";

import { Statics } from "./Statics";

const meta = {
  component: Statics,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Statics>;

export default meta;

type Story = StoryObj<typeof meta>;
const array: number[] = Array(0);
for (let i = 0; i < 9; i++) {
  array.push(Math.random() * 100 + 100);
}
export const Default: Story = {
  args: {
    values: array,
    maxWidth: 800,
    maxHeight: 1200,
    viewSize: 0.4,
    maxMaxHeight: 0.8,
    rectFill: "#ADADAD",
    rectStrokeFill: "#858585",
    rectStrokeWidth: 0.2,
    circleRadius: 0.4,
    circleFill: "#9A9A9A",
    circleStrokeFill: "#454545",
    circleStrokeWidth: 0.3,
    pathStroke: "#BCBCBC",
    pathWidth: 10,
  },
};
