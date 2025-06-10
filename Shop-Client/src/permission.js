import router,{loadDynamicRoutes} from "@/router/index.js";
import {getToken} from "@/utils/auth.js";
import {getInfo} from "@/api/manager.js";
import {notify} from "@/utils/message.js";
import useUserStore from "@/store/modules/user.js";
import {showFullLoading, hideFullLoading} from "@/utils/loading.js";

// 防止重复发起请求
let hasGetInfo = false;

// 路由前置守卫
router.beforeEach( async (to, from, next) => {
    // 开启全局 Loading 条
    showFullLoading();

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
    let hasNewRoutes = false;
    if (token && !hasGetInfo){
        // 使用 await 使请求通过再放行，产生一个空白时间
        await getInfo().then(res => {
            console.log(res)
            useUserStore().user = res;
            useUserStore().menus = res.menus;
            // 根据后端 menus 数据添加动态路由
            hasNewRoutes = loadDynamicRoutes(res.menus);
        })
        hasGetInfo = true;
    }

    // 设置页面标题
    document.title = ((to.meta.title) ? (to.meta.title) : "") + "-ShopAdmin";

    // 放行（动态添加路由后需手动指定路由跳转）
    hasNewRoutes ? next(to.fullPath) : next();
})


// 路由后置守卫
router.afterEach((to, from, next) => {
    // 关闭全局 Loading 条
    hideFullLoading();
})
