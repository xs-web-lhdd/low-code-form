import React, { FC } from 'react'
import { Tabs } from 'antd'
import { AppstoreAddOutlined, BarsOutlined } from '@ant-design/icons'
import ComponentLib from './ComponentLib'
import Layers from './Layers'

const LeftPanel: FC = () => {
  const tableItems = [
    {
      key: 'componentLib',
      label: (
        <span>
          <AppstoreAddOutlined />
          组件库
        </span>
      ),
      children: <ComponentLib />,
    },
    {
      key: 'layers',
      label: (
        <span>
          <BarsOutlined />
          图层
        </span>
      ),
      children: <Layers />,
    },
  ]

  return <Tabs defaultActiveKey="componentLib" items={tableItems} />
}

export default LeftPanel
