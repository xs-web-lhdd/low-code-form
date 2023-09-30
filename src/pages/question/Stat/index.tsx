import React, { FC, useState } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { Button, Result, Spin } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useTitle } from 'ahooks'
import Style from './index.module.scss'
import StatHeader from './StatHeader'
import ComponentList from './ComponentList'
import PageStat from './PageStat'

const Stat: FC = () => {
  const nav = useNavigate()
  const { loading } = useLoadQuestionData()
  const { title, isPublished } = useGetPageInfo()

  // 状态提升 selectedId type
  const [selectedComponentId, setSelectedComponentId] = useState('')
  const [selectedComponentType, setSelectedComponentType] = useState('')

  // 修改标题
  useTitle(`问卷统计 - ${title}`)

  // loading 效果
  const LoadingELem = (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <Spin />
    </div>
  )

  function genContentElem() {
    if (typeof isPublished === 'boolean' && !isPublished) {
      return (
        <div style={{ flex: '1' }}>
          <Result
            status="warning"
            title="该页面尚未发布"
            extra={
              <Button type="primary" onClick={() => nav(-1)}>
                返回上一页
              </Button>
            }
          ></Result>
        </div>
      )
    }

    return (
      <>
        <div className={Style.left}>
          <ComponentList
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          />
        </div>
        <div className={Style.main}>
          <PageStat
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          />
        </div>
        <div className={Style.right}>右</div>
      </>
    )
  }

  return (
    <div className={Style.container}>
      <StatHeader />
      <div className={Style['container-wrapper']}>
        {loading && LoadingELem}
        {!loading && <div className={Style.content}>{genContentElem()}</div>}
      </div>
    </div>
  )
}

export default Stat
