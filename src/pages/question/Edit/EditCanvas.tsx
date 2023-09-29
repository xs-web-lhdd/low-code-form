import React, { FC, MouseEvent } from 'react'
import Style from './EditCanvas.module.scss'
import QuestionTitle from '../../../components/QuestionComponents/QuestionTitle/Component'
import QuestionInput from '../../../components/QuestionComponents/QuestionInput/Component'
import { Spin } from 'antd'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { getComponentConfByType } from '../../../components/QuestionComponents'
import { ComponentInfoType, changeSelectedId } from '../../../store/componentsReducer'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import useBindCanvasKeyPress from '../../../hooks/useBindCanvasKeyPress'

type PropsType = {
  loading: boolean
}

function genComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo
  const componentConf = getComponentConfByType(type)

  if (componentConf == null) return null

  const { Component } = componentConf

  return <Component {...props} />
}

const EditCanvas: FC<PropsType> = ({ loading }: PropsType) => {
  const { componentList, selectedId } = useGetComponentInfo()
  const dispatch = useDispatch()

  function handleClick(event: MouseEvent, id: string) {
    // 阻止冒泡,否则选中无法显示选中框
    event.stopPropagation()
    dispatch(changeSelectedId(id))
  }

  // 绑定快捷键
  useBindCanvasKeyPress()

  if (loading)
    return (
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Spin />
      </div>
    )
  return (
    <div className={Style.canvas}>
      {componentList
        .filter(c => !c.isHidden)
        .map(c => {
          const { fe_id, isLocked } = c
          const wrapperDefaultClassName = Style['component-wrapper']
          const selectedClassName = Style.selected
          const lockedClassName = Style.locked
          const wrapperClassName = classNames({
            [wrapperDefaultClassName]: true,
            [selectedClassName]: selectedId == fe_id,
            [lockedClassName]: isLocked,
          })
          return (
            <div
              key={fe_id}
              className={wrapperClassName}
              onClick={event => handleClick(event, fe_id)}
            >
              <div className={Style.component}>{genComponent(c)}</div>
            </div>
          )
        })}
      {/* <div className={Style['component-wrapper']}>
        <div className={Style.component}>
          <QuestionTitle></QuestionTitle>
        </div>
      </div>
      <div className={Style['component-wrapper']}>
        <div className={Style.component}>
          <QuestionInput></QuestionInput>
        </div>
      </div> */}
    </div>
  )
}

export default EditCanvas
