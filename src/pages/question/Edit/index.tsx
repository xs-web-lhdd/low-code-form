import React, { FC } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import Style from './index.module.scss'
import EditCanvas from './EditCanvas'
import { changeSelectedId } from '../../../store/componentsReducer'
import { useDispatch } from 'react-redux'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'
import EditHeader from './EditHeader'

const Edit: FC = () => {
  const { loading } = useLoadQuestionData()
  const dispatch = useDispatch()
  function clearSelectedId() {
    dispatch(changeSelectedId(''))
  }
  return (
    <div className={Style.container}>
      <div style={{ backgroundColor: '#fff', height: '52px' }}>
        <EditHeader />
      </div>
      <div className={Style['container-wrapper']}>
        <div className={Style.content}>
          <div className={Style.left}>
            <LeftPanel />
          </div>
          <div className={Style.main} onClick={clearSelectedId}>
            <div className={Style['canvas-wrapper']}>
              <EditCanvas loading={loading} />
            </div>
          </div>
          <div className={Style.right}>
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Edit
