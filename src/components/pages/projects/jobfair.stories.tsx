import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import JobFairPage from "./jobfair";

export default {
  title: "JobFairPage",
  component: JobFairPage,
} as Meta<typeof JobFairPage>;

const Template: StoryFn<typeof JobFairPage> = () => <JobFairPage />;

export const Default = Template.bind({});
Default.args = {};
