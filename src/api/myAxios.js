import { message } from 'antd';
import axios from 'axios'
import qs from 'querystring'
import store from '../redux/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const instance = axios.create({
    timeout: 4000
});

instance.interceptors.request.use(config => {
    NProgress.start()
    const { userInfo } = store.getState
    if (userInfo) {
        config.headers.token = userInfo.token
    }
    const { method, data } = config
    if (method.toLowerCase() === 'post') {
        if (data instanceof Object) {
            config.data = qs.stringify(data)
        }
    }
    return config
});

instance.interceptors.response.use(
    response => {
        NProgress.done()
        return response.data
    },
    error => {
        NProgress.done()
        message.error(error.message)
        return new Promise(() => { })
    }
)

export default instance