import React, { FC } from 'react'
// import { useSearchParams } from 'react-router-dom'
import { useTitle } from 'ahooks'
import Styles from '../Common/Common.module.scss'
import { Typography, Spin } from 'antd'
import QuestionCard from '../../../components/QuestionCard'
import ListSearch from '../../../components/ListSearch'
import useLoadQuestionList from '../../../hooks/useLoadQuestionList'

const { Title } = Typography

const List: FC = () => {
  useTitle('我的问卷！')

  // const [searchParams] = useSearchParams()
  // console.log('keyword', searchParams.get('keyword'))
  // console.log('age', searchParams.get('age'))

  // * 版本三： 使用 useLoadQuestionList 自定义钩子的写法：
  const { data = {}, loading } = useLoadQuestionList()
  const { list: questionList = [] } = data

  // *版本二： 使用 useRequest 这个 hook 的写法：
  // const { data = {}, loading } = useRequest(getQuestionListApi)
  // const { list: questionList = [] } = data

  // *版本一： 常规写法：
  // const [questionList, setQuestionList] = useState([])
  // const [total, setTotal] = useState(0)

  // async function getQuestionList() {
  //   const data = await getQuestionListApi()
  //   const { list = [], total = 0 } = data
  //   setQuestionList(list)
  //   setTotal(total)
  //   return data
  // }

  // useEffect(() => {
  //   getQuestionList()
  // }, [])

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
        {/* 是loading 是加载 loading 动画 */}
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin size="large" />
          </div>
        )}
        {/* 不是 loading 时并且问卷列表长度大于 0 时，加载 问卷列表 */}
        {!loading &&
          questionList.length > 0 &&
          questionList.map((i: any) => {
            const { _id } = i
            return <QuestionCard key={_id} {...i}></QuestionCard>
          })}
      </div>
      <div className={Styles.footer}>loadMore... 上划加载更多...</div>
    </>
  )
}

export default List
