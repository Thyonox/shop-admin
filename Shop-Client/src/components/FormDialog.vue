<template>
  <el-dialog v-model="isShowDialog" :title="title" :width="width" :destroy-on-close="destroyOnClose" :close-on-click-modal="false">
    <slot></slot>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="isShowDialog = false">取消</el-button>
        <el-button type="primary" @click="submit" :loading="loading">{{ confirmText }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import {ref} from "vue";

// 是否展示对话框
const isShowDialog = ref(false);

// 父组件传值
const props = defineProps({
  // 标题
  title: String,
  // 宽度
  width: {
    type: String,
    default: '50%'
  },
  // 确认按钮文本
  confirmText: {
    type: String,
    default: '提交'
  },
  // 是否关闭时销毁元素
  destroyOnClose: {
    type: Boolean,
    default: false
  }
})

// 提交按钮可点击状态及方法
const loading = ref(false);
const showLoading = () => loading.value = true;
const hideLoading = () => loading.value = false;

const open = () => isShowDialog.value = true;
const close = () => isShowDialog.value = false;

// 向父组件暴露方法
defineExpose({
  open,
  close,
  showLoading,
  hideLoading,
})

const emit = defineEmits(["submit"])
const submit = () => emit("submit")

</script>

<style scoped>

</style>