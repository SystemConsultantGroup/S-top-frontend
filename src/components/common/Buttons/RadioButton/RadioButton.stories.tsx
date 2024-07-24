import type { Meta, StoryObj } from "@storybook/react";
import { RadioButton } from "./RadioButton";

const meta: Meta<typeof RadioButton> = {
  title: "RadioButton",
  component: RadioButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {
    name: "favoriteFramework",
    label: "Select your favorite framework/library",
    description: "This is anonymous",
    withAsterisk: true,
    options: [
      { value: "react", label: "React" },
      { value: "svelte", label: "Svelte" },
      { value: "ng", label: "Angular" },
      { value: "vue", label: "Vue" },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Usage: Story = {
  args: {},
};
