import axios from "axios";
import {getToken} from "@/utils/auth.js";
import {notify} from "@/utils/message.js";
// import errorCode, {type ErrorCodeKey} from "./errorCode";

// 创建 Axios 实例
const instance = axios.create({
    baseURL: '/api', // 被vite代理
    timeout: 1000,
  });

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在请求之前自动添加 token
    const token = getToken();
    if(token){
        config.headers['token'] = token;
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // console.log("response" + response);
//     const code = response.data.code || 200;
//     const msg = !(code in errorCode) ? response.data.msg : errorCode[code as ErrorCodeKey] ?? errorCode['default'];
//     if(code === 401){
//         notify(msg, 'error');
//         return Promise.reject("无效的会话，或会话已过期，请重新登录")
//     }else if (code == 500){
//         notify(msg, 'error');
//         return Promise.reject("认证失败");
//     }
//
//
    // 放行
    return response.data.data;
  }, function (error) {
    // 错误响应统一提示
    notify(error.response.data.msg || '请求失败', 'error')
    return Promise.reject(error);
  });

export default instance