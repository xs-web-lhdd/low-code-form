export type QuestionInfoPropsType = {
  title?: string
  desc?: string
  onChange?: (newProps: QuestionInfoPropsType) => void
  disabled?: boolean
}

export const QuestionInfoDefaultProps: QuestionInfoPropsType = {
  title: '输入框标题',
  desc: '请输入描述',
}
