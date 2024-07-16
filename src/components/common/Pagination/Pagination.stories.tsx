import type { Meta, StoryObj } from "@storybook/react";

import { Paginations } from "./Pagination";

const meta = {
  component: Paginations,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Paginations>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    show: 3,
  },
};
