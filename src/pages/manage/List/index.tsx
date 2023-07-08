import React, { FC, useState } from 'react'
// import { useSearchParams } from 'react-router-dom'
import { useTitle } from 'ahooks'
import Styles from '../Common/Common.module.scss'
import { Typography } from 'antd'
import QuestionCard from '../../../components/QuestionCard'
import ListSearch from '../../../components/ListSearch'

const rawQuestionList = [
  {
    _id: 'q1',
    title: '问卷1',
    isPublished: false,
    isStar: false,
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
  {
    _id: 'q4',
    title: '问卷4',
    isPublished: true,
    isStar: false,
    answerCount: 5,
    createdAt: '3月10日 13:23',
  },
]

const { Title } = Typography

const List: FC = () => {
  useTitle('我的问卷！')

  // const [searchParams] = useSearchParams()
  // console.log('keyword', searchParams.get('keyword'))
  // console.log('age', searchParams.get('age'))

  const [questionList] = useState(rawQuestionList)

  return (
    <>
      <div className={Styles.header}>
        <div className={Styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={Styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={Styles.content}>
        {/* 问卷列表 */}
        {questionList.length > 0 &&
          questionList.map(i => {
            const { _id } = i
            return <QuestionCard key={_id} {...i}></QuestionCard>
          })}
      </div>
      <div className={Styles.footer}>loadMore... 上划加载更多...</div>
    </>
  )
}

export default List
