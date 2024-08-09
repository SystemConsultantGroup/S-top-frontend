import type { Meta, StoryObj } from "@storybook/react";
import { Dropdown } from "./Dropdown";

const meta: Meta<typeof Dropdown> = {
  title: "Components/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onOptionClick: { action: "clicked" },
  },
  args: {
    options: ["연도", "작성자", "제목"],
    placeholder: "선택해주세요",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 Dropdown
export const Default: Story = {
  args: {
    options: ["연도", "작성자", "제목"],
    placeholder: "선택해주세요",
  },
};

// 선택된 옵션이 있는 Dropdown
export const WithSelectedOption: Story = {
  args: {
    options: ["연도", "작성자", "제목"],
    placeholder: "선택해주세요",
    selectedOption: "연도",
  },
};
