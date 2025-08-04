<template>
  <el-dialog v-model="isShowDialog" 
             :title="title" 
             :width="width" 
             :destroy-on-close="destroyOnClose" 
             :close-on-click-modal="false"
             :align-center="true"
             class="custom-dialog">
    <slot></slot>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="isShowDialog = false">取消</el-button>
        <el-button type="primary" @click="$emit('submit')" :loading="loading">{{ confirmText }}</el-button>
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

// 向父组件传递事件
defineEmits([
  "submit"
]);


</script>

<style scoped>
/* 使用全局样式来确保优先级 */
</style>

<style>
/* 使用更强的选择器来覆盖 Element Plus 样式 */
.custom-dialog.el-dialog {
  border-radius: 20px !important;
  overflow: hidden !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15) !important;
}

.custom-dialog .el-dialog__header {
  border-radius: 20px 20px 0 0 !important;
}

.custom-dialog .el-dialog__body {
  border-radius: 0 !important;
  padding: 20px !important;
}

.custom-dialog .el-dialog__footer {
  border-radius: 0 0 20px 20px !important;
  padding: 15px 20px !important;
}

/* 确保遮罩层不影响圆角显示 */
.el-overlay {
  backdrop-filter: blur(2px) !important;
}

/* 针对可能的嵌套情况 */
body .custom-dialog.el-dialog {
  border-radius: 20px !important;
}
</style>