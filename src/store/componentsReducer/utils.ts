import { ComponentInfoType, ComponentsStateType } from './index'

/**
 * 获取下一个 id
 * @param 要删除的组件 id
 * @param 组件列表
 * @returns 下一个组件 id
 */
export function getNextSelectedId(fe_id: string, componentList: Array<ComponentInfoType>) {
  const visibleComponentList = componentList.filter(c => !c.isHidden)
  const index = visibleComponentList.findIndex(c => c.fe_id === fe_id)
  if (index < 0) return ''
  // 重新计算 selected
  let newSelected = ''
  const length = visibleComponentList.length
  if (length <= 1) {
    newSelected = ''
  } else {
    if (index + 1 === length) {
      // 要删除最后一个，就要选中上一个
      newSelected = visibleComponentList[index - 1].fe_id
    } else {
      // 要删除的不是最后一个，删除以后选中下一个
      newSelected = visibleComponentList[index + 1].fe_id
    }
  }

  return newSelected
}

/**
 * 插入新组件
 * @param draft state draft
 * @param newComponent 新组件
 */
export function insertNewComponent(draft: ComponentsStateType, newComponent: ComponentInfoType) {
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
