import type { Meta, StoryObj } from "@storybook/react";
import { AdminNavbar } from "./AdminNavbar";

const meta = {
  title: "AdminNavbar",
  component: AdminNavbar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof AdminNavbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
