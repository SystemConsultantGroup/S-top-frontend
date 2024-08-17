import type { Meta, StoryObj } from "@storybook/react";
import { UserBoard } from "./UserBoard";
import { Button, Group } from "@mantine/core";

const meta = {
  title: "page/UserBoard",
  component: UserBoard,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof UserBoard>;

export default meta;

type Story = StoryObj<typeof meta>;

const items = [
  {
    title: "Important Notice",
    number: 1,
    author: "admin",
    date: new Date(),
    view: 123,
    pinned: true,
    href: "#",
    contentTxt: "안녕하세요 이건 아주 중요한 공지입니다. 꼭 확인해주세요.",
  },
  {
    title: "Content Update",
    number: 2,
    author: "admin",
    date: new Date(),
    view: 456,
    pinned: false,
    href: "#",
    contentTxt: "우리 동아리는 SCG. 중요한 업데이트가 있습니다.",
  },
  {
    title: "Reminder",
    number: 3,
    author: "admin",
    date: new Date(),
    view: 789,
    pinned: false,
    href: "#",
    contentTxt: "이 공지사항을 꼭 확인해 주세요.",
  },
  {
    title: "Important Announcement",
    number: 4,
    author: "admin",
    date: new Date(),
    view: 321,
    pinned: true,
    href: "#",
    contentTxt: "중요한 발표가 있습니다. 확인해 주세요.",
  },
];

const bottomSection = (
  <Group style={{ marginTop: "20px" }} justify="end">
    <Button>작성하기</Button>
  </Group>
);

export const Usage: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    heading: "Info Desk",
    items,
    paginShow: 20,
    paginJustify: "end",
    paginMarginTop: "20px",
  },
};

export const BottomButton: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    heading: "Info Desk",
    items,
    bottomSection,
    paginShow: 20,
    paginJustify: "end",
    paginMarginTop: "20px",
  },
};
