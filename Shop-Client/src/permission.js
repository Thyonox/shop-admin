import router from "@/router/index.js";
import {getToken} from "@/utils/auth.js";
import {getInfo} from "@/api/manager.js";

router.beforeEach((to, from, next) => {

    // 获取 Token
    const token = getToken();

    // 没有登录强制跳转登录页
    if (!token && to.path !== "/login") {
        return next({path: "/login"})
    }

    // 防止重复登录
    if (token && to.path === "/login") {
        return next({path: from.path? from.path : "/"})
    }

    // 获取用户信息

})