import React, { FC } from 'react'
import { Button, Space, Tooltip } from 'antd'
import { DeleteOutlined, EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'
import {
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
} from '../../../store/componentsReducer'
import { useDispatch } from 'react-redux'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'

const EditToolbar: FC = () => {
  const dispatch = useDispatch()
  const { selectedId, selectedComponent } = useGetComponentInfo()
  const { isLocked } = selectedComponent || {}
  // 删除组件
  function handleDelete() {
    dispatch(removeSelectedComponent())
  }

  // 隐藏组件
  function handleHidden() {
    dispatch(changeComponentHidden({ isHidden: true }))
  }
  // 锁定组件
  function handleLock() {
    dispatch(toggleComponentLocked({ fe_id: selectedId }))
  }
  return (
    <Space>
      <Tooltip title="删除">
        <Button shape="circle" icon={<DeleteOutlined />} onClick={handleDelete}></Button>
      </Tooltip>
      <Tooltip title="隐藏">
        <Button shape="circle" icon={<EyeInvisibleOutlined />} onClick={handleHidden}></Button>
      </Tooltip>
      <Tooltip title="锁定">
        <Button
          shape="circle"
          type={isLocked ? 'primary' : 'default'}
          icon={<LockOutlined />}
          onClick={handleLock}
        ></Button>
      </Tooltip>
    </Space>
  )
}

export default EditToolbar
