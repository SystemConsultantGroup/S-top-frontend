import type { Meta, StoryObj } from "@storybook/react";
import { Banner } from "./Banner";

const meta = {
  title: "Banner",
  component: Banner,
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Usage: Story = {
  args: {
    type: "AI_HUB",
    title: "AI HUB",
    subtitle: "AI HUB (Datasets and AI Models)",
    text: "AI HUB는 우리학교 학생들이 수집한 데이터셋 및 개발한 모델을 전시하고, 공유하는 공간입니다.",
    width: "1440px",
    height: "270px",
  },
};
