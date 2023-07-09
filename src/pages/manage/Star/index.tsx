import React, { FC } from 'react'
import Styles from '../Common/Common.module.scss'
import { Typography, Empty, Spin } from 'antd'
import QuestionCard from '../../../components/QuestionCard'
import ListSearch from '../../../components/ListSearch'
import useLoadQuestionList from '../../../hooks/useLoadQuestionList'
import ListPage from '../../../components/ListPage'

const { Title } = Typography

const Star: FC = () => {
  const { data = {}, loading } = useLoadQuestionList({ isStar: true })
  const { list: questionList = [], total } = data

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
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin size="large" />
          </div>
        )}
        {/* 问卷列表 */}
        {!loading && questionList.length === 0 && <Empty description="暂无数据" />}
        {!loading &&
          questionList.length > 0 &&
          questionList.map((i: any) => {
            const { _id } = i
            return <QuestionCard key={_id} {...i}></QuestionCard>
          })}
      </div>
      <div className={Styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  )
}

export default Star
