import type { Meta, StoryObj } from '@storybook/react';
import { LoginBox } from './LoginBox';

const meta = {
    title: 'Components/LoginBox',
    component: LoginBox,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {},
} satisfies Meta<typeof LoginBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
