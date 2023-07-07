import React, { FC } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Styles from './QuestionCard.module.scss'
import { Button, Space, Divider, Tag } from 'antd'
import {
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
  StarFilled,
  CopyOutlined,
  DeleteOutlined,
} from '@ant-design/icons'

type PropsType = {
  _id: string
  title: string
  isStar: boolean
  isPublished: boolean
  answerCount: number
  createdAt: string
}

const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const { _id, title, createdAt, answerCount, isPublished, isStar } = props
  const nav = useNavigate()

  return (
    <div className={Styles.container}>
      <div className={Styles.title}>
        <div className={Styles.left}>
          <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
            <Space>
              {isStar && <StarOutlined style={{ color: 'red' }} />}
              {title}
            </Space>
          </Link>
        </div>
        <div className={Styles.right}>
          <Space>
            {isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}
            <span>答卷：{answerCount}</span>
            <span>{createdAt}</span>
          </Space>
        </div>
      </div>
      <Divider style={{ margin: '12px' }} />
      <div className={Styles['button-container']}>
        <div className={Styles.left}>
          <Space>
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              onClick={() => nav(`/question/edit/${_id}`)}
            >
              编辑问卷
            </Button>
          </Space>
          <Space>
            <Button
              type="text"
              size="small"
              icon={<LineChartOutlined />}
              onClick={() => nav(`/question/stat/${_id}`)}
              disabled={!isPublished}
            >
              数据统计
            </Button>
          </Space>
        </div>
        <div className={Styles.right}>
          <Space>
            <Button
              type="text"
              size="small"
              icon={isStar ? <StarOutlined /> : <StarFilled style={{ color: 'red' }} />}
            >
              {isStar ? '取消标星' : '标星'}
            </Button>
          </Space>
          <Space>
            <Button type="text" size="small" icon={<CopyOutlined />}>
              复制
            </Button>
          </Space>
          <Space>
            <Button type="text" size="small" icon={<DeleteOutlined />}>
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
