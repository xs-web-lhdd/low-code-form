import React, { FC, useEffect, useState } from 'react'
import type { ChangeEvent } from 'react'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { Input } from 'antd'
import { LIST_SEARCH_PARAM_NAME } from '../constant'

const { Search } = Input

const ListSearch: FC = () => {
  const [value, setValue] = useState('')
  const nav = useNavigate()
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()
  useEffect(() => {
    const curVal = searchParams.get(LIST_SEARCH_PARAM_NAME) || ''
    setValue(curVal)
  }, [searchParams])
  // 变成受控组件：
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
  // 搜索后进行更改路由，路由的更改会影响列表的值，好的设计，不影响列表组件，减少耦合。
  function handleSearch(value: string) {
    nav({
      pathname,
      search: `${LIST_SEARCH_PARAM_NAME}=${value}`,
    })
  }
  return (
    <Search
      size="large"
      placeholder="请输入关键字"
      allowClear
      value={value}
      onChange={handleChange}
      onSearch={handleSearch}
      style={{ width: '200px' }}
    />
  )
}

export default ListSearch
