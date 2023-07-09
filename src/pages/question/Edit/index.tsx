import React, { FC } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'

const Edit: FC = () => {
  const { loading, data: questionData } = useLoadQuestionData()
  return <div>Edit {loading ? <p>loading</p> : JSON.stringify(questionData)}</div>
}

export default Edit
