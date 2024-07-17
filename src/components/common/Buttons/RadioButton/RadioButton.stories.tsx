import type { Meta, StoryObj } from '@storybook/react';
import { RadioButton } from './RadioButton';

const meta: Meta<typeof RadioButton> = {
  title: 'RadioButton',
  component: RadioButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const OptionOne: Story = {
  args: {
    label: 'Option One',
    name: 'example',
    value: 'optionOne',
    checked: false,
    onChange: () => {},
  },
};

export const OptionTwo: Story = {
  args: {
    label: 'Option Two',
    name: 'example',
    value: 'optionTwo',
    checked: false,
    onChange: () => {},
  },
};
