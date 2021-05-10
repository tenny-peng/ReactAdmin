import { SAVE_LIST } from '../action_types'

const initState = []
export default function saveTitle(preState = initState, action) {
    const { type, data } = action;
    let newState
    switch (type) {
        case SAVE_LIST:
            newState = [...data]
            return newState;
        default:
            return preState;
    }
}