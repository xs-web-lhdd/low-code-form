import React, { FC, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Input, Popover, Space, Tooltip, Typography, message } from 'antd'
import type { InputRef } from 'antd'
import QRCode from 'qrcode.react'
import Style from './StatHeader.module.scss'
import { CopyOutlined, LeftOutlined, QrcodeOutlined } from '@ant-design/icons'
import useGetPageInfo from '../../../hooks/useGetPageInfo'

const { Title } = Typography

const StatHeader: FC = () => {
  const nav = useNavigate()
  const { id } = useParams()
  const { title, isPublished } = useGetPageInfo()

  function genLinkAndQRCodeElem() {
    if (!isPublished) return null

    // 拼接 url 要参考 C 端的规则
    const url = `http://localhost:3000/question/${id}`

    // 拷贝链接
    const urlInputRef = useRef<InputRef>(null)
    function copy() {
      const elem = urlInputRef.current
      if (elem == null) return
      // 选中 input 的内容
      elem.select()
      // 拷贝选中内容
      document.execCommand('copy')
      elem.blur()
      message.success('拷贝成功!')
    }

    // 定义二维码组件
    const QRCodeElem = (
      <div style={{ textAlign: 'center' }}>
        <QRCode value={url} size={150} />
      </div>
    )

    return (
      <Space>
        <Input value={url} style={{ width: '300px' }} ref={urlInputRef} />
        <Tooltip title="拷贝链接">
          <Button icon={<CopyOutlined />} onClick={copy}></Button>
        </Tooltip>
        <Popover content={QRCodeElem}>
          <Button icon={<QrcodeOutlined />}></Button>
        </Popover>
      </Space>
    )
  }

  return (
    <div className={Style['header-wrapper']}>
      <div className={Style.header}>
        <div className={Style.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <Title>{title}</Title>
          </Space>
        </div>
        <div className={Style.main}>{genLinkAndQRCodeElem()}</div>
        <div className={Style.right}>
          <Button type="primary" onClick={() => nav(`/question/edit/${id}`)}>
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  )
}

export default StatHeader
