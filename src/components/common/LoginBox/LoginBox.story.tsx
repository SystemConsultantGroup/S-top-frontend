import type { Meta, StoryObj } from "@storybook/react";
import { LoginBox } from "./LoginBox";

const meta = {
  title: "Components/LoginBox",
  component: LoginBox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    width: { control: "text" },
    height: { control: "text" },
    logoSize: { control: "text" },
    iconSize: { control: "text" },
  },
  args: {
    width: "auto",
    height: "auto",
    logoSize: "256px",
    iconSize: "40px",
  },
} satisfies Meta<typeof LoginBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: "727px",
    height: "570px",
    logoSize: "256px",
    iconSize: "40px",
  },
};
