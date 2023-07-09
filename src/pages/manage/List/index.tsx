import React, { FC, useEffect, useState, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTitle, useDebounceFn, useRequest } from 'ahooks'
import Styles from '../Common/Common.module.scss'
import { Typography, Spin, Empty } from 'antd'
import QuestionCard from '../../../components/QuestionCard'
import ListSearch from '../../../components/ListSearch'
import { getQuestionListApi } from '../../../services/question'
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_NAME } from '../../../constant'

const { Title } = Typography

const List: FC = () => {
  useTitle('我的问卷！')

  // 是否已经开始加载，防抖有延迟
  const [started, setStarted] = useState(false)
  const [page, setPage] = useState(1)
  const [questionList, setQuestionList] = useState([])
  const [total, setTotal] = useState(0)
  const haveMoreData = total > questionList.length

  const [searchParams] = useSearchParams()
  const keyword = searchParams.get(LIST_SEARCH_PARAM_NAME) || ''

  // 当 keyword 变化时，重置信息
  useEffect(() => {
    setStarted(false)
    setPage(1)
    setQuestionList([])
    setTotal(0)
  }, [keyword])

  // * 真正加载：
  const { run: load, loading } = useRequest(
    async () => {
      const data = await getQuestionListApi({
        page,
        pageSize: LIST_PAGE_SIZE,
        keyword,
      })

      return data
    },
    {
      manual: true,
      onSuccess({ list = [], total = 0 }) {
        // 累计：
        setQuestionList(list.concat(list))
        setTotal(total)
        setPage(page + 1)
      },
    }
  )

  const containerRef = useRef<HTMLDivElement>(null)
  // 添加防抖：
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current
      if (elem == null) return
      const domRect = elem.getBoundingClientRect()
      if (domRect == null) return
      const { bottom } = domRect
      if (bottom <= document.body.clientHeight) {
        // 真正加载数据
        load()
        setStarted(true)
      }
    },
    { wait: 500 }
  )

  // 1、页面首次加载，或者 url 参数（keyword）变化时，触发加载。。。
  useEffect(() => {
    tryLoadMore()
  }, [searchParams])
  // 2、当页面滚动时，触发加载。。。
  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener('scroll', tryLoadMore)
    }
    return () => {
      window.removeEventListener('scroll', tryLoadMore)
    }
  }, [searchParams, haveMoreData])

  // const [searchParams] = useSearchParams()
  // console.log('keyword', searchParams.get('keyword'))
  // console.log('age', searchParams.get('age'))

  // * 版本三： 使用 useLoadQuestionList 自定义钩子的写法：
  // const { data = {}, loading } = useLoadQuestionList()
  // const { list: questionList = [] } = data

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

  const LoadMoreContentElem = () => {
    if (!started || loading) return <Spin />
    if (total == 0) return <Empty description="暂无数据" />
    if (!haveMoreData) return <span>没有更多了...</span>
    return <span>开始加载下一页...</span>
  }
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
          questionList.map((i: any) => {
            const { _id } = i
            return <QuestionCard key={_id} {...i}></QuestionCard>
          })}
      </div>
      <div className={Styles.footer}>
        <div ref={containerRef}>{LoadMoreContentElem()}</div>
      </div>
    </>
  )
}

export default List
