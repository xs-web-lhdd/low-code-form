import { configureStore } from '@reduxjs/toolkit'
import userReducer, { UserStateType } from './userReducer'
import componentsReducer, { ComponentsStateType } from './componentsReducer'
import pageInfoReducer, { PageInfoStateType } from './pageInfoReducer'

export type StateType = {
  user: UserStateType
  components: ComponentsStateType
  pageInfo: PageInfoStateType
}

export default configureStore({
  reducer: {
    // 分模块
    user: userReducer,
    components: componentsReducer,
    pageInfo: pageInfoReducer,
  },
})
