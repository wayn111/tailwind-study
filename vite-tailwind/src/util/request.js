//创建axios实例
import axios from 'axios'
import router from '../router/index'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getLocalStorage } from '../util/localStorage'
import { getToken, removeToken } from '../util/auth'

let baseURL = import.meta.env.VITE_APP_URL
console.log(import.meta.env)

//创建axios实例
const service = axios.create({
    //超时时间，这里是5秒
    timeout: 5000,
    baseURL: baseURL
})


// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent
        if (getLocalStorage('token')) {
            // let each request carry token
            // ['X-Token'] is a custom headers key
            // please modify it according to the actual situation
            config.headers['Authorization'] = 'Bearer ' + getToken()
        }
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// 添加响应拦截器
service.interceptors.response.use(response => {
    // 只返回data中的信息
    const resp = response.data;
    // 文件下载类型，直接返回所有的
    if (response.request.responseType == "blob") {
        return response;
    }
    // token过期
    if (resp.code === 501) {
        ElMessage.error(resp.msg)
        removeToken()
        router.push({
            name: 'login'
        })
        return Promise.reject(resp.msg)
    }
    // 返回码不正确
    if (resp.code !== 200) {
        ElMessage.error(resp.msg)
        return Promise.reject(resp.msg)
    }
    return resp;
}, error => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    ElMessage.error(error.message)
    return Promise.reject(error);
});
//导入文件
export default service
