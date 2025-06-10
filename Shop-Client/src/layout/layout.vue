<template>
  <el-container>
    <el-header class="header-nav">
      <layout-header />
    </el-header>
    <el-container>
      <el-aside :style="{ width: appStore.asideWidth }">
        <layout-sidebar />
      </el-aside>
      <el-main class="main-container">
        <el-header class="header-tag">
          <layout-tag-list />
        </el-header>
        <el-main class="main-content">
          <router-view v-slot="{ Component }">
            <!-- 全局过渡动画 -->
            <transition name="fade">
              <!--页面缓存，当页面切换时，保持栈后页面状态-->
              <keep-alive :max="10">
                <component :is="Component"></component>
              </keep-alive>
            </transition>
          </router-view>
        </el-main>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import LayoutHeader from "@/layout/components/LayoutHeader.vue";
import LayoutSidebar from "@/layout/components/LayoutSidebar.vue";
import LayoutTagList from "@/layout/components/LayoutTagList.vue";
import useAppStore from "@/store/modules/app.js";

const appStore = useAppStore();
</script>

<style scoped>
.header-nav {
  padding: 0;
}

.el-aside {
  transition: all ease 0.2s;
}

.header-tag {
  position: fixed;
  top: 64px;
  height: 44px;
}

.main-container {
  padding-top: 0 !important;
}

.main-content {
  padding: 66px 0 0 0 ;
}

/* 全局过渡动画：进入之前 */
.fade-enter-from {
  opacity: 0;
  -webkit-transform: translate3d(0, -100%, 0);
  transform: translate3d(0, -100%, 0);
}

/* 全局过渡动画：进入之后 */
.fade-enter-to {
  opacity: 1;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}

/* 全局过渡动画：离开之前 */
.fade-leave-from {
  opacity: 1;
}

/* 全局过渡动画：离开之后 */
.fade-leave-to {
  opacity: 0;
  -webkit-transform: translate3d(0, 100%, 0);
  transform: translate3d(0, 100%, 0);
}

/* 设置动画时长 */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}

/* 进入的时候延迟 */
.fade-enter-active {
  transition-delay: 0.3s;
}
</style>