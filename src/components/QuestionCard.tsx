import React, { FC } from 'react'
import Styles from './QuestionCard.module.scss'

type PropsType = {
  _id: string
  title: string
  isStar: boolean
  isPublished: boolean
  answerCount: number
  createdAt: string
}

const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const { title, createdAt, answerCount, isPublished } = props
  return (
    <div className={Styles.container}>
      <div className={Styles.title}>
        <div className={Styles.left}>
          <a href="#">{title}</a>
        </div>
        <div className={Styles.right}>
          {isPublished ? <span style={{ color: 'yellowgreen' }}>已发布</span> : <span>未发布</span>}
          <span>答卷：{answerCount}</span>
          <span>{createdAt}</span>
        </div>
      </div>
      <div className={Styles['button-container']}>
        <div className={Styles.left}>
          <button>编辑问卷</button>
          <button>数据统计</button>
        </div>
        <div className={Styles.right}>
          <button>标星</button>
          <button>复制</button>
          <button>删除</button>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
