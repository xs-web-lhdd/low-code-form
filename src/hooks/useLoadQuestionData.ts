import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { getQuestionInfoApi } from '../services/question'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { resetComponents } from '../store/componentsReducer'

function useLoadQuestionData() {
  // 解析获取动态路由中的 id
  const { id = '' } = useParams()
  const dispatch = useDispatch()

  const { loading, data, error, run } = useRequest(
    async (id: string) => {
      if (!id) throw new Error('没有问卷 id')
      const data = await getQuestionInfoApi(id)

      return data
    },
    {
      manual: true,
    }
  )

  // 根据 data 设置 redux store
  useEffect(() => {
    if (!data) return
    const { title = '', componentList = [] } = data
    // 默认第一个组件被选中作为 selectedId
    let selectedId = ''
    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id
    }
    // 把 componentList 存储在 Store 中
    dispatch(resetComponents({ componentList, selectedId, copiedComponent: null }))
  }, [data])

  useEffect(() => {
    run(id)
  }, [id])

  return { loading, error }
}

export default useLoadQuestionData
