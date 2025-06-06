import router from "@/router/index.js";
import {getToken} from "@/utils/auth.js";
import {getInfo} from "@/api/manager.js";
import {notify} from "@/utils/message.js";
import useUserStore from "@/store/modules/user.js";
import {toggleFullLoading} from "@/utils/loading.js";


// 路由前置守卫
router.beforeEach((to, from, next) => {
    // 开启全局 Loading 条
    toggleFullLoading();

    // 获取 Token
    const token = getToken();

    // 没有登录强制跳转登录页
    if (!token && to.path !== "/login") {
        notify("请先登录",'warning')
        return next({path: "/login"})
    }

    // 防止重复登录
    if (token && to.path === "/login") {
        notify("请勿重复登录")
        return next({path: from.path ? from.path : "/"})
    }

    // 获取用户信息
    if (token){
        getInfo().then(res => {
            useUserStore().user = res;
        })
    }

    // 设置页面标题
    document.title = ((to.meta.title) ? (to.meta.title) : "") + "-ShopAdmin";

    // 放行
    next();
})


// 路由后置守卫
router.afterEach((to, from, next) => {
    // 关闭全局 Loading 条
    toggleFullLoading();
})
