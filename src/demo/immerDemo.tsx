import React, { FC, useEffect, useState } from 'react'
import produce from 'immer'

const Demo: FC = () => {
  const [userInfo, setUserInfo] = useState({ name: '刘豪', age: 20 })
  const [list, setList] = useState(['x', 'y'])

  useEffect(() => {
    console.log('userInfo 已经发生了更改！！！')
  }, [userInfo])

  function changeAge() {
    // setUserInfo({
    //   ...userInfo,
    //   age: 21,
    // })

    setUserInfo(
      // 好处:
      produce(draft => {
        draft.name = '爽约'
        draft.age = 21
      })
    )

    setList(
      produce(draft => {
        draft.push('z')
      })
    )
  }

  return (
    <div>
      <h2>state 不可变数据</h2>
      <div>{JSON.stringify(userInfo)}</div>

      {list.map(item => {
        return <div key={item}>{item}</div>
      })}

      <button onClick={changeAge}>change age</button>
    </div>
  )
}

export default Demo
