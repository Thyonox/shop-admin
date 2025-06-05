<template>
<el-container>
  <el-header>
    <layout-header />
  </el-header>
  <el-container>
    <el-aside>
      <layout-sidebar />
    </el-aside>
    <el-main>
      <layout-tag-list />
      <router-view />
    </el-main>
  </el-container>
</el-container>
</template>

<script setup>

import LayoutHeader from "@/layout/components/LayoutHeader.vue";
import LayoutSidebar from "@/layout/components/LayoutSidebar.vue";
import LayoutTagList from "@/layout/components/LayoutTagList.vue";
</script>

<style scoped>
::v-deep(.el-header){
  padding: 0;
}
</style>