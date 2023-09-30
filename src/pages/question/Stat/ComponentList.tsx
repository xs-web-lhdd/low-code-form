import React, { FC } from 'react'
import Style from './ComponentList.module.scss'
import { getComponentConfByType } from '../../../components/QuestionComponents'
import classNames from 'classnames'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'

type PropsType = {
  selectedComponentId: string
  setSelectedComponentId: (id: string) => void
  setSelectedComponentType: (type: string) => void
}

const ComponentList: FC<PropsType> = (props: PropsType) => {
  const { componentList } = useGetComponentInfo()
  const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props

  return (
    <div className={Style.container}>
      {componentList
        .filter(c => !c.isHidden) // 过滤隐藏组件
        .map(c => {
          const { fe_id, props, type } = c

          const componentConf = getComponentConfByType(type)
          if (componentConf == null) return null

          const { Component } = componentConf

          // 拼接 class name

          const wrapperDefaultClassName = Style['component-wrapper']
          const selectedClassName = Style.selected
          const wrapperClassName = classNames({
            [wrapperDefaultClassName]: true,
            [selectedClassName]: fe_id === selectedComponentId, // 是否选中
          })

          return (
            <div
              className={wrapperClassName}
              key={fe_id}
              onClick={() => {
                setSelectedComponentId(fe_id)
                setSelectedComponentType(type)
              }}
            >
              <div className={Style.component}>
                <Component {...props} />
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default ComponentList
