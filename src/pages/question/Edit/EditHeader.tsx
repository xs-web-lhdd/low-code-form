import React, { ChangeEvent, FC, useState } from 'react'
import Style from './EditHeader.module.scss'
import { Button, Typography, Space, Input } from 'antd'
import { EditOutlined, LeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import EditToolbar from './EditToolbar'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { useDispatch } from 'react-redux'
import { changePageTitle } from '../../../store/pageInfoReducer'

const { Title } = Typography

// 显示和修改标题
const TitleElem: FC = () => {
  const dispatch = useDispatch()
  const { title } = useGetPageInfo()
  const [editState, setEditState] = useState(false)

  // 修改标题
  function handleChangeTitle(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value.trim()
    if (!newTitle) return
    dispatch(changePageTitle(newTitle))
  }
  if (editState) {
    return (
      <Input
        value={title}
        onPressEnter={() => setEditState(false)}
        onBlur={() => setEditState(false)}
        onChange={handleChangeTitle}
      />
    )
  }
  return (
    <Space>
      <Title>{title}</Title>
      <Button icon={<EditOutlined />} type="text" onClick={() => setEditState(true)} />
    </Space>
  )
}

const EditHeader: FC = () => {
  const nav = useNavigate()
  return (
    <div className={Style['header-wrapper']}>
      <div className={Style.header}>
        <div className={Style.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <TitleElem />
          </Space>
        </div>
        <div className={Style.main}>
          <EditToolbar />
        </div>
        <div className={Style.right}>
          <Space>
            <Button>保存</Button>
            <Button type="primary">发布</Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default EditHeader
