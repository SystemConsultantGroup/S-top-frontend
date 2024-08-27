import type { Meta, StoryObj } from "@storybook/react";
import { PageHeader } from "./PageHeader";

const meta: Meta<typeof PageHeader> = {
  title: "Components/PageHeader",
  component: PageHeader,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: { title: "공지사항 게시판 관리" },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 Dropdown
export const Default: Story = {};
