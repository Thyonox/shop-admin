<template>
  <div class="container" :style="{width: appStore.asideWidth}">
    <el-menu
        unique-opened
        :collapse="isCollapse"
        :collapse-transition="false"
        :default-active="activeMenu"
        class="el-menu"
        @select="handleSelect"
    >
      <template v-for="(item,index) in asideMenus" :key="index">
        <!-- 如果是多级菜单 -->
        <el-sub-menu v-if="item.child && item.child.length > 0" :index="item.name">
          <template #title>
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item v-for="(item2, index2) in item.child" :key="index2" :index="item2.frontpath">
            <el-icon>
              <component :is="item2.icon"></component>
            </el-icon>
            <span>{{ item2.name }}</span>
          </el-menu-item>
        </el-sub-menu>

        <!-- 如果是单级菜单 -->
        <el-menu-item v-else :index="item.frontpath">
          <el-icon>
            <component :is="item.icon"></component>
            <span>{{ item.name }}</span>
          </el-icon>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import useUserStore from "@/store/modules/user.js";
import useAppStore from "@/store/modules/app.js";
import {computed, ref} from "vue";
import {onBeforeRouteUpdate, useRoute, useRouter} from "vue-router";

const userStore = useUserStore();
const appStore = useAppStore();

const route = useRoute();
const router = useRouter();

const asideMenus = computed(() => userStore.menus);

const isCollapse = computed(() => !(appStore.asideWidth === '250px'))

const activeMenu = ref(route.path);

onBeforeRouteUpdate((to, from) => {
  activeMenu.value = to.path;
})

const handleSelect = (e) => {
  router.push(e);
}

</script>

<style scoped>
.container {
  position: fixed;
  top: 64px;
  bottom: 0;
  left: 0;
  background: #fff;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.35);
  /* 使侧边栏层叠顺序高于标签导航栏，避免阴影样式被吞 */
  z-index: 1001;
}

.el-menu{
  border: none;
}

</style>