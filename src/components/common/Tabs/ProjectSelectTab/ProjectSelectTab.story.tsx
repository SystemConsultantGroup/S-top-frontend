import type { Meta, StoryObj } from "@storybook/react";
import { ProjectSelectTab } from "./ProjectSelectTab";
import { Container } from "@mantine/core";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Project Select Tab",
  component: ProjectSelectTab,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "center",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // More on Action Args : https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof ProjectSelectTab>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Usage: Story = {
  args: {
    tabs: [
      {
        id: "1",
        label: "S-TOP 이벤트 프로젝트",
        children: <Container>S-TOP 이벤트 프로젝트 내용입니다.</Container>,
      },
      {
        id: "2",
        label: "전체 프로젝트",
        children: <Container>전체 프로젝트 내용입니다.</Container>,
      },
    ],
    defaultTabId: "1",
  },
  render: (args) => (
    <Container style={{ width: "1440px" }}>
      <ProjectSelectTab {...args} />
    </Container>
  ),
};
