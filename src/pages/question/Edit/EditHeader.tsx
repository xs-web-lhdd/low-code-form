import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import Style from './EditHeader.module.scss'
import { Button, Typography, Space, Input, message } from 'antd'
import { EditOutlined, LeftOutlined, LoadingOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import EditToolbar from './EditToolbar'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { useDispatch } from 'react-redux'
import { changePageTitle } from '../../../store/pageInfoReducer'
import { updateQuestionApi } from '../../../services/question'
import { useDebounceEffect, useKeyPress, useRequest } from 'ahooks'

const { Title } = Typography

// 显示和修改标题
const TitleElem: FC = () => {
  const dispatch = useDispatch()
  const { title } = useGetPageInfo()
  const [editState, setEditState] = useState(false)

  // 修改标题
  function handleChangeTitle(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value.trim()
    if (!newTitle) return
    dispatch(changePageTitle(newTitle))
  }
  if (editState) {
    return (
      <Input
        value={title}
        onPressEnter={() => setEditState(false)}
        onBlur={() => setEditState(false)}
        onChange={handleChangeTitle}
      />
    )
  }
  return (
    <Space>
      <Title>{title}</Title>
      <Button icon={<EditOutlined />} type="text" onClick={() => setEditState(true)} />
    </Space>
  )
}

// 保存
const SaveButton: FC = () => {
  // 保存 PageInfo 和 componentList 的信息
  const { componentList = [] } = useGetComponentInfo()
  const pageInfo = useGetPageInfo()
  // 获取问卷 id
  const { id } = useParams()

  // 快捷键
  useKeyPress(['ctrl.s', 'meta.c'], (event: KeyboardEvent) => {
    // 组织默认行为,防止网页的保存
    event.preventDefault()
    if (!loading) save()
  })

  const { loading, run: save } = useRequest(
    async () => {
      if (!id) return
      await updateQuestionApi(id, { ...pageInfo, componentList })
    },
    {
      manual: true,
      onSuccess() {
        message.success('保存成功!')
      },
    }
  )

  // TODO: 每隔 1s 保存,有 bug
  // 自动保存(不是定期保存,不是定时器,增加防抖)
  // useDebounceEffect(
  //   () => {
  //     save()
  //     console.log('保存', componentList)
  //   },
  //   [componentList, pageInfo],
  //   {
  //     wait: 1000,
  //   }
  // )
  return (
    <Button onClick={save} disabled={loading} icon={loading ? <LoadingOutlined /> : null}>
      保存
    </Button>
  )
}

const PublishButton: FC = () => {
  // 获取问卷 id PageInfo 和 componentList 的信息
  const { id } = useParams()
  const { componentList = [] } = useGetComponentInfo()
  const pageInfo = useGetPageInfo()
  const nav = useNavigate()
  const { loading, run: pub } = useRequest(
    async () => {
      if (!id) return
      await updateQuestionApi(id, { ...pageInfo, componentList, isPublished: true })
    },
    {
      manual: true,
      onSuccess() {
        message.success('发布成功!')
        nav('/question/stat/' + id)
      },
    }
  )

  return (
    <Button
      type="primary"
      onClick={pub}
      disabled={loading}
      icon={loading ? <LoadingOutlined /> : null}
    >
      发布
    </Button>
  )
}

const EditHeader: FC = () => {
  const nav = useNavigate()
  return (
    <div className={Style['header-wrapper']}>
      <div className={Style.header}>
        <div className={Style.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <TitleElem />
          </Space>
        </div>
        <div className={Style.main}>
          <EditToolbar />
        </div>
        <div className={Style.right}>
          <Space>
            <SaveButton />
            <PublishButton />
          </Space>
        </div>
      </div>
    </div>
  )
}

export default EditHeader
