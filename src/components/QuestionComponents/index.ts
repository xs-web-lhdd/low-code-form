import { FC } from 'react'
import QuestionInputConf, { QuestionInputPropsType } from './QuestionInput'
import QuestionTitleConf, { QuestionTitlePropsType } from './QuestionTitle'

// 统一定义各个组件的 prop type
export type ComponentPropsType = QuestionInputPropsType & QuestionTitlePropsType

// 组件的配置
export type ComponentConfType = {
  title: string
  type: string
  Component: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
}

// 全部的组件配置列表
const componentConfList: ComponentConfType[] = [QuestionInputConf, QuestionTitleConf]

//组件分组
export const componentConfGroup = [
  {
    groupId: 'text',
    groupName: '文本显示',
    componentList: [QuestionTitleConf],
  },
  {
    groupId: 'input',
    groupName: '用户输入',
    componentList: [QuestionInputConf],
  },
]

export function getComponentConfByType(type: string) {
  return componentConfList.find(c => c.type === type)
}
