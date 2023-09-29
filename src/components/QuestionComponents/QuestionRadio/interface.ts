export type OptionType = {
  value: string
  text: string
}

export type QuestionRadioPropsType = {
  title?: string // 标题
  isVertical?: boolean // 是否垂直
  options?: OptionType[] // 选项列表
  value?: string // 默认值
  onChange?: (newProps: QuestionRadioPropsType) => void
  disabled?: boolean
}

export const QuestionRadioDefaultProps: QuestionRadioPropsType = {
  title: '单选标题',
  isVertical: false,
  options: [
    { value: 'item1', text: '选项1' },
    { value: 'item2', text: '选项2' },
    { value: 'item3', text: '选项3' },
  ],
  value: '',
}
