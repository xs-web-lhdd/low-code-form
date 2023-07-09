import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { getQuestionInfoApi } from '../services/question'

function useLoadQuestionData() {
  // 解析获取动态路由中的 id
  const { id = '' } = useParams()

  // const [loading, setLoading] = useState(false)
  // const [questionData, setQuestionData] = useState({})
  // // * 获取问卷详情
  // async function getQuestionInfo(id: string) {
  //   setLoading(true)
  //   const data = await getQuestionInfoApi(id)
  //   setQuestionData(data)
  //   setLoading(false)
  // }
  // useEffect(() => {
  //   getQuestionInfo(id)
  // }, [])
  // return { loading, questionData }

  async function load() {
    const data = await getQuestionInfoApi(id)
    return data
  }
  const { loading, data, error } = useRequest(load)

  return { loading, data, error }
}

export default useLoadQuestionData
