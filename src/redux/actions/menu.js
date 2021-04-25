import { SAVE_TITLE } from '../action_types'

export const saveTitle = data => {
    return { type: SAVE_TITLE, data };
}