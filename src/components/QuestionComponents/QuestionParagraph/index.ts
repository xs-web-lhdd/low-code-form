/**
 * @description 问卷段落组件
 */

import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionParagraphDefaultProps } from './interface'

export * from './interface'

// title 组件的配置
export default {
  title: '段落',
  type: 'questionParagraph',
  Component, // 画布显示组件
  PropComponent, // 修改属性组件（右侧）
  defaultProps: QuestionParagraphDefaultProps,
}
