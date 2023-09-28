import React, { FC } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import Style from './index.module.scss'
import EditCanvas from './EditCanvas'

const Edit: FC = () => {
  const { loading } = useLoadQuestionData()
  return (
    <div className={Style.container}>
      <div style={{ backgroundColor: '#fff', height: '40px' }}>Header</div>
      <div className={Style['container-wrapper']}>
        <div className={Style.content}>
          <div className={Style.left}>Left</div>
          <div className={Style.main}>
            <div className={Style['canvas-wrapper']}>
              <EditCanvas loading={loading} />
            </div>
          </div>
          <div className={Style.right}>Right</div>
        </div>
      </div>
    </div>
  )
}

export default Edit
