import service from "../util/request.js";

//注册
export function register(data) {
    return service({
        //请求路径
        url: `/api/user/register`,
        //请求方法
        method: 'post',
        //数据（ps：此处使用了es6解构的语法，原写法为  params: params）				
        data
    })
}

// 登录
export function login(data) {
    return service({
        //请求路径
        url: `/api/user/login`,
        //请求方法
        method: 'post',
        //数据（ps：此处使用了es6解构的语法，原写法为  params: params）				
        data
    })
}


//获取用户信息
export function getUserInfo() {
    return service({
        //请求路径
        url: `/api/user/info`,
        //请求方法
        method: 'get'
    })
}

//修改用户信息
export function updateUserInfo(data) {
    return service({
        //请求路径
        url: `/api/user/info`,
        //请求方法
        method: 'put',
        data

    })
}

//获取用户企业微信账号
export function getQiyeweixinAccountInfo(params) {
    return service({
        //请求路径
        url: `/api/user/qiyeweixin/userid`,
        //请求方法
        method: 'get',
        params

    })
}

//获取用户企业微信邀请码
export function getQiyeweixinInviteCode(params) {
    return service({
        //请求路径
        url: `/api/user/qiyeweixin/getInviteCode`,
        //请求方法
        method: 'get',
        params
    })
}

//上传资料文件
export function uploadData(data) {
    return fetch({
        url: `/api/user/uploadData`,
        method: 'post',
        //上传表单文件，请求头中Content-Type设置为multipart/form-data，数据类型为表单上传文件
        headers: {
            "Content-Type": "multipart/form-data"
        },
        //在向服务器发送前，修改请求数据
        // 它只能用于 'PUT', 'POST' 和 'PATCH' 这几个请求方法
        //修改请求头也可以，以上就是修改了请求头，因此此处直接返回即可
        transformRequest(data) {
            //对发送的data进行转换处理
            return data;
        }
    })
}
//下载文件
export function downloadData(params) {
    return fetch({
        url: `/api/user/downloadData`,
        method: 'get',
        params,
        //设置响应的数据类型，默认为json，其值有：'arraybuffer', 'document', 'json', 'text', 'stream','blob'
        //后端返回的是数据流时设置为blob；返回的二进制buffer流时，设置为arraybuffer
        responseType: 'blob',
    })
}
