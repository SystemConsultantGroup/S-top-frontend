import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { VideoCard } from "./VideoCard";

export default {
  title: "Components/VideoCard",
  component: VideoCard,
} as Meta<typeof VideoCard>;

const Template: StoryFn<typeof VideoCard> = (args) => <VideoCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "뤼튼 테크놀로지스",
  subtitle: "현지웅 엔지니어님",
  videoUrl: "https://www.youtube.com/embed/OBsR6UumFdc",
};
