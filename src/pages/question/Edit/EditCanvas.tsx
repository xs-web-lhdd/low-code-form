import React, { FC } from 'react'
import Style from './EditCanvas.module.scss'
import QuestionTitle from '../../../components/QuestionComponents/QuestionTitle/Component'
import QuestionInput from '../../../components/QuestionComponents/QuestionInput/Component'
import { Spin } from 'antd'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { getComponentConfByType } from '../../../components/QuestionComponents'
import { ComponentInfoType } from '../../../store/componentsReducer'

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
  const { componentList } = useGetComponentInfo()
  if (loading)
    return (
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Spin />
      </div>
    )
  return (
    <div className={Style.canvas}>
      {componentList.map(c => {
        const { fe_id } = c
        return (
          <div key={fe_id} className={Style['component-wrapper']}>
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
