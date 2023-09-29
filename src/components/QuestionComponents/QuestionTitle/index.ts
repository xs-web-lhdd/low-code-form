import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionTitleDefaultProps } from './interface'

export * from './interface'

// title 组件的配置
export default {
  title: '标题',
  type: 'questionTitle',
  Component, // 画布显示组件
  PropComponent, // 修改属性组件
  defaultProps: QuestionTitleDefaultProps,
}
