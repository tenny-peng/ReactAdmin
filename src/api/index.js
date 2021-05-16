import myAxios from './myAxios'
import {BASE_URL, WEATHER_AK, CITY} from '../config'

// 登录请求
export const reqLogin = (username, password) => myAxios.post(`${BASE_URL}/login`, { username, password })

export const reqWeather = () => myAxios.get(`https://restapi.amap.com/v3/weather/weatherInfo?key=${WEATHER_AK}&city=${CITY}`)

// category
export const reqCategoryList = () => myAxios.get(`${BASE_URL}/manage/category/list`)

export const reqAddCategory = ({ categoryName }) => myAxios.post(`${BASE_URL}/manage/category/add`, { categoryName })

export const reqUpdateCategory = ({ categoryId, categoryName }) => myAxios.post(`${BASE_URL}/manage/category/update`, { categoryId, categoryName })

// product
export const reqProductList = (pageNum, pageSize) => myAxios.get(`${BASE_URL}/manage/product/list`, { params: { pageNum, pageSize } })

export const reqUpdateProdStatus = (productId, status) => myAxios.post(`${BASE_URL}/manage/product/updateStatus`, { productId, status })

export const reqSearchProduct = (pageNum, pageSize, searchType, keyWord) => myAxios.get(`${BASE_URL}/manage/product/search`, { params: { pageNum, pageSize, [searchType]: keyWord } })
    
// 这个方法demo后台就没写
export const reqProdById = (productId) => myAxios.get(`${BASE_URL}/manage/product/info`, { params: { productId } })

export const reqAddProduct = (productObj) => myAxios.post(`${BASE_URL}/manage/product/add`, { ...productObj })

export const reqUpdateProduct = (productObj) => myAxios.post(`${BASE_URL}/manage/product/update`, { ...productObj })

// 删除图片
export const reqDeletePicture = (name) => myAxios.post(`${BASE_URL}/manage/img/delete`, { name })

// role
export const reqRoleList = () => myAxios.get(`${BASE_URL}/manage/role/list`)

export const reqAddRole = ({ roleName }) => myAxios.post(`${BASE_URL}/manage/role/add`, { roleName })
// 给角色授权
export const reqAuthRole = (roleObj) => myAxios.post(`${BASE_URL}/manage/role/update`, { ...roleObj, auth_time: Date.now() })

// user
export const reqUserList = () => myAxios.get(`${BASE_URL}/manage/user/list`)

export const reqAddUser = (userObj) => myAxios.post(`${BASE_URL}/manage/user/add`, { ...userObj })
    