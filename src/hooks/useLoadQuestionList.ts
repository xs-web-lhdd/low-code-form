import { useSearchParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { getQuestionListApi } from '../services/question'
import {
  LIST_SEARCH_PARAM_NAME,
  LIST_PAGE,
  LIST_PAGE_SIZE,
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE_PARAM_KEY,
} from '../constant'

type OptionType = {
  isStar?: boolean
  isDeleted?: boolean
}

function useLoadQuestionList(option: OptionType = {}) {
  const { isStar = false, isDeleted = false } = option
  const [searchParams] = useSearchParams()

  const { data, loading, error, refresh } = useRequest(
    async () => {
      const keyword = searchParams.get(LIST_SEARCH_PARAM_NAME) || ''
      const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) as string) || LIST_PAGE
      const pageSize =
        parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) as string) || LIST_PAGE_SIZE

      const data = await getQuestionListApi({ keyword, isStar, isDeleted, page, pageSize })
      return data
    },
    {
      // 刷新的依赖项
      refreshDeps: [searchParams],
    }
  )

  return { data, loading, error, refresh }
}

export default useLoadQuestionList
