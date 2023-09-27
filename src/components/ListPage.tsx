import React, { FC, useEffect, useState } from 'react'
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import { Pagination } from 'antd'
import {
  LIST_PAGE,
  LIST_PAGE_SIZE,
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE_PARAM_KEY,
} from '../constant'

type PropsType = {
  total: number
}

const ListPage: FC<PropsType> = (props: PropsType) => {
  const { total } = props
  const [currentPage, setCurrentPage] = useState(LIST_PAGE)
  const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE)

  const [searchParams] = useSearchParams()
  const nav = useNavigate()
  const { pathname } = useLocation()

  // 从 url 中找到 page 和 pageSize, 并且同步到 Pagination 中
  useEffect(() => {
    const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) as string) || LIST_PAGE
    const pageSize =
      parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) as string) || LIST_PAGE_SIZE

    setCurrentPage(page)
    setPageSize(pageSize)
  }, [searchParams])

  function handlePageChange(page: number, pageSize: number) {
    searchParams.set(LIST_PAGE_PARAM_KEY, page.toString())
    searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString())

    nav({
      pathname,
      search: searchParams.toString(),
    })
  }

  return (
    <Pagination
      current={currentPage}
      pageSize={pageSize}
      total={total}
      onChange={handlePageChange}
    />
  )
}

export default ListPage
