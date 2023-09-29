import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import produce from 'immer'
import { ComponentPropsType } from '../../components/QuestionComponents'
import { getNextSelectedId } from './utils'

export type ComponentInfoType = {
  fe_id: string
  type: string
  title: string
  isHidden?: boolean
  isLocked?: boolean
  props: ComponentPropsType
}

export type ComponentsStateType = {
  selectedId: string
  componentList: Array<ComponentInfoType>
}

const INIT_STATE: ComponentsStateType = {
  selectedId: '',
  componentList: [],
}

export const componentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    // 重置所有组件
    resetComponents: (state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) => {
      return action.payload
    },
    // 修改 selectId
    changeSelectedId: produce((draft: ComponentsStateType, action: PayloadAction<string>) => {
      draft.selectedId = action.payload
    }),
    // 添加新组件
    addComponent: produce(
      (draft: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
        const newComponent = action.payload
        const { selectedId, componentList } = draft
        const index = componentList.findIndex(c => c.fe_id === selectedId)
        if (index < 0) {
          // 未选中组件，直接插入到最后面
          componentList.push(newComponent)
        } else {
          // 选中组件，插入选中组件的后边
          componentList.splice(index + 1, 0, newComponent)
        }
        draft.selectedId = newComponent.fe_id
      }
    ),
    // 修改组件属性
    changeComponentProps: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>
      ) => {
        const { fe_id, newProps } = action.payload
        // 找到了当前要修改属性的组件
        const curComp = draft.componentList.find(c => c.fe_id === fe_id)
        if (curComp) {
          curComp.props = {
            ...curComp.props,
            ...newProps,
          }
        }
      }
    ),
    // 删除选中的组件
    removeSelectedComponent: produce((draft: ComponentsStateType) => {
      const { componentList = [], selectedId: removedId } = draft
      // 重新计算 selectedId
      const newSelected = getNextSelectedId(removedId, componentList)
      draft.selectedId = newSelected

      const index = componentList.findIndex(c => c.fe_id === removedId)
      componentList.splice(index, 1)
    }),
    // 隐藏/显示 组件
    changeComponentHidden: produce(
      (draft: ComponentsStateType, action: PayloadAction<{ isHidden: boolean }>) => {
        const { componentList = [], selectedId: hiddenId } = draft
        const { isHidden } = action.payload

        if (!hiddenId) {
          console.log('请选中组建后再隐藏')
          return
        }

        // 重新计算 selectedId
        let newSelected = ''
        if (isHidden) {
          // 要隐藏
          newSelected = getNextSelectedId(hiddenId, componentList)
        } else {
          // 要显示
          newSelected = hiddenId
        }
        draft.selectedId = newSelected

        const curComp = componentList.find(c => c.fe_id === hiddenId)
        if (curComp) {
          curComp.isHidden = isHidden
        }
      }
    ),
    // 锁定组件
    toggleComponentLocked: produce(
      (draft: ComponentsStateType, action: PayloadAction<{ fe_id: string }>) => {
        const { fe_id } = action.payload

        const curComp = draft.componentList.find(c => c.fe_id === fe_id)
        if (curComp) {
          curComp.isLocked = !curComp.isLocked
        }
      }
    ),
  },
})

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
} = componentsSlice.actions

export default componentsSlice.reducer
