import React, { FC, useState } from 'react'
import Styles from '../Common/Common.module.scss'
import { Typography, Empty } from 'antd'
import QuestionCard from '../../../components/QuestionCard'
import ListSearch from '../../../components/ListSearch'

type PropsType = {
  _id: string
  title: string
  isStar: boolean
  isPublished: boolean
  answerCount: number
  createdAt: string
}

const rawQuestionList: Array<PropsType> = [
  {
    _id: 'q1',
    title: '问卷1',
    isPublished: false,
    isStar: true,
    answerCount: 5,
    createdAt: '3月10日 13:23',
  },
  {
    _id: 'q2',
    title: '问卷2',
    isPublished: true,
    isStar: true,
    answerCount: 5,
    createdAt: '3月10日 13:23',
  },
  {
    _id: 'q3',
    title: '问卷3',
    isPublished: false,
    isStar: true,
    answerCount: 5,
    createdAt: '3月10日 13:23',
  },
]

const { Title } = Typography

const Star: FC = () => {
  const [questionList] = useState(rawQuestionList)

  return (
    <>
      <div className={Styles.header}>
        <div className={Styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={Styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={Styles.content}>
        {/* 问卷列表 */}
        {questionList.length === 0 && <Empty description="暂无数据" />}
        {questionList.length > 0 &&
          questionList.map(i => {
            const { _id } = i
            return <QuestionCard key={_id} {...i}></QuestionCard>
          })}
      </div>
      <div className={Styles.footer}>分页...</div>
    </>
  )
}

export default Star
