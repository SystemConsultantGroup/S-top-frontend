import type { Meta, StoryObj } from "@storybook/react";
import { CardBadge } from "./CardBadge";

const meta = {
  title: "CardBadge",
  component: CardBadge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CardBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Usage: Story = {
  args: {
    label: "Badge",
    backgroundColor: "var(--color-primaryContainer)",
  },
};
