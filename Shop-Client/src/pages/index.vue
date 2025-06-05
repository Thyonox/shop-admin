<template>
<div>
  主页
  <el-button @click="submit">logout</el-button>
  {{ useUserStore().user }}
</div>
</template>

<script setup>
import useUserStore from "@/store/modules/user.js";
import {removeToken} from "@/utils/auth.js";
import {useRouter} from "vue-router";
import {confirm, notify} from "@/utils/message.js";
import {logout} from "@/api/manager.js";

const router = useRouter();

const submit = () => {
  confirm('是否要退出登录？').then(() => {
    logout().finally(() => {
      removeToken();
      useUserStore().user = {};
      router.push("/login");
      notify('退出成功')
    })
  }).catch(() => {})

}
</script>

<style scoped>

</style>