import { useSelector } from 'react-redux'
import { StateType } from '../store'
import { PageInfoStateType } from '../store/pageInfoReducer'

function useGetPageInfo() {
  const { title, desc, js, css } = useSelector<StateType>(
    state => state.pageInfo
  ) as PageInfoStateType

  return { title, desc, js, css }
}

export default useGetPageInfo
