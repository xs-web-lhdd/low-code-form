import React from 'react'
import { render, screen } from '@testing-library/react'
import Component from './Component'

// 测试用例
test('默认属性', () => {
  render(<Component />) // 渲染组件
  const h = screen.getByText('一行标题')
  expect(h).toBeInTheDocument() // 断言
})

test('传入属性', () => {
  render(<Component text="hello" level={2} isCenter={true} />)
  const h = screen.getByText('hello')
  expect(h).toBeInTheDocument()

  expect(h.matches('h2')).toBeTruthy()

  const style = h.style
  expect(style.textAlign).toBe('center')
})
