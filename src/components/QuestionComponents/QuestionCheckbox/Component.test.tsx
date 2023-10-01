import React from 'react'
import { render, screen } from '@testing-library/react'
import Component from './Component'

// 测试用例
test('默认属性', () => {
  render(<Component />) // 渲染组件
  const p = screen.getByText('多选标题')
  expect(p).toBeInTheDocument() // 断言

  for (let i = 1; i <= 3; i++) {
    const checkbox = screen.getByDisplayValue(`item${i}`)
    expect(checkbox).toBeInTheDocument()
    const label = screen.getByText(`选项${i}`)
    expect(label).toBeInTheDocument()

    expect(checkbox.getAttribute('checked')).toBeNull() // 每一个 checkbox 默认都没被选中
  }
})

test('传入属性', () => {
  const list = [
    { value: 'v1', text: 't1', checked: false },
    { value: 'v2', text: 't2', checked: true },
    { value: 'v3', text: 't3', checked: true },
  ]
  render(<Component list={list} title="hello" />)

  const p = screen.getByText('hello')
  expect(p).toBeInTheDocument()

  const checkbox1 = screen.getByDisplayValue('v1')
  expect(checkbox1).toBeInTheDocument()
  expect(checkbox1.getAttribute('checked')).toBeNull() // 未选中

  const checkbox2 = screen.getByDisplayValue('v2')
  expect(checkbox2).toBeInTheDocument()
  expect(checkbox2.getAttribute('checked')).not.toBeNull() // 未选中

  const checkbox3 = screen.getByDisplayValue('v3')
  expect(checkbox3).toBeInTheDocument()
  expect(checkbox3.getAttribute('checked')).not.toBeNull() // 选中
})
