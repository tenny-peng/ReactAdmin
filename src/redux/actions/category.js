import { SAVE_CATEGORY_LIST } from '../action_types'

export const saveCategoryList = data => {
    return { type: SAVE_CATEGORY_LIST, data };
}