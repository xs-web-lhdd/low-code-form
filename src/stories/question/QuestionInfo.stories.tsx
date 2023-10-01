import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import Component from '../../components/QuestionComponents/QuestionInfo/Component'

const meta = {
  title: 'Question/QuestionInfo',
  component: Component,
} as Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

// 设置了属性
export const SetProps: Story = {
  args: {
    title: 'hello',
    desc: 'world',
  },
}

// 换行
export const DescBreakLine: Story = {
  args: {
    title: 'hello',
    desc: 'a\nb\nc',
  },
}
