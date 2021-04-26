import myAxios from './myAxios'
import {BASE_URL, WEATHER_AK, CITY} from '../config'

// 登录请求
export const reqLogin = (username, password) => myAxios.post(`${BASE_URL}/login`, { username, password })

export const reqCategoryList = () => myAxios.get(`${BASE_URL}/manage/category/list`)

export const reqUserList = () => myAxios.get(`${BASE_URL}/manage/user/list`)

export const reqWeather = () => myAxios.get(`https://restapi.amap.com/v3/weather/weatherInfo?key=${WEATHER_AK}&city=${CITY}`)