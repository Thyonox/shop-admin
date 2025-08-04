<template>
    <el-container class="image-list-container" :style="{ height: (mainHeight + 'px')}">
        <el-header class="image-list-header">
            <el-button type="primary" size="small" @click="handleAdd">新增分类</el-button>
            <el-button type="warning" size="small" @click="">上传图片</el-button>
        </el-header>
        <el-container>
            <!-- 侧边图片分类列表 -->
            <ImageAside ref="imageAsideRef"/>

            <!-- 主题图片展示列表 -->
            <ImageMain />
        </el-container>
    </el-container> 
</template>

<script setup>
import ImageAside from '@/components/ImageAside.vue';
import ImageMain from '@/components/ImageMain.vue';
import { ref } from 'vue';

const windowHeight = window.innerHeight || document.body.clientHeight;
const mainHeight = windowHeight - 64 - 44 - 40;
const imageAsideRef = ref(null);

const handleAdd = () => {
    imageAsideRef.value.handleCreate();
}
</script>

<style scoped>
.image-list-container {
    background-color: #fff;
}

.image-list-header {
    display: flex;
    align-items: center;
}
</style>