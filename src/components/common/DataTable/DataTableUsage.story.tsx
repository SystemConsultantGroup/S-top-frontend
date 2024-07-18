import type { Meta, StoryObj } from "@storybook/react";
import { DataTableUsage } from "./DataTableUsage";

const meta = {
  title: "DataTable",
  component: DataTableUsage,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof DataTableUsage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Usage: Story = {
  args: {},
};
