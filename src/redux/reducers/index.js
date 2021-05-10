import { combineReducers } from 'redux'
import userInfo from './login'
import title from './menu'
import list from './list'
import categoryList from './category'

export default combineReducers({
    userInfo,
    title,
    list,
    categoryList
})