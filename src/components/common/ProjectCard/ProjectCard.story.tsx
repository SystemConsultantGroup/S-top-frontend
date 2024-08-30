import type { Meta, StoryObj } from "@storybook/react";
import { ProjectCard } from "./ProjectCard";
import { MockProjectData } from "./_mock/mock-project";
import { IProjectContent } from "@/types/project";

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

const data = MockProjectData as unknown as IProjectContent;

export const Usage: Story = {
  args: {
    data: data,
  },
};
