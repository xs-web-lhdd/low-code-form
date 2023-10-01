import React from 'react'
import { render, screen } from '@testing-library/react'
import Component from './Component'

// 测试用例
test('默认属性', () => {
  render(<Component />) // 渲染组件
  const p = screen.getByText('输入框标题')
  expect(p).toBeInTheDocument() // 断言

  const input = screen.getByPlaceholderText('请输入')
  expect(input).toBeInTheDocument()
})

test('传入属性', () => {
  render(<Component title="hello" placeholder="world" />)
  const s = screen.getByText('hello')
  expect(s).toBeInTheDocument()

  const input = screen.getByPlaceholderText('world')
  expect(input).toBeInTheDocument()
})
