import React, { FC, useState } from 'react'
import { Pagination, Spin, Table, Typography } from 'antd'
import { getQuestionStatListApi } from '../../../services/stat'
import { useRequest } from 'ahooks'
import { useParams } from 'react-router-dom'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { STAT_PAGE_SIZE } from '../../../constant'

type PropsType = {
  selectedComponentId: string
  setSelectedComponentId: (id: string) => void
  setSelectedComponentType: (type: string) => void
}

const { Title } = Typography

const PageStat: FC<PropsType> = (props: PropsType) => {
  const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props
  const { id = '' } = useParams()
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(STAT_PAGE_SIZE)
  const [total, setTotal] = useState(0)
  const [list, setList] = useState([])

  const { loading } = useRequest(
    async () => {
      const data = await getQuestionStatListApi(id, { page, pageSize })
      return data
    },
    {
      refreshDeps: [id, page, pageSize],
      onSuccess(result) {
        const { total, list = [] } = result
        setTotal(total)
        setList(list)
      },
    }
  )

  const { componentList } = useGetComponentInfo()
  const columns = componentList.map(c => {
    const { fe_id, title, props = {}, type } = c

    const colTitle = props!.title || title

    return {
      title: (
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setSelectedComponentId(fe_id)
            setSelectedComponentType(type)
          }}
        >
          <span style={{ color: fe_id === selectedComponentId ? '#1890ff' : 'inherit' }}>
            {colTitle}
          </span>
        </div>
      ),
      dataIndex: fe_id,
    }
  })

  const TableElem = (
    <>
      <Table
        rowKey={(item: any) => item._id}
        columns={columns}
        dataSource={list}
        pagination={false}
      ></Table>

      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Pagination
          total={total}
          pageSize={pageSize}
          current={page}
          onChange={page => setPage(page)}
          onShowSizeChange={(page, pageSize) => {
            setPage(page)
            setPageSize(pageSize)
          }}
        ></Pagination>
      </div>
    </>
  )

  return (
    <div>
      {loading && (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
          <Spin />
        </div>
      )}
      <Title level={3}>答卷数量: {!loading && total}</Title>
      {!loading && TableElem}
    </div>
  )
}

export default PageStat
