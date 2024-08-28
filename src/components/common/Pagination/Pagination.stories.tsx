import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "@mantine/core";
import { Paginations } from "./Pagination";

const meta = {
  component: Paginations,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Paginations>;

export default meta;

type Story = StoryObj<typeof meta>;
const data = Array(0);
for (let i = 0; i < 127; i++) {
  data.push(
    <>
      <Text>{i}: test article</Text>
    </>
  );
}
export const Default: Story = {
  args: {
    count: 3,
    data: data,
  },
};
