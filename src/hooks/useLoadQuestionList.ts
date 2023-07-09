import { useSearchParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { getQuestionListApi } from '../services/question'
import { LIST_SEARCH_PARAM_NAME } from '../constant'

type OptionType = {
  isStar?: boolean
  isDeleted?: boolean
}

function useLoadQuestionList(option: OptionType = {}) {
  const { isStar = false, isDeleted = false } = option
  const [searchParams] = useSearchParams()

  const { data, loading, error } = useRequest(
    async () => {
      const keyword = searchParams.get(LIST_SEARCH_PARAM_NAME) || ''
      const data = await getQuestionListApi({ keyword, isStar, isDeleted })
      return data
    },
    {
      // 刷新的依赖项
      refreshDeps: [searchParams],
    }
  )

  return { data, loading, error }
}

export default useLoadQuestionList
