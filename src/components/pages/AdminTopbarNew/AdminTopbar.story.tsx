import type { Meta } from "@storybook/react";
import { AdminTopbar, MockAdminTopbar } from "./AdminTopbar";
import { MockAuthProvider } from "@/components/common/Auth";

const meta = {
  title: "AdminTopbar",
  component: AdminTopbar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof AdminTopbar>;

export default meta;
// type Story = StoryObj<typeof meta>;

export const Default = () => {
  return (
    <MockAuthProvider>
      <AdminTopbar />
    </MockAuthProvider>
  );
};

export const LoggedIn = () => {
  return <MockAdminTopbar />;
};
