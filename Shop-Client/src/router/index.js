import { createWebHistory, createRouter } from 'vue-router'

import NotFount from '@/pages/error/404.vue'
import Login from '@/pages/auth/login.vue'
import Home from '@/pages/index.vue'
import Layout from "@/layout/layout.vue";
import GoodsList from "@/pages/goods/goodsList.vue";
import CategoryList from "@/pages/category/categoryList.vue";
import ImageList from "@/pages/image/imageList.vue";

// 公共路由
const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFount',
    component: NotFount,
    meta: {
      title: '404页面'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录页'
    }
  },
]

// 动态路由，由后端数据动态添加进路由
const asyncRoutes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "主控台"
    }
  },
  {
    path: "/goods/list",
    name: "GoodsList",
    component: GoodsList,
    meta: {
      title: "商品管理"
    }
  },
  {
    path: "/category/list",
    name: "CategoryList",
    component: CategoryList,
    meta: {
      title: "分类列表"
    }
  },
// {
//   path: "/user/list",
//   name: "/user/list",
//   component: UserList,
//   meta: {
//     title: "用户列表"
//   }
// }, {
//   path: "/order/list",
//   name: "/order/list",
//   component: OrderList,
//   meta: {
//     title: "订单列表"
//   }
// }, {
//   path: "/comment/list",
//   name: "/comment/list",
//   component: CommentList,
//   meta: {
//     title: "评价列表"
//   }
// },
{
  path: "/image/list",
  name: "ImageList",
  component: ImageList,
  meta: {
    title: "图库列表"
  }
},
// {
//   path: "/notice/list",
//   name: "/notice/list",
//   component: NoticeList,
//   meta: {
//     title: "公告列表"
//   }
// }, {
//   path: "/setting/base",
//   name: "/setting/base",
//   component: SettingBase,
//   meta: {
//     title: "基础配置"
//   }
// }, {
//   path: "/coupon/list",
//   name: "/coupon/list",
//   component: CouponList,
//   meta: {
//     title: "优惠券列表"
//   }
// }, {
//   path: "/manager/list",
//   name: "/manager/list",
//   component: ManagerList,
//   meta: {
//     title: "管理员列表"
//   }
// }, {
//   path: "/access/list",
//   name: "/access/list",
//   component: AccessList,
//   meta: {
//     title: "菜单权限管理"
//   }
// }, {
//   path: "/role/list",
//   name: "/role/list",
//   component: RoleList,
//   meta: {
//     title: "角色管理"
//   }
// }, {
//   path: "/skus/list",
//   name: "/skus/list",
//   component: SkusList,
//   meta: {
//     title: "规格管理"
//   }
// }, {
//   path: "/level/list",
//   name: "/level/list",
//   component: LevelList,
//   meta: {
//     title: "会员等级"
//   }
// }, {
//   path: "/setting/buy",
//   name: "/setting/buy",
//   component: SettingBuy,
//   meta: {
//     title: "交易设置"
//   }
// }, {
//   path: "/setting/ship",
//   name: "/setting/ship",
//   component: SettingShip,
//   meta: {
//     title: "物流设置"
//   }
// }, {
//   path: "/distribution/index",
//   name: "/distribution/index",
//   component: DistributionIndex,
//   meta: {
//     title: "分销员管理"
//   }
// }, {
//   path: "/distribution/setting",
//   name: "/distribution/setting",
//   component: DistributionSetting,
//   meta: {
//     title: "分销设置"
//   }
// }
]

// 动态加载路由函数
export function loadDynamicRoutes(menus) {
  let hasNewRoutes = false;
  const addRoutes = (err) => {
    err.forEach(element => {
      let item = asyncRoutes.find(o => o.path === element.frontpath);
      // 存在动态路由，且没有添加
      if(item && !router.hasRoute(item.name)) {
        router.addRoute('Layout', item);
        hasNewRoutes = true;
      }
      // 递归添加子路由
      if(element.child && element.child.length > 0) {
        addRoutes(element.child);
      }
    });
  }
  addRoutes(menus);
  return hasNewRoutes;
}

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router