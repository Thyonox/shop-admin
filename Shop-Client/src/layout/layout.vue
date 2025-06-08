<template>
<el-container>
  <el-header>
    <layout-header />
  </el-header>
  <el-container>
    <el-aside :style="{width: appStore.asideWidth}">
      <layout-sidebar />
    </el-aside>
    <el-main>
      <layout-tag-list />
      <router-view v-slot="{Component}">
        <!--页面缓存，当页面切换时，保持栈后页面状态-->
        <keep-alive :max="10">
          <component :is="Component"></component>
        </keep-alive>
      </router-view>
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
::v-deep(.el-header){
  padding: 0;
}

</style>