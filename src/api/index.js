import myAxios from './myAxios'
import {BASE_URL, WEATHER_AK, CITY} from '../config'

// 登录请求
export const reqLogin = (username, password) => myAxios.post(`${BASE_URL}/login`, { username, password })

export const reqWeather = () => myAxios.get(`https://restapi.amap.com/v3/weather/weatherInfo?key=${WEATHER_AK}&city=${CITY}`)

export const reqUserList = () => myAxios.get(`${BASE_URL}/manage/user/list`)

// category
export const reqCategoryList = () => myAxios.get(`${BASE_URL}/manage/category/list`)

export const reqAddCategory = ({ categoryName }) => myAxios.post(`${BASE_URL}/manage/category/add`, { categoryName })

export const reqUpdateCategory = ({ categoryId, categoryName }) => myAxios.post(`${BASE_URL}/manage/category/update`, {categoryId, categoryName})