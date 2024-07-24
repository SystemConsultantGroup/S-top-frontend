import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FilterChip } from "./FilterChip";

const meta = {
  title: "Components/FilterChip",
  component: FilterChip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {
    label: "",
    onRemove: () => {},
  },
} satisfies Meta<typeof FilterChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "2024",
    onRemove: () => {},
  },
  render: (args) => (
    <>
      <FilterChip {...args} label="2024" />
      <FilterChip {...args} label="연구실" />
      <FilterChip {...args} label="웹/어플리케이션" />
    </>
  ),
};

export const Reset: Story = {
  args: {
    label: "전체해제",
    onRemove: () => {},
    isReset: true,
  },
  render: (args) => <FilterChip {...args} />,
};
