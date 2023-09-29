import React, { FC } from 'react'
import { componentConfGroup, ComponentConfType } from '../../../components/QuestionComponents'
import { Typography } from 'antd'
import Style from './ComponentLib.module.scss'
import { addComponent } from '../../../store/componentsReducer'
import { useDispatch } from 'react-redux'
import { nanoid } from 'nanoid'

const { Title } = Typography

function genComponent(c: ComponentConfType) {
  const dispatch = useDispatch()
  const { title, type, Component, defaultProps } = c

  function handleClick() {
    dispatch(
      addComponent({
        fe_id: nanoid(),
        title,
        type,
        props: defaultProps,
      })
    )
  }

  return (
    <div key={type} className={Style.wrapper} onClick={handleClick}>
      <div className={Style.component}>
        <Component />
      </div>
    </div>
  )
}

const Lib: FC = () => {
  return (
    <>
      {componentConfGroup.map((group, index) => {
        const { groupId, groupName, componentList } = group
        return (
          <div key={groupId}>
            <Title level={3} style={{ fontSize: '16px', marginTop: index > 0 ? '20px' : '0' }}>
              {groupName}
            </Title>
            <div>{componentList.map(c => genComponent(c))}</div>
          </div>
        )
      })}
    </>
  )
}

export default Lib
