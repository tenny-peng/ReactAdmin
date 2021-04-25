import { combineReducers } from 'redux'
import userInfo from './login'
import title from './menu'

export default combineReducers({
    userInfo,
    title
})