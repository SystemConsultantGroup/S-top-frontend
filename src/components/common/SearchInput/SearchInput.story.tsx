import type { Meta, StoryObj } from "@storybook/react";
import { SearchInput } from "./SearchInput";
import { ChangeEvent, KeyboardEvent, MouseEvent, useState } from "react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "SearchInput",
  component: SearchInput,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // More on Action Args : https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
const [value, setValue] = useState("");

// Event Handlers
// Handles input changes and clear actions
const handleInput = (e: MouseEvent | ChangeEvent, payload?: unknown) => {
  if (e.type === "change") {
    const target = e.target as HTMLInputElement;
    setValue(() => target.value);
  } else if (payload) {
    if (payload === "CLEAR") {
      setValue(() => "");
    }
  }
};

// Handles "Enter" key press for search
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.code === "Enter") {
    console.log("Enter action makes server to search!");
  }
};

export const Usage: Story = {
  args: {
    value,
    handleInput,
    handleKeyDown,
    placeholder: "Input here to search...",
    iconSize: 16,
  },
};
