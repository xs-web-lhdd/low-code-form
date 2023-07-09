import React, { FC } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'

const Stat: FC = () => {
  const { loading, questionData } = useLoadQuestionData()
  return <div>Stat {loading ? <p>loading</p> : JSON.stringify(questionData)}</div>
}

export default Stat
