import React, { FC, lazy, useState } from 'react'
import { useTitle } from 'ahooks'
import Styles from '../Common/Common.module.scss'
import { Typography, Empty, Table, Tag, Button, Space, Modal, message, Spin } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import ListSearch from '../../../components/ListSearch'
import useLoadQuestionList from '../../../hooks/useLoadQuestionList'

const { Title } = Typography
const { confirm } = Modal

const Trash: FC = () => {
  useTitle('回收站！')

  const { data = {}, loading } = useLoadQuestionList({ isDeleted: true })
  const { list: questionList = [] } = data
  // 记录选中的 id
  const [selectedIds, setSelectedId] = useState<string[]>([])

  const tableColumns = [
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      render: (isPublished: boolean) =>
        isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>,
    },
    {
      title: '答卷',
      dataIndex: 'answerCount',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
    },
  ]
  function del() {
    confirm({
      title: '确定彻底删除该问卷？',
      icon: <ExclamationCircleOutlined />,
      content: '删除之后不可以找回',
      onOk: () => message.success(`删除 ${JSON.stringify(selectedIds)}`),
    })
  }

  const TableElement = (
    <>
      <div style={{ margin: '12px ' }}>
        <Space>
          <Button type="primary" disabled={selectedIds.length === 0}>
            恢复
          </Button>
          <Button danger disabled={selectedIds.length === 0} onClick={del}>
            彻底删除
          </Button>
        </Space>
      </div>
      <Table
        dataSource={questionList}
        columns={tableColumns}
        pagination={false}
        rowKey={item => item._id}
        rowSelection={{
          type: 'checkbox',
          onChange: selectedRowKeys => {
            setSelectedId(selectedRowKeys as string[])
          },
        }}
      />
    </>
  )

  return (
    <>
      <div className={Styles.header}>
        <div className={Styles.left}>
          <Title level={3}>回收站</Title>
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
        {!loading && questionList.length === 0 && <Empty description="暂无数据" />}
        {!loading && questionList.length > 0 && TableElement}
      </div>
      <div className={Styles.footer}>loadMore... 上划加载更多...</div>
    </>
  )
}

export default Trash
