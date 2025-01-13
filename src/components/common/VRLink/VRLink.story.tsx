import type { Meta, StoryObj } from "@storybook/react";
import { VRLink } from "./VRLink";

const meta = {
  title: "VRLink",
  component: VRLink,
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof VRLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Usage: Story = {
  args: {
    width: "1440px",
    height: "130px",
  },
};
