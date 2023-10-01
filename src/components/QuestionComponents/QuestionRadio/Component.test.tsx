import React from 'react'
import { render, screen } from '@testing-library/react'
import Component from './Component'

// 测试用例
test('默认属性', () => {
  render(<Component />) // 渲染组件
  const p = screen.getByText('单选标题')
  expect(p).toBeInTheDocument() // 断言

  for (let i = 1; i <= 3; i++) {
    const radio = screen.getByDisplayValue(`item${i}`)
    expect(radio).toBeInTheDocument()
    const label = screen.getByText(`选项${i}`)
    expect(label).toBeInTheDocument()
  }
})

test('传入属性', () => {
  const options = [
    { value: 'v1', text: 't1' },
    { value: 'v2', text: 't2' },
    { value: 'v3', text: 't3' },
  ]
  const value = 'v1'
  render(<Component options={options} value={value} />)
  for (let i = 1; i <= 3; i++) {
    const curVal = `v${i}`
    const radio = screen.getByDisplayValue(curVal)
    expect(radio).toBeInTheDocument()
    const label = screen.getByText(`t${i}`)
    expect(label).toBeInTheDocument()

    // 选中的
    if (curVal === value) {
      expect(radio.getAttribute('checked')).not.toBeNull()
    }
  }
})
