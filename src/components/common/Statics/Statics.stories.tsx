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

export const Default: Story = {
  args: {},
};
