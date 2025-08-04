<template>
  <div class="container">
    <div class="logo">
      <span>ShopAdmin</span>
    </div>
    <div class="left">
      <el-tooltip content="折叠" placement="bottom" effect="light">
        <el-icon class="icon-btn" @click="collapse">
          <Fold v-if="appStore.asideWidth === '250px'"/>
          <Expand v-else/>
        </el-icon>
      </el-tooltip>
      <el-tooltip content="刷新" placement="bottom" effect="light">
        <el-icon class="icon-btn" @click="refresh">
          <Refresh/>
        </el-icon>
      </el-tooltip>
    </div>
    <div class="right">
      <el-tooltip content="全屏" placement="bottom" effect="light">
        <el-icon class="icon-btn" @click="toggle">
          <FullScreen/>
        </el-icon>
      </el-tooltip>
      <el-dropdown trigger="click" @command="handleCommand">
        <el-avatar :size="25" shape="square" :src="userStore.user.avatar" class="avatar"/>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>

<!-- 修改密码对话框 -->
  <form-dialog ref="formDialogRef" title="修改密码" destroyOnClose @submit="onSubmit">
    <el-form ref="formRef" :rules="rules" :model="form" label-width="80px" size="small">
      <el-form-item prop="oldpassword" label="旧密码">
        <el-input v-model="form.oldpassword" placeholder="请输入旧密码"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="新密码">
        <el-input type="password" v-model="form.password" placeholder="请输入密码" show-password></el-input>
      </el-form-item>
      <el-form-item prop="repassword" label="确认密码">
        <el-input type="password" v-model="form.repassword" placeholder="请输入确认密码" show-password></el-input>
      </el-form-item>
    </el-form>
  </form-dialog>

<!--  <el-dialog v-model="isShowDialog" title="修改密码" width="500">-->
<!--    <el-form ref="formRef" :rules="rules" :model="form" label-width="80px" size="small">-->
<!--      <el-form-item prop="oldpassword" label="旧密码">-->
<!--        <el-input v-model="form.oldpassword" placeholder="请输入旧密码"></el-input>-->
<!--      </el-form-item>-->
<!--      <el-form-item prop="password" label="新密码">-->
<!--        <el-input type="password" v-model="form.password" placeholder="请输入密码" show-password></el-input>-->
<!--      </el-form-item>-->
<!--      <el-form-item prop="repassword" label="确认密码">-->
<!--        <el-input type="password" v-model="form.repassword" placeholder="请输入确认密码" show-password></el-input>-->
<!--      </el-form-item>-->
<!--    </el-form>-->
<!--    <template #footer>-->
<!--      <div class="dialog-footer">-->
<!--        <el-button @click="isShowDialog = false">取消</el-button>-->
<!--        <el-button type="primary" @click="onSubmit">确认</el-button>-->
<!--      </div>-->
<!--    </template>-->
<!--  </el-dialog>-->
</template>

<script setup>
import {useFullscreen} from "@vueuse/core";
import {useLogout,useRePassword} from "@/services/userService.js";
import FormDialog from "@/components/FormDialog.vue";
import useAppStore from "@/store/modules/app.js";
import useUserStore from "@/store/modules/user";

const appStore = useAppStore();
const userStore = useUserStore();

// 解构出退出登录方法
const {handleLogout} = useLogout();

// 解构出修改密码方法
const {form, rules, formRef, formDialogRef, openDialog, onSubmit} = useRePassword();

// 全屏方法
const {toggle} = useFullscreen();

// 展开折叠菜单栏方法
const collapse = () => {
  appStore.asideWidth = appStore.asideWidth === '250px' ? '64px' : '250px';
}

// 刷新方法
const refresh = () => {
  location.reload();
}

// 下拉菜单点击选项执行对应方法
const handleCommand = (command) => {
  switch (command) {
    case 'rePassword':
      // isShowDialog.value = true;
      openDialog();
      break;
    case 'logout':
      handleLogout();
      break;
    default:
      break;
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 64px;
  background: #4338CA;
  color: #ffffff;
  display: flex;
  align-items: center;
  position: fixed;
  z-index: 1000;
}

.logo {
  width: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.left {
  margin-right: auto;
}

.left .icon-btn {
  width: 42px;
}

.right {
  margin-right: 30px;
  display: flex;
  gap: 50px;
  align-items: center;
}

.avatar,
.icon-btn{
  cursor: pointer;
}
</style>