import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getQuestionInfoApi } from '../services/question'

function useLoadQuestionData() {
  // 解析获取动态路由中的 id
  const { id = '' } = useParams()
  const [loading, setLoading] = useState(false)
  const [questionData, setQuestionData] = useState({})

  // * 获取问卷详情
  async function getQuestionInfo(id: string) {
    setLoading(true)
    const data = await getQuestionInfoApi(id)
    setQuestionData(data)
    setLoading(false)
  }

  useEffect(() => {
    getQuestionInfo(id)
  }, [])

  return { loading, questionData }
}

export default useLoadQuestionData
