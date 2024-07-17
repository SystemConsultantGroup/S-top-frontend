import type { Meta, StoryObj } from '@storybook/react';
import { AdminSignupPreview } from './AdminSignupPreview';

const meta: Meta<typeof AdminSignupPreview> = {
  title: 'AdminSignupPreview',
  component: AdminSignupPreview,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Usage: Story = {
  args: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Administrator',
  },
};
