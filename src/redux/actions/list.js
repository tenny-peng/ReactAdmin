import { SAVE_LIST } from '../action_types'

export const saveList = data => {
    return { type: SAVE_LIST, data };
}