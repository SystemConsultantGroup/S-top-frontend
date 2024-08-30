import type { Meta, StoryObj } from "@storybook/react";
import { ProjectCard } from "./ProjectCard";
import { MockProjectData } from "./_mock/mock-project";

const meta = {
  title: "ProjectCard",
  component: ProjectCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof ProjectCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const data = MockProjectData;

export const Usage: Story = {
  args: {
    data: data,
    thumbnailUrl: "/images/mock-project-thumbnail.png",
  },
};
