import type { Meta, StoryObj } from '@storybook/react';
import { RadioButton } from './RadioButton';

const meta: Meta<typeof RadioButton> = {
  title: 'RadioButton',
  component: RadioButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
    },
  },
  args: {
    checked: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Usage: Story = {
  args: {
    checked: false,
  },
  render: (args) => {
    return <RadioButton {...args} />;
  },
};
