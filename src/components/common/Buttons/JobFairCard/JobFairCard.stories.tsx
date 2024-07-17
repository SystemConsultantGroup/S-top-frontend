import type { Meta, StoryObj } from '@storybook/react';
import { JobFairCard } from './JobFairCard';

const meta: Meta<typeof JobFairCard> = {
  title: 'JobFairCard',
  component: JobFairCard,
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
    logo: 'https://www.lulu-lab.com/data/file/news/2039134071_VMUwO4QB_bb64ca39bb18d97dd4dd5a0c72ed9b10fa12c922.png', // Example logo URL
    company: '룰루랩',
    position: 'Web SDK 개발자, AI 개발자',
    employmentType: ['인턴', '신입 정규직'],
    location: '서울 강남구',
  },
};
