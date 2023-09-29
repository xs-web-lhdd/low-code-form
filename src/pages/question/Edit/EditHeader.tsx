import React, { FC } from 'react'
import Style from './EditHeader.module.scss'
import { Button, Typography, Space } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import EditToolbar from './EditToolbar'

const { Title } = Typography

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
            <Title>问卷标题</Title>
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
