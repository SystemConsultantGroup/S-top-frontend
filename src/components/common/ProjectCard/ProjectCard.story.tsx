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
    id: data.id,
    projectName: data.title,
    thumbnailUrl: data.thumbnailUrl,
    teamName: data.team,
    studentNames: data.participants,
    professorNames: [data.advisor],
    projectCategory: data.categories[0],
    likeCount: data.likes,
    like: true,
    bookMark: data.isMarked,
  },
};
