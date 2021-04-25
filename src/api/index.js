import myAxios from './myAxios'
import {BASE_URL} from '../config'

// 登录请求
export const reqLogin = (username, password) => myAxios.post(`${BASE_URL}/login`, { username, password })

export const reqUserList = () => myAxios.get(`${BASE_URL}/manage/user/list`)

export const reqWeather = (city) => myAxios.get('https://restapi.amap.com/v3/weather/weatherInfo?key=6206d69b1172d0da6e7e15f8695ce4ae&city=' + city)